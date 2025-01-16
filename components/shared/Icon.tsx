import React from 'react';
import {
  FileText,
  BarChart2,
  Home,
  MapPin,
  DollarSign,
  Calculator,
  TrendingUp,
  Layers,
  Percent,
  Clipboard,
  Key,
  User,
  Users,
} from 'lucide-react';

type IconProps = {
  name: string;
  className?: string;
};

const ICONS: Record<string, React.ElementType> = {
  FileText,
  BarChart2,
  Home,
  MapPin,
  DollarSign,
  Calculator,
  TrendingUp,
  Layers,
  Percent,
  Clipboard,
  Key,
  User,
  Users,
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = ICONS[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export default Icon;
