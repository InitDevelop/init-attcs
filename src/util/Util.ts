import buildingData from "../db/building_data.json"

export type Dictionary<T> = { [key: string]: T };

export interface NumberPair {
  x: number;
  y: number;
}

export interface StringNumberPair {
  key: string,
  value: number
}

export function getBuildingDistance(from: number, to: number) {
  let fromRow: number = 0;
  let fromCol: number = 0;
  let toRow: number = 0;
  let toCol: number = 0;

  for (const obj of buildingData.buildings) {
    if (obj.building_num === from) {
      fromRow = obj.row;
      fromCol = obj.column;
    }
    if (obj.building_num === to) {
      toRow = obj.row;
      toCol = obj.column;
    }
  }
  return (Math.sqrt(Math.pow(fromRow - toRow, 2) + Math.pow(fromCol - toCol, 2)));
}

export function Range(start: number, end: number, step: number = 1): number[] {
  return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
}