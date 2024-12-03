import { describe, expect, it, test } from "vitest";
import {
  computeTotalInstructionsSum,
  execInstruction,
  parseInstructions,
} from "./day";

describe("day 3", () => {
  describe("solution", () => {
    describe("computeTotalInstructionsSum", () => {
      it("executes all the given instructions and sum up the results", () => {
        const instructions = ["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"];
        const result = computeTotalInstructionsSum(instructions);
        expect(result).toBe(161);
      });
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
  });
});
