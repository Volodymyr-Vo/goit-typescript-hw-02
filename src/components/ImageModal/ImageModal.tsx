import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../types";

interface ImageModalProps {
  image: Image | null;
  isOpen: boolean;
  onClose: () => void;
}

Modal.setAppElement("#root");

export const ImageModal = ({ image, isOpen, onClose }: ImageModalProps) => {
  if (!image || !image.largeImageURL) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      overlayClassName={css.overlay}
      className={css.modal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <img src={image.largeImageURL} alt={image.description || "image"} />
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};
