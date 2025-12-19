import { Typography } from '@mui/material';
import type { KeyValueBlockData } from '../../../models/KeyValueBlockData';

export default function KeyValueBlock(props: Readonly<KeyValueBlockProps>) {
  return (
    <>
      {props.data.items.map((item, index) => (
        <div key={index} className="d-flex flex-column mb-2">
          <Typography variant="body2" fontWeight={700}>
            {item.key}
          </Typography>
          <Typography variant="body1">{item.value}</Typography>
        </div>
      ))}
    </>
  );
}

interface KeyValueBlockProps {
  data: KeyValueBlockData;
}
