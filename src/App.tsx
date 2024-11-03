import "./App.css";
import ListeArticles from "./composants/ListeArticles/ListeArticles";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const locomotive = new LocomotiveScroll();
      }
    )();
  }, []);

  return (
    <>
      <ListeArticles />
    </>
  );
}

export default App;
