export interface PieChartsModel {
  name: string;
  colorByPoint: boolean;
  data: { name: string; y: number; selected?: boolean }[];
}
