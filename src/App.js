import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import PostSong from "./pages/PostSong";
import Songs from "./pages/Songs";
import { init } from "./firebase";
import { getDocs } from "./firebase";
import _ from "lodash";

function App() {
  const [isInitilized, setIsInitilized] = useState();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // init firebase
    init();
    setIsInitilized(true);
    // get songs
    getDocs({ collection: "songs" }).then((res) => {
      setSongs(res);
    });
  }, []);

  const onDeleteSongsHandler = (deletedSongIds) => {
    const updatedSongs = [...songs];
    _.remove(updatedSongs, (song) => deletedSongIds.includes(song.id));
    setSongs(updatedSongs);
  };

  console.log("isInitilized", isInitilized);

  if (!isInitilized) {
    return "loading...";
  }

  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/songs">List songs</Link> | <Link to="/post-song">Post song</Link>
      </nav>
      <Routes>
        <Route path="songs" element={<Songs songs={songs} onDelete={onDeleteSongsHandler} />} />
        <Route path="post-song" element={<PostSong></PostSong>} />
      </Routes>
      ,
    </div>
  );
}

export default App;
