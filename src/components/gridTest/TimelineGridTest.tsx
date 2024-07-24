import Clip from "../timeline/Clip";
import { RowProps } from "./Row";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Grid from "./Grid";
import { Grid as MuiGrid } from "@mui/material";
import { Item } from "../timeline/RowTimeline";
import FooterControls from "./FooterControls";
import { RangeInputHandle } from "./FooterControls";
import TimeStampOld from "./TimeStampOld";
import IconButton from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import TimeStampTest from "./TimeStampTest";
import { Height } from "@mui/icons-material";
import TimeStamp from "./TimeStamp";

export default function TimelineGridTest() {
  const [width, setWidth] = useState<string | null>("100");
  const [elementWidth, setElementWidth] = useState<string | null>("100");
  const rangeInputRef = useRef<RangeInputHandle>(null);
  const [translate1, setTranslate1] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const otherDivRef = useRef<HTMLDivElement>(null);

  const [initialScaleFactor, setInitialScaleFactor] = useState<number>(
    Number(rangeInputRef.current?.getValue())
  );

  const [rows, setRows] = useState<RowProps[]>([
    {
      id: 1,
      columns: [
        {
          content: (
            <Clip
              isClicked
              id="1"
              clipName="Clip 1"
              translate={translate1}
              width="300"
            />
          ),
        },
      ],
      onDelete: (id) => handleDeleteRow(id),
    },
    {
      id: 2,
      columns: [
        {
          content: (
            <Clip
              isClicked
              id="2"
              clipName="Clip 2"
              translate={translate1}
              width="300"
            />
          ),
        },
        {
          content: (
            <Clip
              isClicked
              id="2"
              clipName="Clip 3"
              translate={translate1}
              width="400"
            />
          ),
        },
      ],
      onDelete: (id) => handleDeleteRow(id),
    },
  ]);

  // console.log(typeof(rangeInputRef.current?.getValue()));

  useEffect(() => {
    const updateElementWidth = () => {
      if (rangeInputRef.current) {
        const value = rangeInputRef.current.getValue();
        setElementWidth(value);
      }
    };

    updateElementWidth();

    const interval = setInterval(updateElementWidth, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAddRow = () => {
    const newId = rows.length + 1;
    const newRow: RowProps = {
      id: newId,
      columns: [
        {
          content: (
            <Clip
              isClicked
              id={newId.toString()}
              clipName={"Clip " + newId.toString()}
              translate={translate1}
              width="200"
            />
          ),
        },
      ],
      onDelete: (id) => handleDeleteRow(id),
    };
    setRows((prevStateRows) => {
      return [...prevStateRows, newRow];
    });
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  return (
    <>
      <MuiGrid container rowSpacing={10}>
        <MuiGrid xs={12} item>
          {/* <TimeStampOld
            scaleFactor={Number(rangeInputRef.current?.getValue())}
            multIntervalTime={2}
          />
          <div style={{ height: "20px" }}></div> */}
          <TimeStamp
            scaleFactor={Number(rangeInputRef.current?.getValue())}
          />
        </MuiGrid>
        <MuiGrid xs={2} item>
          <Button
            // variant="contained"
            variant="outlined"
            onClick={handleAddRow}
            size="small"
            style={{
              borderImage: "linear-gradient(45deg, #0095B9, #709A3D) 1",
              borderStyle: "solid",
              borderWidth: "0.5px",
            }}
          >
            <AddOutlinedIcon style={{ color: "white" }} />
          </Button>
        </MuiGrid>
        <MuiGrid xs={10} item>
          {/* <div
            ref={elementRef}
            style={{
              height: "10px",
              background: "linear-gradient(45deg, #0095B9, #709A3D)",
              marginTop: "20px",
              width: `${elementWidth}px`,
            }}
          /> */}
        </MuiGrid>
      </MuiGrid>

      <Grid
        rows={rows}
        onDeleteRow={handleDeleteRow}
        mt={2}
        // ref={otherDivRef}
      />
      <FooterControls
        defaultValue={1}
        ref={rangeInputRef}
        // otherDivRef={otherDivRef}
      />
    </>
  );
}
