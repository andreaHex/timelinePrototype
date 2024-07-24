import { RowProps } from "./Row";
import Row from "./Row";

import { Grid as MuiGrid, GridProps as MuiGridProps } from "@mui/material";

interface GridProps extends MuiGridProps {
  rows: RowProps[];
  onDeleteRow: (id: number) => void;
}

const Grid: React.FC<GridProps> = ({ rows, onDeleteRow, ...gridProps }) => {
  const handleDeleteRow = (id: number) => {
    onDeleteRow(id);
  };

  return (
    <MuiGrid container spacing={1} {...gridProps}>
      {rows.map((row) => (
        <MuiGrid key={row.id} item xs={12}>
          <Row id={row.id} columns={row.columns} onDelete={handleDeleteRow} />
        </MuiGrid>
      ))}
    </MuiGrid>
  );
};

export default Grid;
