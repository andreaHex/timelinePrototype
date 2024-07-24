import { ColumnProps } from "./Column";
import Column from "./Column";
import ControlsTrack from "../timeline/Controls";
import { Grid as MuiGrid } from "@mui/material";
import { Item } from "../timeline/RowTimeline";
import { useRef, useState, WheelEvent } from "react";
import { Center } from "@digitalreality/ui";

export interface RowProps {
  id: number;
  columns: ColumnProps[];
  onDelete: (id: number) => void;
}

interface PositionProps {
  otherDivRef: React.RefObject<HTMLDivElement>;
}

const Row = ({ id, columns, onDelete }: RowProps) => {
  const [width, setWidth] = useState<number>(0);
 
  const handleWhell = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      setWidth((prevWidth) => prevWidth + 10);
    } else {
      setWidth((prevWidth) => prevWidth - 10);
    }
  };

  
  return (
    <MuiGrid container columnSpacing={1} alignItems={"center"}>
      {" "}
      <MuiGrid item xs={2}>
        <ControlsTrack
        
          id={id}
          onDelete={() => onDelete(id)}
          columns={columns}
          trackName={"Track " + id.toString()}
        />
      </MuiGrid>
      <MuiGrid item xs={10}>
        <Item
          onWheel={handleWhell}
          style={{
            display: "flex",
            gap: "5%",
            padding: "1px",
            // border: "1px solid red",
            overflowX: "hidden",
            borderRadius: 0,
          }}
        >
          <div
            style={{
              width: `${width}px`,
              height: "10px",
              background: "linear-gradient(45deg, #0095B9, #709A3D)",
            }}
          ></div>
          {columns.map((column, index) => (
            <Column key={index} content={column.content} />
          ))}
        </Item>
      </MuiGrid>
    </MuiGrid>
  );
};

export default Row;
