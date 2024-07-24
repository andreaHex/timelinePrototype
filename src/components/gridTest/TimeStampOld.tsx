import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Item } from "../timeline/RowTimeline";
import Draggable from "react-draggable";

interface TimeStampOldProps {
  scaleFactor: number;
  multIntervalTime?: number;
}

interface ContainerDimensions {
  width: number;
}

const TimeStampOld: React.FC<TimeStampOldProps> = ({
  scaleFactor,
  multIntervalTime = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const [dimensions, setDimensions] = useState<ContainerDimensions>({
  //   width: 0,
  // });
  const [currentPosition, setCurrentPosition] = useState(0);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (containerRef.current) {
  //       setDimensions({
  //         width: containerRef.current.getBoundingClientRect().width,
  //       });
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // Imposta le dimensioni iniziali

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [containerRef]);

  const startTime = 0;
  const endTime = 10000;

  const totalSeconds = Math.min((endTime - startTime) / 1000, 7200);

  const secondsPerPixel = totalSeconds / 1035.19;

  const tickDistance = 103;
  // const secondsPerPixel = (totalSeconds / (dimensions.width)) ;

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const renderTicks = useMemo(() => {
    const ticks: JSX.Element[] = [];
    let currentSecond = 0;

    // let currentSecond = -totalSeconds;
    while (currentSecond <= totalSeconds * multIntervalTime) {
      const tickPosition = (currentSecond / secondsPerPixel) * scaleFactor;

      ticks.push(
        <Box
          key={`main-${currentSecond}`}
          sx={{
            position: "absolute",
            left: `${tickPosition}px`,
            width: "1px",
            height: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            border: "1px solid grey",
          }}
        >
          <Typography
            key={`caption-${currentSecond}`}
            variant="caption"
            style={{ marginBottom: "40px" }}
          >
            {formatTime(currentSecond)}{" "}
          </Typography>
        </Box>
      );

      for (let i = 1; i <= 9; i++) {
        const subTickPosition =
          tickPosition + ((i * tickDistance) / 10) * scaleFactor;
        ticks.push(
          <Box
            key={`sub-${currentSecond}-${i}`}
            sx={{
              position: "absolute",
              left: `${subTickPosition}px`,
              width: "1px",
              height: "5px",
              border: "1px solid grey",
            }}
          />
        );
      }

      currentSecond += 1;
    }

    return ticks;
  }, [totalSeconds, scaleFactor, multIntervalTime, secondsPerPixel]);

  return (
    <>
      {" "}
      <Item
        style={{
          borderStyle: "solid",
          borderWidth: "0.5px",
          borderRadius: 0,
          // overflow: "hidden",
          borderImage: "linear-gradient(45deg, #0095B9, #709A3D) 1",
          borderLeft: 0,
          borderRight: 0,
          borderBottom: 0,
          padding: 0,
        }}
      >
        <Draggable
          axis="x"
          bounds={{
            left:
              -totalSeconds * multIntervalTime * tickDistance * scaleFactor +
              (containerRef.current ? containerRef.current.offsetWidth : 0),
            right: 0,
          }}
          onStart={() => {
            if (containerRef.current) {
              containerRef.current.style.cursor = "grabbing"; // Cambia il cursore a grabbing
            }
          }}
          onStop={() => {
            if (containerRef.current) {
              containerRef.current.style.cursor = "grab"; // Cambia il cursore a grab
            }
          }}
          onDrag={(e, data) => {
            const maxLeft =
              -totalSeconds * tickDistance * scaleFactor * multIntervalTime +
              (containerRef.current ? containerRef.current.offsetWidth : 0);
            if (data.x <= maxLeft) {
              setCurrentPosition(data.x);
            }
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "flex-end",
              userSelect: "none",
              // overflow: "hidden",
              left: 0,
              // border: "1px solid salmon",
            }}
            ref={containerRef}
          >
            {renderTicks}
          </Box>
        </Draggable>
      </Item>
      {/* <p>Larghezza del container TimeStampOld: {dimensions.width.toFixed(0)} px</p> */}
    </>
  );
};

export default TimeStampOld;
