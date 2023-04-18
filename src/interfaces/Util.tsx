import buildingData from "../db/building_data.json"

export interface xyTuple {
  x: number,
  y: number
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