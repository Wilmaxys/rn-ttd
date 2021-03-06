import { ReactNode } from 'react';
import { ImageRequireSource, ImageURISource } from 'react-native';

export type CreativeItem = {
  id?: string;
  type: 'image' | 'module' | 'shape';
  x: number;
  y: number;
  z: number;
  height: number;
  width: number;
  rotation: string;
  value: string;
};

export type ModalComponent = {
  title: string;
  body: () => ReactNode;
};

export type ModuleType = {
  title: string;
  description: string;
  image: ImageURISource | ImageRequireSource;
};

export type BaseModule = {
  id?: string;
  title: string;
  createdAt?: string;
  lastUsedAt?: string;
};

export type ListModule = BaseModule & {
  items: string[];
};

export type TrackerModule = BaseModule & {
  days: { date: string; value: number }[];
};

export type Module = ListModule | TrackerModule;
