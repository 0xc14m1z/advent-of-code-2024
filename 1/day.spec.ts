import { describe, expect, it, test } from "vitest";
import {
  computeDistances,
  computeSimilarityScore,
  computeTotalDistance,
  computeTotalSimilarityScore,
  ensureLists,
  ensurePair,
  extractListFromLists,
  extractLists,
  List,
  Lists,
  Occurrences,
  sortLists,
} from "./day";

describe("day 1", () => {
  describe("solution", () => {
    describe("computeTotalDistance", () => {
      it("sums up the distances of between the lists", () => {
        const lists: Lists<number> = [
          [10, 20],
          [20, 30],
          [30, 40],
        ];
        const totalDistance = computeTotalDistance(lists);
        expect(totalDistance).toBe(30);
      });
    });

    describe("computeTotalSimilarityScore", () => {
      it("sums up all the similarity scores", () => {
        const lists: Lists<number> = [
          [1, 1], // 1 * 1 = 1
          [2, 2], // 2 * 2 = 4
          [3, 2], // 3 * 3 = 9
          [3, 3], // 3 * 3 = 9
          [4, 3], // 4 * 0 = 0
          [5, 3], // 5 * 0 = 0
        ];
        const totalScore = computeTotalSimilarityScore(lists);
        expect(totalScore).toBe(23);
      });
    });
  });

  describe("support", () => {
    describe("computeDistances", () => {
      it("computes the absolute distance between to lists", () => {
        const lists: Lists<number> = [
          [2, 5],
          [6, 0],
          [9, 4],
          [10, 10],
        ];
        const distances = computeDistances(lists);
        expect(distances).toEqual([3, 6, 5, 0]);
      });
    });

    describe("extractListFromLists", () => {
      test.each<[list: List, expected: number[]]>([
        [List.Left, [1, 3, 5]],
        [List.Right, [2, 4, 6]],
      ])("knows how to get the %s list", (list: List, expected: number[]) => {
        const lists: Lists<number> = [
          [1, 2],
          [3, 4],
          [5, 6],
        ];
        const target = extractListFromLists(lists, list);
        expect(target).toEqual(expected);
      });
    });

    describe("Occurrencies", () => {
      it("returns the correct number of occurrencies for a value", () => {
        const occurrences = new Occurrences([1, 1, 2, 3, 4, 5, 5, 5]);
        expect(occurrences.of(1)).toBe(2);
        expect(occurrences.of(2)).toBe(1);
        expect(occurrences.of(3)).toBe(1);
        expect(occurrences.of(4)).toBe(1);
        expect(occurrences.of(5)).toBe(3);
      });

      it("returns 0 when the value wasn't in the constructor parameter", () => {
        const occurrences = new Occurrences([]);
        expect(occurrences.of(0)).toBe(0);
        expect(occurrences.of(1)).toBe(0);
        expect(occurrences.of(2)).toBe(0);
      });
    });

    describe("computeSimilarityScore", () => {
      test.each<[testedValue: number, expectedScore: number]>([
        [0, 0],
        [1, 1],
        [2, 4],
        [3, 9],
        [4, 16],
      ])(
        "computes the correct value when testing %i, which is %i",
        (testedValue: number, expectedScore: number) => {
          const occurrences = new Occurrences([1, 2, 2, 3, 3, 3, 4, 4, 4, 4]);
          const score = computeSimilarityScore(testedValue, occurrences);
          expect(score).toBe(expectedScore);
        }
      );
    });

    describe("extractLists", () => {
      it("parses the input in the expected data structure", () => {
        const input = "123   456\n78910   111213\n1415   161718";
        const lists = extractLists(input);
        expect(lists).toEqual([
          ["123", "456"],
          ["78910", "111213"],
          ["1415", "161718"],
        ]);
      });
    });

    describe("sortLists", () => {
      it("returns sorted pairs of numbers", () => {
        const lists: Lists<string> = [
          ["123", "456"],
          ["789", "1011"],
          ["1213", "1415"],
        ];
        const sortedLists = sortLists(lists);
        expect(sortedLists).toEqual([
          [123, 456],
          [789, 1011],
          [1213, 1415],
        ]);
      });
    });

    describe("ensurePair", () => {
      it("throws when a tuple is not a pair", () => {
        const tuple = [1, 2, 3];
        const test = () => ensurePair(tuple);
        expect(test).toThrow();
      });

      it("doesn't throw when a tuple is a proper pair", () => {
        const tuple = [10, 20];
        const test = () => ensurePair(tuple);
        expect(test).not.toThrow();
      });
    });

    describe("ensureLists", () => {
      it("throws when a even a single tuple is not a pair", () => {
        const tuples = [
          [1, 2],
          [3, 4],
          [5, 6, 7],
          [8, 9],
        ];
        const test = () => ensureLists(tuples);
        expect(test).toThrow();
      });

      it("doesn't throw when all the tuples are pairs", () => {
        const tuples = [
          [10, 20],
          [30, 40],
          [50, 60],
          [70, 80],
        ];
        const test = () => ensureLists(tuples);
        expect(test).not.toThrow();
      });
    });
  });
});
