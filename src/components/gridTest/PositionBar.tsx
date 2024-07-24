import { Item } from "../timeline/RowTimeline";

import React, { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable, ResizeCallbackData } from "react-resizable";

interface PositionBarProps {
  otherDivRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

const PositionBar: React.FC<PositionBarProps> = ({
  otherDivRef,
  containerRef,
}) => {
  const [width, setWidth] = useState(200);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    const diff = data.x - data.lastX;
    setWidth(width + diff);
    otherDivRef.current?.style.setProperty("width", `${width + diff}px`);
  };

  const handleResize = (_e: React.SyntheticEvent, data: ResizeCallbackData) => {
    setWidth(data.size.width);
    otherDivRef.current?.style.setProperty("width", `${data.size.width}px`);
  };

  return (
    <div className="draggable-container" ref={containerRef}>
      <Draggable axis="x" bounds="parent" onDrag={handleDrag}>
        <Resizable width={width} height={200} onResize={handleResize}>
          <Item
            style={{
              borderImage: "linear-gradient(45deg, #0095B9, #709A3D) 1",
              borderStyle: "solid",
              borderWidth: "0.5px",
              borderRadius: 2,
              width: "50%",
              height: "100%",
              cursor: "pointer",
            }}
            className="draggable-resizable"
          >
            Position Bar
          </Item>
        </Resizable>
      </Draggable>
    </div>
  );
};

export default PositionBar;
