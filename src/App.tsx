import "./index.less";
import { ThemeProvider } from "@digitalreality/ui";
import WrapperTimeline from "./components/timeline/WrapperTimeline";
import PositionBar from "./components/gridTest/PositionBar";
import GridComponent from "./components/elementsTest/GridComponent";
import TimelineGridTest from "./components/gridTest/TimelineGridTest";
import { useRef } from "react";

function App() {
  const otherDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ThemeProvider>
        {" "}
        <WrapperTimeline>
          <TimelineGridTest />
        </WrapperTimeline>
        {/* <div
          className="other-div"
          style={{
            background: "linear-gradient(45deg, #0095B9, #709A3D)",
            height: "10px",
            width: "100px",
          }}
          ref={otherDivRef}
        ></div>
        <div
          className="parent-container"
          style={{ marginTop: "10px" }}
          ref={containerRef}
        >
          <PositionBar otherDivRef={otherDivRef} containerRef={containerRef} />
        </div> */}
        {/* <WrapperTimeline>
        <GridComponent />
        </WrapperTimeline> */}
      </ThemeProvider>
    </>
  );
}

export default App;
