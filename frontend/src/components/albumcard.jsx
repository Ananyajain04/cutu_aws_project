const AlbumCard = ({ album, theme, onSelect }) => {
  return (
    <div
      className="group w-[20vw] h-[45vh] perspective-[1000px] cursor-pointer"
      onClick={() => onSelect(album.title)} // pass album title to parent
    >
      <div className="relative w-full h-full transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div
          className="absolute w-full h-full flex items-center justify-center rounded-[10px] shadow-md [backface-visibility:hidden]"
          style={{ backgroundColor: theme.light_bg_colour }}
        >
          <img
            src={album.cover}
            alt={album.title}
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full flex flex-col items-center justify-center text-center rounded-[10px] shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backgroundColor: theme.light_bg_colour }}
        >
          <h2
            className="text-[1.4rem] font-bold mb-[10px]"
            style={{ color: theme.darker_bg_colour }}
          >
            {album.title}
          </h2>
          <p
            className="text-[1rem] mt-[5px]"
            style={{ color: theme.darker_bg_colour }}
          >
            {album.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
