import { FSongContextWrapper, FAlbumContextWrapper } from "./favorite";
import { PlayingSongWrapper } from "./playingSong";

export const GlobalContextWrapper = ({ children }) => {
  return (
    <FSongContextWrapper>
      <FAlbumContextWrapper>
        <PlayingSongWrapper>{children}</PlayingSongWrapper>
      </FAlbumContextWrapper>
    </FSongContextWrapper>
  );
};
