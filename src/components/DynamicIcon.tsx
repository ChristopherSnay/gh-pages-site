import * as Icons from '@mui/icons-material';

export default function DynamicIcon({ name, ...props }: { name: string }) {
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
