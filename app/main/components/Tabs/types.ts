export enum TabType {
  RELATIONS = 'relations',
  FINANCE = 'finance',
  PERSON = 'person',
  CAREER = 'career'
}

export interface Tab {
  name: string,
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  type: TabType
}

export interface Prompt {
  data: string;
  theme: string
}