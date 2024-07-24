import { useState } from "react";
import { Item } from "./RowTimeline";
import ClipContent from "../gridTest/ClipContent";

type ClipProps = {
  clipName: string;
  id: string;
  translate: number;
  width: string | null;
  isClicked: boolean;
};

export default function Clip({ ...props }: ClipProps) {
  const [isClicked, setIsClicked] = useState(false);

  const styleClip = {
    border: `0.5px solid #999999`,
    width: `${props.width}px`,
    borderRadius: "0px",
    transform: `translateX(${props.translate}px)`,
    background: "transaprent",
    cursor: "pointer",
    borderImage: "",
    // padding: "0",
  };

  

  let styleClipClicked = {
    ...styleClip,
    borderImage: "linear-gradient(45deg, #0095B9, #709A3D) 1",
  };

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      {isClicked ? (
        <Item style={styleClipClicked} id={props.id} onClick={handleClick}>
          <ClipContent clipName={props.clipName} />
        </Item>
      ) : (
        <Item style={styleClip} id={props.id} onClick={handleClick}>
          <ClipContent  clipName={props.clipName} />
        </Item>
      )}
    </>
  );
}
