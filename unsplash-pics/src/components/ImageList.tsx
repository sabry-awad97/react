import "./ImageList.css";
import { FC } from "react";
import ImageCard from "./ImageCard";

interface Props {
  images: any[];
}

const ImageList: FC<Props> = ({ images }) => {
  return (
    <div className="image-list">
      {images.map(image => {
        return <ImageCard key={image.id} image={image} />;
      })}
    </div>
  );
};

export default ImageList;
