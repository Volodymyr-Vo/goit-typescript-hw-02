import css from "./ImageCard.module.css";
import { Image } from "../types";

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  return (
    <div className={css.card} onClick={() => onClick(image)}>
      <img
        src={image.largeImageURL}
        alt={image.description || "image"}
        className={css.image}
      />
    </div>
  );
};

export default ImageCard;
