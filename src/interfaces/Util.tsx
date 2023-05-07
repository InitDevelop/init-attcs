import buildingData from "../db/building_data.json"
import { lecture } from "./Lecture";

export interface xyTuple {
  x: number,
  y: number
}

export interface warning {
  warningType: 'time' | 'lunch' | 'empty' | 'count' | 'morning' | 'space';
  extraInfo: string[];
}

export function range(start: number, end: number, step: number = 1): number[] {
  return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
}

export function getDistance(from: number, to: number) {
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