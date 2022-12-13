import MediaProgressInputWrapper from "./MediaProgressInputWrapper";

export const BottomMiniProgressLine = ({ className }) => {
  return <MiniProgressLine className={`bottom-0 ${className}`} />;
};

export const InteractiveMiniProgressLine = ({ className }) => {
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
            <div className="group absolute h-1.5 left-0 right-0 top-0 -translate-y-1">
              <div
                className={`absolute h-[3px] group-hover:h-1 w-0 top-0 left-0 transition-all duration-300 ease-linear z-20 shadow-xl ${className}`}
                style={{
                  width: `${(currentProgress / duration) * 100}%`,
                }}
              ></div>
            </div>
          </>
        );
      }}
    </MediaProgressInputWrapper>
  );
};

export default function MiniProgressLine({ className }) {
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
              className={`absolute h-[3px] w-0 left-0 transition-all duration-300 ease-linear z-20 shadow-xl ${className}`}
              style={{
                width: `${(currentProgress / duration) * 100}%`,
              }}
            ></div>
          </>
        );
      }}
    </MediaProgressInputWrapper>
  );
}
