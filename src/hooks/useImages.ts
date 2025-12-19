const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';
const defaultImage = import.meta.env.VITE_DEFAULT_IMAGE;

export default function useImages() {
  const localImage = (src?: string): string => {
    if (src) {
      return `${base}/images/${src}`;
    } else {
      return `${base}/images/${defaultImage}`;
    }
  };

  return {
    localImage
  };
}
