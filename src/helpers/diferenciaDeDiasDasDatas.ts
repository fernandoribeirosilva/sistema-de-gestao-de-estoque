export function diferenciaDeDiasDasDatas(
  dataStart: Date,
  dataEnd: Date
): number {
  let timeDiff = Math.abs(dataStart.getTime() - dataEnd.getTime()) + 1;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}
