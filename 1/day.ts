import FileSystem from "node:fs/promises";

async function run() {
  const input = await readInputFile();
  const lists = sortLists(extractLists(input));
  const distances = computeDistances(lists);
  const answer = computeTotalDistance(distances);

  console.log(answer);
}

run();

async function readInputFile(): Promise<string> {
  const rawContent = await FileSystem.readFile("./1/input.txt");
  return rawContent.toString();
}

type Pair<T> = [left: T, right: T];
function ensurePair<T>(maybePair: T[]): asserts maybePair is Pair<T> {
  const [_left, _right, ...more] = maybePair;
  if (more.length) {
    throw new Error("This is not a pair: " + maybePair.toString());
  }
}

type Lists<T> = Pair<T>[];
function ensureLists<T>(maybeLists: T[][]): asserts maybeLists is Lists<T> {
  maybeLists.forEach(ensurePair);
}

function extractLists(inputFileContent: string): Lists<string> {
  const splitBy = (splitter: string) => (input: string) =>
    input.split(splitter);

  const lines = splitBy("\n")(inputFileContent);
  const lists = lines.map(splitBy("   "));

  ensureLists(lists);

  return lists;
}

function sortLists(lists: Lists<string>): Lists<number> {
  const asc = (a: number, b: number): number => a - b;

  const left = lists.map(([left]) => Number(left)).toSorted(asc);
  const right = lists.map(([_, right]) => Number(right)).toSorted(asc);

  return lists.map((_, index) => [left[index], right[index]]);
}

function computeDistances(lists: Lists<number>): number[] {
  return lists.map(([left, right]) => Math.abs(left - right));
}

function computeTotalDistance(distances: number[]): number {
  return distances.reduce((total, distance) => total + distance, 0);
}
