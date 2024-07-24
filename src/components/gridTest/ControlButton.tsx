import React from "react";
import { Button } from "@mui/material";

interface ControlButtonProps {
  content: string;
  onClick: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ content, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick} size="small">
      {content}
    </Button>
  );
};

export default ControlButton;
