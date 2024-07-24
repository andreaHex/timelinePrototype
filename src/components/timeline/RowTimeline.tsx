import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ControlsTrack from "./Controls";
import { ReactNode } from "react";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type ChildrenProps = {
  children: ReactNode;
  trackName: string;
};

export default function RowTimeline({ children, trackName }: ChildrenProps) {
  return (
    <Grid
      container
      columnSpacing={3}
      style={{ marginTop: "10px", alignItems: "center" }}
    >
      <Grid item xs={2}>
        {/* <ControlsTrack trackName={trackName} /> */}
      </Grid>
      <Grid item xs={10} style={{overflowX:'auto'}}>
        <Item style={{
          display: "flex",
          gap: "5%",
          padding:'10px' }}>{children}</Item>
      </Grid>
    </Grid>
  );
}
