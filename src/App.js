import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import PostSong from "./pages/PostSong";
import Songs from "./pages/Songs";
import { init } from "./firebase";
import SignIn from "./pages/SignIn";
import SelectWinner from "./pages/SelectWinner";
import styled from "styled-components";

const Navigation = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;
  .logo {
    position: absolute;
    top: 22px;
    left: 22px;
  }
`;

const Crowd = styled.div`
  z-index: 20;
  position: fixed;
  width: 100%;
  min-width: 600px;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
`;

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
        <Navigation>
          <img className="logo" src="./assets/logo.png" width={"70px"} height={"70px"} />
          <nav>
            <Link to="/songs">List songs</Link>
            {/* <Link to="/post-song">Post song</Link> */}
            {" | "}
            <Link to="/select-winner">Select winner</Link>
          </nav>
        </Navigation>
        <Routes>
          <Route path="/" element={<Songs />} />
          <Route path="songs" element={<Songs />} />
          <Route path="post-song" element={<PostSong></PostSong>} />
          <Route path="select-winner" element={<SelectWinner></SelectWinner>} />
        </Routes>
      </SignIn>
      <Crowd>
        <img className="logo" src="./assets/crowd.svg" />
      </Crowd>
    </div>
  );
}

export default App;
