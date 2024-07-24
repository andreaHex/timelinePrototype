import React, { ReactNode } from "react";

type WrapperTimelineProps = {
  children: ReactNode;
};

export default function WrapperTimeline({ children }: WrapperTimelineProps) {
  return (
    <div
      style={{ padding: "50px", marginTop: "50px" }}
    >
      {children}
    </div>
  );
}
