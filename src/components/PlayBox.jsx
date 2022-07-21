import React, { useState, useEffect, useRef } from "react";
import { usePlayingSong } from "../context/playingSong";
import AudioControls, { VolumeBar } from "./AudioControls";
import Link from "next/link";
import HomeBox from "./Box";
import LikeButton from "./SongLikeButton";
import { seconds_format } from "../util";
import CloseIcon from "./icons/CloseIcon";
import { AnimatePresence } from "framer-motion";

const MediaProgressBar = ({ className }) => {
  const {
    playingSong,
    togglePlaying,
    isPlaying,
    audioRef,
    getCurrentSongQueueIndex,
  } = usePlayingSong();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [haveInit, setHaveInit] = useState(false);

  const pRef = useRef(); // reference for the progress bar
  const aRef = useRef(); // reference for the animation

  const updateProgressBar = () => {
    // Update the slider of the range element and the bottom left label (the current progress text)
    // with the current value
    if (pRef.current) {
      pRef.current.value = audioRef.current.currentTime;
      pRef.current.style.setProperty(
        "--seek-before-width",
        `${(pRef.current.value / duration) * 100}%`
      );
      setCurrentProgress(pRef.current.value);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (pRef.current) {
      if (!haveInit) {
        setHaveInit(true);
      }
      if (playingSong) {
        console.log("init playbox with playsing song", {
          duration: audioRef.current.duration,
        });
        pRef.current.max = audioRef.current.duration;
        setDuration(audioRef.current.duration);
        if (isPlaying) {
          startUpdatingProgressBar();
        } else {
          updateProgressBar();
        }
      }
      audioRef.current.addEventListener("loadedmetadata", () => {
        console.log("loadedmetadata", { duration: audioRef.current.duration });
        setDuration(() => audioRef.current.duration);
        if (pRef.current) {
          pRef.current.max = audioRef.current.duration;
        }
      });
      // start infinite updating UI when playing started
      audioRef.current.addEventListener("play", startUpdatingProgressBar);
      // stop updating when pause
      audioRef.current.addEventListener("pause", () => {
        console.log("listen to pause from progress bar");
        cancelAnimationFrame(updateProgressBarWhilePlaying);
      });
    }
  }, [pRef.current, audioRef.current]);

  const startUpdatingProgressBar = () => {
    aRef.current = requestAnimationFrame(updateProgressBarWhilePlaying);
  };

  const updateProgressBarWhilePlaying = () => {
    updateProgressBar();
    // infinite recursion to make the UI continue updating
    aRef.current = requestAnimationFrame(updateProgressBarWhilePlaying);
  };

  useEffect(() => {
    if (!haveInit) {
      return;
    }
    if (getCurrentSongQueueIndex() !== -1) {
      // if the current song is in the queue, skip the else checking
      return;
    } else if (Math.floor(currentProgress * 10) === Math.floor(duration * 10)) {
      // when reaching the end of song and the current song is not in the queue,
      // pause and set the progress to 0
      togglePlaying();
      audioRef.current.currentTime = 0;
      pRef.current.value = 0;
      setCurrentProgress(0);
    }
  }, [duration, currentProgress, haveInit]);

  const changeRangeInput = () => {
    console.log("on range change 2", {
      D: (pRef.current.value / duration) * 100,
      current: pRef.current.value,
    });
    audioRef.current.currentTime = pRef.current.value;
    updateProgressBar();
  };

  const durationStr = !isNaN(duration) && seconds_format(duration);

  return (
    <div className="flex flex-col items-stretch">
      <input
        ref={pRef}
        type="range"
        defaultValue="0"
        step="0.1"
        onChange={changeRangeInput}
        className={className}
      />
      <div className="flex justify-between">
        <span className="">{seconds_format(currentProgress)}</span>
        <span className="">{durationStr}</span>
      </div>
    </div>
  );
};

const TitleBlock = ({ playingSong }) => {
  return (
    <div className=" flex items-center">
      {/* Title left */}
      <div className="flex flex-col flex-1">
        <div className="line-clamp-2 text-xl font-bold">
          {playingSong.trackName}
        </div>
        <a
          href={playingSong.artistViewUrl}
          className="inline-block text-slate-500 text-base"
        >
          {playingSong.artistName}
        </a>
      </div>
      {/* Title right */}
      <div className="flex-none flex justify-center items-center">
        <LikeButton song={playingSong} size={28} />
      </div>
    </div>
  );
};

const PlayBox = () => {
  const ref = useRef();
  const { playingSong, togglePlaying, isPlaying, audioRef, setPlayingSong } =
    usePlayingSong();

  console.log("render play box", { playingSong, togglePlaying, isPlaying });

  useEffect(() => {
    console.log("useEffect: song");
    if (ref.current) {
      ref.current.classList.remove("animate-spin");
      setTimeout(() => {
        ref.current.classList.add("animate-spin");
      }, 100);
    }
  }, [playingSong]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (playingSong) {
      if (isPlaying) {
        ref.current.style.animationPlayState = "running";
        console.log("Playing...");
      } else {
        ref.current.style.animationPlayState = "paused";
        console.log("Pausing...");
      }
    }
  }, [isPlaying]);

  console.log("render playing box");

  if (!playingSong) {
    return <div className="fixed right-0 bottom-0"></div>;
  }

  console.log("duration", audioRef.current.duration);

  return (
    <HomeBox className="relative w-full lg:w-96 px-12">
      <CloseIcon
        size={32}
        onClick={() => setPlayingSong(null)}
        className="absolute top-8 right-8 cursor-pointer"
      />
      <div
        className="w-full lg:w-72 mx-auto my-12 relative rounded-full overflow-hidden animate-spin [animation-duration:5s]"
        ref={ref}
      >
        <img
          src={playingSong.imgSrcMd}
          className="w-full aspect-square object-contain"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>
      <div className="w-full flex flex-col items-stretch gap-4">
        <TitleBlock playingSong={playingSong} />
        <MediaProgressBar />
        <AudioControls size={44} className="-translate-y-1" />
        <VolumeBar size={28} />
        <div className="flex items-center justify-center">
          {playingSong.albumUrl && (
            <Link href={playingSong.albumUrl} passHref>
              <a className="text-slate-600 bg-slate-200 py-2 px-6 rounded-lg">
                View Album
              </a>
            </Link>
          )}
        </div>
      </div>
    </HomeBox>
  );
};

export default PlayBox;
