export type CellType = "code" | "text";

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}

export interface CellsState {
  data: {
    [key: Cell["id"]]: Cell;
  };
  loading: boolean;
  error: string | null;
  order: string[];
}

export interface BundleState {
  [key: Cell["id"]]:
    | {
        loading: boolean;
        err: string;
        code: string;
      }
    | undefined;
}
