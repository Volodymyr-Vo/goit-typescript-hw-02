import "./App.css";
import { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage";
import { ImageModal } from "./ImageModal/ImageModal";
import { Loader } from "./Loader/Loader";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "./Services/Api";
import { useState, useEffect } from "react";
import type { Image } from "./types";
import Modal from "react-modal";

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const openModal = (image: Image) => {
    if (!isModalOpen) {
      setSelectedImage(image);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleSearch = async (newQuery: string) => {
    setIsLoading(true);
    setError(null);
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    try {
      const fetchedImages = await fetchImages(newQuery, 1);
      console.log("Отримані зображення:", fetchedImages);
      if (fetchedImages.length === 0) {
        setError("No images found");
        return;
      }

      setImages(fetchedImages);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const fetchedImages = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...fetchedImages]);
      setPage(nextPage);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery images={images} onImageClick={openModal} />
      {Array.isArray(images) && images.length > 0 && !isLoading && (
        <div className="load-more-container">
          <LoadMoreBtn onClick={handleLoadMore} />
        </div>
      )}
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={closeModal}
      />
      <Toaster />
    </div>
  );
}
