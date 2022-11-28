export enum EmoticonState {
  UnSold,
  Process,
  Sold,
}

export interface Emoticon {
  codePoint: number;
  character: string;
  name: string;
  group: string;
  state: EmoticonState;
}
