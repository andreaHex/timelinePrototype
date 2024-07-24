import { Box } from "@mui/material";

export interface ColumnProps {
  content: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ content }) => {
  return <Box>{content}</Box>;
};

export default Column;
