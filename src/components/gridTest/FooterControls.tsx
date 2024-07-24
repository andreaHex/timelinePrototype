import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IconButton, Input, Grid as MuiGrid, Slider } from "@mui/material";
import { Item } from "../timeline/RowTimeline";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
import PositionBar from "./PositionBar";
import Draggable from "react-draggable";

interface RangeInputProps {
  defaultValue?: number;
  onChange?: (newValue: number | null) => void;
}

interface PositionBarProps {
  otherDivRef: React.RefObject<HTMLDivElement>;
}

export interface RangeInputHandle {
  getValue: () => string | null;
}

const FooterControls = forwardRef<RangeInputHandle, RangeInputProps>(
  (
    {
      defaultValue = 1,
      onChange,
    }: // otherDivRef,
    RangeInputProps,
    ref: Ref<RangeInputHandle>
  ) => {
    const [value, setValue] = useState<number>(defaultValue);
    const [intervalId, setIntervalId] = useState<ReturnType<
      typeof setInterval
    > | null>(null);
    const input = useRef<HTMLInputElement>(null);
    // const otherDivRef = useRef<HTMLDivElement>(null);
    // const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      (): RangeInputHandle => ({
        getValue: () => {
          if (input.current) {
            const currentValue = input.current.value;
            return isNaN(parseInt(currentValue))
              ? value.toString()
              : currentValue;
          }
          return value.toString();
        },
      }),
      [value]
    );

    useEffect(() => {
      if (input.current) {
        const currentValue = parseInt(input.current.value);
        setValue(isNaN(currentValue) ? defaultValue : currentValue);
      }
    }, [defaultValue]);

    const handleIncrement = () => {
      setValue((prevValue) => {
        if (prevValue < 100) {
          return prevValue + 1;
        }
        return prevValue;
      });

      // const intervalId = setInterval(() => {
      //   setValue((prevValue) => {
      //     let newValue = prevValue + 1;
      //     if (newValue > 700) {
      //       newValue = 100;
      //     }
      //     return newValue;
      //   });
      // }, 100);
      // setIntervalId(intervalId);
    };

    const handleDecrement = () => {
      setValue((prevValue) => {
        if (prevValue > 1) {
          return prevValue - 1;
        }
        return prevValue;
      });

      // const intervalId = setInterval(() => {
      //   setValue((prevValue) => {
      //     let newValue = prevValue - 1;
      //     if (newValue < 0) {
      //       newValue = 0;
      //     }
      //     return newValue;
      //   });
      // }, 100);
      // setIntervalId(intervalId);
    };

    const handleMouseUp = () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number);
    };

    const getCurrentValue = () => {
      if (input.current) {
        const currentValue = input.current.value;
        return isNaN(parseInt(currentValue)) ? value.toString() : currentValue;
      }
      return value.toString();
    };

    // console.log(getCurrentValue());

    return (
      <MuiGrid
        // spacing={2}
        container
        style={{
          marginTop: "40px",
          borderTop: "0.5px solid grey",
        }}
      >
        <MuiGrid item xs={3} height={"35px"}>
          <Item
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              height: "100%",
              borderRadius: 0,
            }}
          >
            <IconButton size="small">
              <LinkOutlinedIcon />
            </IconButton>
            <IconButton size="small">
              <LinkOffOutlinedIcon />
            </IconButton>
            <IconButton size="small">
              <LinearScaleOutlinedIcon />
            </IconButton>
            <IconButton size="small">
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton size="small">
              <PaletteOutlinedIcon />
            </IconButton>
          </Item>
        </MuiGrid>
        <MuiGrid
          item
          xs={6}
          height={"35px"}
          display={"flex"}
          justifyContent={"center"}
        >
          {/* <Draggable axis="x" bounds="parent">

          </Draggable> */}
          <Item
            style={{
              borderImage: "linear-gradient(45deg, #0095B9, #709A3D) 1",
              borderStyle: "solid",
              borderWidth: "0.5px",
              borderRadius: 2,
              width: "50%",
              cursor: "pointer",
              height: "100%",
            }}
          />
        </MuiGrid>
        <MuiGrid item xs={3} height={"35px"}>
          {" "}
          <Item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              height: "100%",
              borderRadius: 0,
            }}
          >
            <IconButton
              size="small"
              onMouseDown={handleDecrement}
              onMouseUp={handleMouseUp}
            >
              <RemoveOutlinedIcon />
            </IconButton>

            <Slider
              ref={input}
              aria-label="Small"
              min={1}
              max={100}
              value={value}
              onChange={handleChange}
              color="secondary"
              size="small"
              style={{ width: "70%" }}
              valueLabelDisplay="auto"
            />

            <IconButton
              size="small"
              onMouseDown={handleIncrement}
              onMouseUp={handleMouseUp}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Item>
        </MuiGrid>
      </MuiGrid>
    );
  }
);

export default FooterControls;
