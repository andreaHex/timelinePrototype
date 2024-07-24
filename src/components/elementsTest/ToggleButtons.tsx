// ToggleButtons.tsx
import React from "react";
import { Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpen";
import VisibilityOutlinedIcon from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOff";

interface ToggleButtonsProps {
  onToggleStyle1: () => void;
  onToggleStyle2: () => void;
  isStyle1Active: boolean;
  isStyle2Active: boolean;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  onToggleStyle1,
  onToggleStyle2,
  isStyle1Active,
  isStyle2Active,
}) => {
  return (
    <div>
      <Button variant="text" size="small" onClick={onToggleStyle1}>
        {isStyle1Active ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
      </Button>
      <Button variant="text" size="small" onClick={onToggleStyle2}>
        {isStyle2Active ? (
          <VisibilityOffOutlinedIcon />
        ) : (
          <VisibilityOutlinedIcon />
        )}
      </Button>
    </div>
  );
};

export default ToggleButtons;
