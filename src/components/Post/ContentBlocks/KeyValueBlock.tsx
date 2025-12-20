import { Typography } from '@mui/material';
import type { KeyValueBlockData } from '../../../models/KeyValueBlockData';

export default function KeyValueBlock(props: Readonly<KeyValueBlockProps>) {
  return (
    <>
      {props.data.items.map((item, index) => (
        <div
          key={index}
          className="d-flex flex-column mb-3 border-start border-3 border-warning ps-2 ms-2"
        >
          <Typography variant="overline" fontWeight={800} className="lh-1">
            {item.key}
          </Typography>
          <Typography variant="body1" className="mt-1">
            {item.value}
          </Typography>
        </div>
      ))}
    </>
  );
}

interface KeyValueBlockProps {
  data: KeyValueBlockData;
}
