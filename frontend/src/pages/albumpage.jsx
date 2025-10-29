import { useState } from "react";
import AlbumCard from "../components/albumcard";
import AlbumChat from "../components/albumChat";
import { albums } from "../data/albums";

const AlbumPage = ({ theme }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const handleCloseChat = () => {
    setSelectedAlbum(null); // go back to album grid
  };
  return (
    <div className="albums" style={{ backgroundColor: theme.darker_bg_colour }}>
      <div className="albumpage flex justify-center items-center w-[100vw]">
        {!selectedAlbum ? (
          <main className="main-content grid grid-cols-4 m-[10px] gap-[20px] w-[90vw]">
            {albums.map((eachAlbum) => (
              <AlbumCard
                key={eachAlbum.title}
                album={{
                  title: eachAlbum.title,
                  description: eachAlbum.description,
                  cover: eachAlbum.cover,
                }}
                theme={theme}
                onSelect={(title) => setSelectedAlbum(title)} // handle click
              />
            ))}
          </main>
        ) : (
          <div className="chat-view w-full flex flex-col items-center">
            <AlbumChat album={selectedAlbum} onClose={handleCloseChat} theme={theme}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
