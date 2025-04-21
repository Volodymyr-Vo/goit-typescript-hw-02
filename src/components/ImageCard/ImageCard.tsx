import css from "./ImageCard.module.css";
import { Image } from "../types";

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  // if (!image || !image.urls) return null;
  return (
    <div className={css.card} onClick={() => onClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "image"}
        className={css.image}
      />
    </div>
  );
};

export default ImageCard;
