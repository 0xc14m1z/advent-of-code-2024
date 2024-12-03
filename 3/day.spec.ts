import { describe, expect, it, test } from "vitest";
import {
  applyEnablers,
  computeTotalInstructionsSum,
  execInstruction,
  parseInstructions,
  parseInstructionsWithEnablers,
} from "./day";

describe("day 3", () => {
  describe("solution", () => {
    describe("computeTotalInstructionsSum", () => {
      test.each<[instructions: string[], expectedResult: number]>([
        [["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"], 161],
        [["mul(2,4)", "mul(8,5)"], 48],
      ])(
        "exectures the instructions %o and sums up the result to %i",
        (instructions: string[], expectedResult: number) => {
          const result = computeTotalInstructionsSum(instructions);
          expect(result).toBe(expectedResult);
        }
      );
    });
  });

  describe("support", () => {
    describe("parseInstructions", () => {
      it("can extract valid instructions from memory", () => {
        const input =
          "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
        const instructions = parseInstructions(input);
        expect(instructions).toEqual([
          "mul(2,4)",
          "mul(5,5)",
          "mul(11,8)",
          "mul(8,5)",
        ]);
      });
    });

    describe("execInstruction", () => {
      test.each<[instruction: string, expectedResult: number]>([
        ["mul(2,4)", 8],
        ["mul(5,5)", 25],
        ["mul(11,8)", 88],
        ["mul(8,5)", 40],
      ])(
        "computes the result for %s, which is %i",
        (instruction: string, expectedResult: number) => {
          expect(execInstruction(instruction)).toBe(expectedResult);
        }
      );
    });

    describe("parseInstructionsWithEnablers", () => {
      it("can extract valid instructions from memory including dos and donts", () => {
        const input =
          "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
        const instructions = parseInstructionsWithEnablers(input);
        expect(instructions).toEqual([
          "mul(2,4)",
          "don't()",
          "mul(5,5)",
          "mul(11,8)",
          "do()",
          "mul(8,5)",
        ]);
      });
    });

    describe("applyEnablers", () => {
      it("filters disabled instructions and leave enabled ones", () => {
        const instructions = [
          "mul(2,4)",
          "don't()",
          "mul(5,5)",
          "mul(11,8)",
          "do()",
          "mul(8,5)",
        ];

        const runnableInstructions = applyEnablers(instructions);

        expect(runnableInstructions).toEqual(["mul(2,4)", "mul(8,5)"]);
      });
    });
  });
});
