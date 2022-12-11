import Link from "next/link";
import { useRouter } from "next/router";

const ArtistText = ({ data, className }) => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/artist/${data.artistId}`);
  };
  return (
    <div className="w-full truncate">
      <span
        className={`text-sm text-slate-500 group-hover:text-blue-400 cursor-pointer transition-all duration-300 hover:underline ${className}`}
        onClick={handleClick}
      >
        {data.artistName}
      </span>
    </div>
  );
};

export default ArtistText;
