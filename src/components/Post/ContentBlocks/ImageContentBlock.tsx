import { Box } from '@mui/material';
import useImages from '../../../hooks/useImages';
import type { ImageContentBlockData } from '../../../models/ImageContentBlockData';

export default function ImageContentBlock(props: Readonly<ImageContentBlockProps>) {
  const { localImage } = useImages();

  const handleImageClick = (): void => {
    window.open(localImage(props.data.url));
  };

  return (
    <Box
      component="img"
      src={localImage(props.data.url)}
      alt={props.data.alt}
      className="py-4"
      sx={{
        borderRadius: 2,
        cursor: 'pointer',
        display: 'block',
        objectFit: 'contain',
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '100%',
          md: 600,
          lg: 500
        },
        maxHeight: {
          xs: '100%',
          sm: '100%',
          md: 400,
          lg: 400
        },
        margin: 'auto',
        boxShadow: 'inherit'
      }}
      onClick={handleImageClick}
    />
  );
}

interface ImageContentBlockProps {
  data: ImageContentBlockData;
}
