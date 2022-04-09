import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import PostSong from "./pages/PostSong";
import Songs from "./pages/Songs";
import { init } from "./firebase";
import _ from "lodash";
import Login from "./pages/Login";

function App() {
  const [initData, setInitData] = useState();

  useEffect(() => {
    // init firebase
    setInitData(init());
  }, []);

  if (!initData) {
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
        <Route path="sign-in" element={<Login uiConfig={initData.uiConfig} />} />
        <Route path="songs" element={<Songs />} />
        <Route path="post-song" element={<PostSong></PostSong>} />
      </Routes>
      ,
    </div>
  );
}

export default App;
