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
  structure: string
}

export type IData = {
  title: string,
  description: string,
  texts: {
    title: string,
    description: string
  }[]
}