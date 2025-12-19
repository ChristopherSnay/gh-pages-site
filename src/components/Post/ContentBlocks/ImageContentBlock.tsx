import { Box } from '@mui/material';
import { useState } from 'react';
import useImages from '../../../hooks/useImages';
import type { ImageContentBlockData } from '../../../models/ImageContentBlockData';
import ImageZoomDialog from '../../ImageZoomDialog';

export default function ImageContentBlock(props: Readonly<ImageContentBlockProps>) {
  const [isZoomDialogOpen, setIsZoomDialogOpen] = useState(false);
  const { localImage } = useImages();

  return (
    <>
      <ImageZoomDialog
        imageDetails={props.data}
        isOpen={isZoomDialogOpen}
        onClose={() => setIsZoomDialogOpen(false)}
      />
      <Box
        component="img"
        src={localImage(props.data.url)}
        alt={props.data.alt}
        className="py-4"
        sx={{
          borderRadius: 2,
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
        onClick={() => setIsZoomDialogOpen(true)}
      />
    </>
  );
}

interface ImageContentBlockProps {
  data: ImageContentBlockData;
}
