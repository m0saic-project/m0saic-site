export const BAND_HEIGHT = 600;
export const INITIAL_BANDS = 6;

export type Band = { id: number; seed: number };

export type Block = { x: number; y: number; w: number; h: number; r: number };

export type Frame = {
  outline: Block;
  inner: Block[];
};
