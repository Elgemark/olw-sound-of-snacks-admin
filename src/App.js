import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import PostSong from "./pages/PostSong";
import Songs from "./pages/Songs";
import { init, useGetUser } from "./firebase";
import _ from "lodash";
import SignIn from "./pages/SignIn";
import SelectWinner from "./pages/SelectWinner";

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
      <SignIn uiConfig={initData.uiConfig}>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/songs">List songs</Link>
          {" | "}
          <Link to="/post-song">Post song</Link>
          {" | "}
          <Link to="/select-winner">Select winner</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Songs />} />
          <Route path="songs" element={<Songs />} />
          <Route path="post-song" element={<PostSong></PostSong>} />
          <Route path="select-winner" element={<SelectWinner></SelectWinner>} />
        </Routes>
      </SignIn>
    </div>
  );
}

export default App;
