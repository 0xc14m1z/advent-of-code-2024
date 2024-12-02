import { readInputFile } from "../utils";

async function run() {
  const input = await readInputFile("./2/input.txt");
  const reports = extractReports(input);
  const safeReportsCount = computeSafeReportsCount(reports);

  console.log("Safe reports count:", safeReportsCount);
}

run();

export type Report = number[];

export function extractReports(input: string): Report[] {
  const lines = input.split("\n");
  const stringReports = lines.map((line) => line.split(" "));
  const numberReports = stringReports.map((line) => line.map(Number));
  return numberReports;
}

export function hasConstantDirection(levels: number[]): boolean {
  const [first, second] = levels;

  for (let i = 1; i < levels.length; i++) {
    const current = levels[i];
    const previous = levels[i - 1];

    if (first < second && previous < current) continue;
    if (first > second && previous > current) continue;

    return false;
  }

  return true;
}

export function hasAdjacentLevels(levels: number[]): boolean {
  for (let i = 1; i < levels.length; i++) {
    const current = levels[i];
    const previous = levels[i - 1];
    const distance = Math.abs(current - previous);
    if (distance < 1 || distance > 3) return false;
  }

  return true;
}

export function isReportSafe(report: Report): boolean {
  return (
    report.length >= 2 &&
    hasConstantDirection(report) &&
    hasAdjacentLevels(report)
  );
}

export function computeSafeReportsCount(reports: Report[]): number {
  return reports.filter(isReportSafe).length;
}
