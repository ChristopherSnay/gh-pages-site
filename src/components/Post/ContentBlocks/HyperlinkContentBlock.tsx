import { Link } from 'react-router-dom';
import type { HyperlinkContentBlockData } from '../../../models/HyperlinkContentBlockData';

export default function HyperlinkContentBlock(
  props: Readonly<HyperlinkContentBlockProps>
) {
  return <Link to={props.data.url}>{props.data.content}</Link>;
}

interface HyperlinkContentBlockProps {
  data: HyperlinkContentBlockData;
}
