export type PhotoKind = "interior" | "food" | "exterior";

export type Photo = {
  src: string;
  kind: PhotoKind;
  index: number;
};

export type PhotoSet = Record<PhotoKind, Photo[]>;
