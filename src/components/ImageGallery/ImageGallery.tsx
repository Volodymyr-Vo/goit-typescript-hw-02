import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../types";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

export const ImageGallery = ({ images, onImageClick }: ImageGalleryProps) => {
  // if (!images || images.length === 0) {
  //   return null;
  // }

  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};
