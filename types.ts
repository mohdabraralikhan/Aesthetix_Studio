export interface NavItem {
  label: string;
  id: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  color: string;
  size?: 'normal' | 'large' | 'tall';
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tags?: string[];
  color: string;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

export enum SectionId {
  HERO = 'hero',
  SERVICES = 'services',
  PROCESS = 'process',
  WORK = 'work',
  ABOUT = 'about',
  CONTACT = 'contact'
}
