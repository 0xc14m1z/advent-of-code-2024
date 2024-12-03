import { readInputFile, sum } from "../utils";

async function run() {
  const input = await readInputFile("./1/input.txt");
  const lists = sortLists(extractLists(input));
  const totalDistance = computeTotalDistance(lists);
  const similarityScore = computeTotalSimilarityScore(lists);

  console.log("Total distance:", totalDistance);
  console.log("Similarity score:", similarityScore);
}

run();

export enum List {
  Left = 0,
  Right = 1,
}

type Pair<T> = [left: T, right: T];
export function ensurePair<T>(maybePair: T[]): asserts maybePair is Pair<T> {
  const [_left, _right, ...more] = maybePair;
  if (more.length) {
    throw new Error("This is not a pair: " + maybePair.toString());
  }
}

export type Lists<T> = Pair<T>[];
export function ensureLists<T>(
  maybeLists: T[][]
): asserts maybeLists is Lists<T> {
  maybeLists.forEach(ensurePair);
}

export function extractLists(inputFileContent: string): Lists<string> {
  const lines = inputFileContent.split("\n");
  const lists = lines.map((line) => line.split("   "));

  ensureLists(lists);

  return lists;
}

export function sortLists(lists: Lists<string>): Lists<number> {
  const asc = (a: number, b: number): number => a - b;

  const left = lists.map(([left]) => Number(left)).toSorted(asc);
  const right = lists.map(([_, right]) => Number(right)).toSorted(asc);

  return lists.map((_, index) => [left[index], right[index]]);
}

export function computeDistances(lists: Lists<number>): number[] {
  return lists.map(([left, right]) => Math.abs(left - right));
}

export function computeTotalDistance(lists: Lists<number>): number {
  const distances = computeDistances(lists);
  return sum(distances);
}

export class Occurrences {
  #counter = new Map<number, number>();

  constructor(values: number[]) {
    values.forEach((value) => this.#markAsSeen(value));
  }

  #markAsSeen(value: number): void {
    this.#counter.set(value, this.of(value) + 1);
  }

  public of(value: number): number {
    return this.#counter.get(value) ?? 0;
  }
}

export function extractListFromLists<T>(lists: Lists<T>, list: List): T[] {
  return lists.map((pair) => pair[list]);
}

export function computeSimilarityScore(
  value: number,
  occurrences: Occurrences
): number {
  return value * occurrences.of(value);
}

export function computeTotalSimilarityScore(lists: Lists<number>): number {
  const left = extractListFromLists(lists, List.Left);
  const right = extractListFromLists(lists, List.Right);
  const occurrences = new Occurrences(right);
  const scores = left.map((value) =>
    computeSimilarityScore(value, occurrences)
  );
  return sum(scores);
}
