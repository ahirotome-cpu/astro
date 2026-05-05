import { JSX, ReactElement } from "react";

export enum TabType {
  RELATIONS = 'relations',
  FINANCE = 'finance',
  PERSON = 'person',
  CAREER = 'career'
}

export interface Tab {
  id: number, 
  name: string, 
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, 
  type: TabType
}

export interface Prompt {
  data: string;
  format: string
}

export interface IData {
  title: string,
  core: string,
  behavior: string[],
  tension: string[],
  why: string,
  insight: string
}