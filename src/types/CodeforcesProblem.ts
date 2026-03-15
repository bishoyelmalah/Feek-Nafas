export interface CodeforcesProblem {
  name: string;
  contestId: number;
  index: string;
  type?: string;
  rating?: number;
  tags?: string[];
}