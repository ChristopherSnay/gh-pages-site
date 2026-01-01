import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import type { ListBlockData } from '../../../models/ListBlockData';
import DynamicIcon from '../../DynamicIcon';

export default function ListContentBlock(props: Readonly<ListContentBlockProps>) {
  if (!props.data.items || props.data.items.length === 0) {
    return null;
  }

  return (
    <List>
      {props.data.items.map((item, itemIndex) => (
        <ListItem key={itemIndex}>
          {item.icon && (
            <ListItemIcon>
              <DynamicIcon name={item.icon} />
            </ListItemIcon>
          )}
          <ListItemText primary={item.text} secondary={item.subtext} />
        </ListItem>
      ))}
    </List>
  );
}

interface ListContentBlockProps {
  data: ListBlockData;
}
