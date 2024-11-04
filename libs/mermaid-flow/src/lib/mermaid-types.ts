export interface MermaidEdge {
  start: string;
  end: string;
  type: string;
  text: string;
  labelType: string;
  stroke: string;
  length: number;
}

export interface MermaidNode {
  id: string;
  labelType: string;
  domId: string;
  styles: string[];
  classes: string[];
  text: string;
  type: string;
  props: unknown;
}

export enum MermaidChartDirection {
  TD = "TD",
  LR = "LR",
}
