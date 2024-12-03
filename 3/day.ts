import { readInputFile, sum } from "../utils";

async function run() {
  const input = await readInputFile("./3/input.txt");

  let instructions = parseInstructions(input);
  let result = computeTotalInstructionsSum(instructions);
  console.log("Total sum:", result);

  instructions = parseInstructionsWithEnablers(input);
  instructions = applyEnablers(instructions);
  result = computeTotalInstructionsSum(instructions);
  console.log("Total sum of enabled instructions:", result);
}

run();

const Patterns = Object.freeze({
  onlyMultiplications: /mul\(\d{1,3},\d{1,3}\)/g,
  multiplicationsWithEnablers: /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g,
  instructions: Object.freeze({
    multiplication: /mul\((\d{1,3}),(\d{1,3})\)/,
    do: /do\(\)/,
    dont: /don't\(\)/,
  }),
});

export function parseInstructions(input: string): string[] {
  const matches = input.matchAll(Patterns.onlyMultiplications);
  const instructions = Array.from(matches).map((match) => match[0]);
  return instructions;
}

export function execInstruction(instruction: string): number {
  const operands = instruction.match(Patterns.instructions.multiplication)!;
  const [_match, firstOperand, secondOperand] = operands;
  return Number(firstOperand) * Number(secondOperand);
}

export function computeTotalInstructionsSum(instructions: string[]): number {
  const partialResults = instructions.map(execInstruction);
  return sum(partialResults);
}

export function parseInstructionsWithEnablers(input: string): string[] {
  const matches = input.matchAll(Patterns.multiplicationsWithEnablers);
  const instructions = Array.from(matches).map((match) => match[0]);
  return instructions;
}

export function applyEnablers(instructions: string[]): string[] {
  const runnableInstructions: string[] = [];
  let enabled = true;

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];

    if (instruction.match(Patterns.instructions.do)) {
      enabled = true;
    } else if (instruction.match(Patterns.instructions.dont)) {
      enabled = false;
    } else {
      if (!enabled) continue;
      runnableInstructions.push(instruction);
    }
  }

  return runnableInstructions;
}
