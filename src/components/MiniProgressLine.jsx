import MediaProgressInputWrapper from "./MediaProgressInputWrapper";


export default function MiniProgressLine() {
  return (
    <MediaProgressInputWrapper>
      {({ ref, changeRangeInput, duration, currentProgress }) => {
        return (
          <>
            <input
              ref={ref}
              type="range"
              defaultValue="0"
              step="0.1"
              onChange={changeRangeInput}
              className="hidden"
            />
            <div
              className={`absolute h-[3px] w-0 left-0 bottom-0 bg-gradient-to-r from-blue-500/70 to-blue-500 group-hover:from-purple-500/70 group-hover:to-red-500/70 transition-all duration-300 ease-linear z-20 shadow-xl`}
              style={{
                width: `${currentProgress / duration * 100}%`,
              }}
            ></div>
            {/* <div className="absolute left-0 h-full w-0 backdrop-blur-xl z-20"
              style={{
                width: `${currentProgress / duration * 100}%`,
              }}
            ></div> */}
            {/* <div
              className={`absolute h-[5px] w-0 left-0 bottom-0 transition-all duration-300 ease-linear bg-gradient-to-r from-blue-500/70 to-blue-500`}
              style={{
                width: `${currentProgress / duration * 100}%`,
              }}
            >
              <div className="backdrop-blur-xl w-full h-full z-10"></div>
            </div> */}
          </>
        );
      }}
    </MediaProgressInputWrapper>
  );
};
