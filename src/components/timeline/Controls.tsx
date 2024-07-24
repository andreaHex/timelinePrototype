import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { RowProps } from "../gridTest/Row";
import { IconButton, Input, Typography, Popover } from "@mui/material";
import { useState } from "react";
import { BorderAllRounded } from "@mui/icons-material";

type ControlsTrackProps = {
  trackName: string;
  
 
};

const styleTrackControlDiv = {
  borderImage: "linear-gradient(45deg, #0095B9, #709A3D) 1",
  borderStyle: "solid",
  borderWidth: "0.5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "5px",
};

export default function ControlsTrack({
  trackName,
  
  ...props
}: ControlsTrackProps & RowProps) {
  const [lock, setLock] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [name, setName] = useState(trackName);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTrackName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLock = () => {
    setLock(!lock);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div style={styleTrackControlDiv}>
      <div>
        <IconButton size="small" onClick={() => props.onDelete(props.id)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
        <IconButton size="small" onClick={handleClick}>
          <SettingsOutlinedIcon />
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Typography sx={{ p: 2 }} component={"span"}>
            <Input onChange={handleTrackName} />
          </Typography>
        </Popover>
      </div>
      <Typography>{name}</Typography>
      <div style={{ display: "flex", gap: "5px" }}>
        <IconButton size="small" onClick={handleLock}>
          {lock ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
        </IconButton>
        <IconButton size="small" onClick={handleVisibility}>
          {visibility ? (
            <VisibilityOutlinedIcon />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </IconButton>
        <IconButton size="small">
          <VolumeUpOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}
