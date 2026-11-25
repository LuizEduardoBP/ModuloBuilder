import React from 'react';
import {
  Binary,
  Briefcase,
  Braces,
  Calendar,
  CreditCard,
  FileText,
  Fingerprint,
  HelpCircle,
  Layers,
  MapPin,
  Shield,
  ShieldAlert,
  Terminal,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Binary,
  Briefcase,
  Braces,
  Calendar,
  CreditCard,
  FileText,
  Fingerprint,
  HelpCircle,
  Layers,
  MapPin,
  Shield,
  ShieldAlert,
  Terminal,
};

interface ToolIconProps {
  name: string;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent className={className} />;
};
