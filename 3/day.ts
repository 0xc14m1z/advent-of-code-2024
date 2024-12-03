import { readInputFile, sum } from "../utils";

async function run() {
  const input = await readInputFile("./3/input.txt");
  const instructions = parseInstructions(input);
  const result = computeTotalInstructionsSum(instructions);

  console.log("Total sum:", result);
}

run();

export function parseInstructions(input: string): string[] {
  const pattern = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = input.matchAll(pattern);
  const instructions = Array.from(matches).map((match) => match[0]);
  return instructions;
}

export function execInstruction(instruction: string): number {
  const pattern = /mul\((\d{1,3}),(\d{1,3})\)/;
  const [_match, firstOperand, secondOperand] = instruction.match(pattern)!;
  return Number(firstOperand) * Number(secondOperand);
}

export function computeTotalInstructionsSum(instructions: string[]): number {
  const partialResults = instructions.map(execInstruction);
  return sum(partialResults);
}
