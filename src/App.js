import { useEffect } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import PostSong from "./pags/PostSong";
import Songs from "./pags/Songs";
import { init } from "./firebase";

function App() {
  useEffect(() => {
    init();
  }, []);

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
        <Route path="songs" element={<Songs />} />
        <Route path="post-song" element={<PostSong></PostSong>} />
      </Routes>
      ,
    </div>
  );
}

export default App;
