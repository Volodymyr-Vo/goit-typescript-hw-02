import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

export const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => {
  return <button onClick={onClick}>Load More</button>;
};
