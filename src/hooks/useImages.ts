import { CONFIG } from '../constants/config';

const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';

export default function useImages() {
  const localImage = (src?: string): string => {
    if (src) {
      return `${base}/images/${src}`;
    } else {
      return `${base}/images/${CONFIG.DEFAULT_IMAGE}`;
    }
  };

  return {
    localImage
  };
}
