import { useState, useRef, FC } from "react";
import useEventListener from "../hooks/useEventListener";

interface Props {
  image: any;
}

const ImageCard: FC<Props> = ({ image }) => {
  const [spans, setSpans] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const { description, urls } = image;

  useEventListener(
    "load",
    () => {
      const height = imageRef.current?.clientHeight!;
      const spans = Math.ceil(height / 10);
      setSpans(spans);
    },
    imageRef
  );

  return (
    <div style={{ gridRowEnd: `span ${spans}` }}>
      <img ref={imageRef} alt={description} src={urls.regular} />
    </div>
  );
};

export default ImageCard;
