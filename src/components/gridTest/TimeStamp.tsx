import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Item } from "../timeline/RowTimeline";

interface TimeStampProps {
  scaleFactor: number;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const TimeStamp: FC<TimeStampProps> = ({ scaleFactor }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Riferimento al container
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth); // Imposta la larghezza del container
      }
    };

    updateContainerWidth(); // Imposta la larghezza iniziale
    window.addEventListener("resize", updateContainerWidth); // Aggiungi un listener per il resize

    return () => {
      window.removeEventListener("resize", updateContainerWidth); // Rimuovi il listener
    };
  }, []);

  const intervalCount = useMemo(() => {
    // Calcola il numero di intervalli basato sulla larghezza del container e sul scaleFactor
    const baseIntervalWidth = 10; // Larghezza base per ogni intervallo
    return Math.max(1, containerWidth / (baseIntervalWidth * scaleFactor)); // Calcola il numero di intervalli
  }, [containerWidth, scaleFactor]); // Memorizza il risultato in base a containerWidth e scaleFactor

  const intervalWidth = useMemo(
    () => containerWidth / intervalCount,
    [containerWidth, intervalCount]
  ); // Calcola la larghezza di ciascun intervallo

  const intervals = useMemo(
    () =>
      Array.from({ length: intervalCount + 1 }, (_, index) => {
        const position = index * intervalWidth;
        return { position, index };
      }),
    [intervalCount, intervalWidth]
  ); // Memorizza il risultato in base a intervalCount, intervalWidth e scaleFactor

  //console.log("Interval Width", intervalWidth);
  //console.log("Scale Factor:", scaleFactor);
  // console.log(intervals);
  // console.log("Calculated Interval Count:", intervals.length);

  return (
    <>
      <Item
        style={{
          borderStyle: "solid",
          borderWidth: "0.5px",
          borderRadius: 0,
          overflow: "hidden",
          borderImage: "linear-gradient(45deg, #0095B9, #709A3D) 1",
          borderLeft: 0,
          borderRight: 0,
          borderBottom: 0,
          padding: 0,
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            width: "100%",
            height: 40,
            // overflow: "hidden",
          }}
        >
          {intervals.map((_, index) => (
            <div key={index}>
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  left: _.position,
                  bottom: 0,
                  height: index % 10 === 0 ? "10px" : "5px",
                  width: "2px",
                  backgroundColor: "grey",
                }}
              />
              {index % 10 === 0 && (
                <Box
                  key={`label-${index}`}
                  sx={{
                    position: "absolute",
                    left: _.position,
                    bottom: 0,
                    transform: "translateX(-50%)",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="caption"
                    style={{ marginBottom: "10px" }}
                  >
                    {formatTime(index / 10)}
                  </Typography>
                </Box>
              )}
            </div>
          ))}
        </Box>
      </Item>
    </>
  );
};

export default TimeStamp;
