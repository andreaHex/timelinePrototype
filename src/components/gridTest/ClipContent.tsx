import { Grid } from "@mui/material";
import React from "react";
import { Item } from "../timeline/RowTimeline";
import thumbnail from "../../assets/thumbnail.png";

interface ClipContentProps {
  clipName: string;
}

export default function ClipContent({ clipName }: ClipContentProps) {
  return (
    <>
      <Grid container spacing={0} >
        <Grid xs={3} item>
        </Grid>
        <Grid xs={9} item>
          <div>{clipName}</div>
        </Grid>
        <Grid xs={12} item></Grid>
      </Grid>
    </>
  );
}
