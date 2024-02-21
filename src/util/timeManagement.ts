
export const isTimeIntersect = (thisStart: number, thisEnd: number, thatStart: number, thatEnd: number) => {
  return thisStart <= thatEnd && thisEnd >= thatStart;
}