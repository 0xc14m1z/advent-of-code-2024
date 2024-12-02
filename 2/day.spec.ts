import { describe, expect, it } from "vitest";
import {
  computeSafeReportsCount,
  computeSafeReportsWhenDampenedCount,
  extractReports,
  hasAdjacentLevels,
  hasConstantDirection,
  isReportSafe,
  isReportSafeWhenDampened,
  Report,
} from "./day";

describe("day 2", () => {
  describe("solution", () => {
    describe("computeSafeReportsCount", () => {
      it("computes the correct number of safe reports", () => {
        const input =
          "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9";
        const reports = extractReports(input);
        const count = computeSafeReportsCount(reports);
        expect(count).toBe(2);
      });
    });

    describe("computeSafeReportsWhenDampenedCount", () => {
      it("computes the correct number of safe reports when dampened", () => {
        const input =
          "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9";
        const reports = extractReports(input);
        const count = computeSafeReportsWhenDampenedCount(reports);
        expect(count).toBe(4);
      });
    });
  });

  describe("support", () => {
    describe("extractReports", () => {
      it("reads and the input and extracts the reports", () => {
        const input = "1 2 3 4 5\n10 11 12 13 14 15 16\n0 1";
        const reports = extractReports(input);
        expect(reports).toEqual([
          [1, 2, 3, 4, 5],
          [10, 11, 12, 13, 14, 15, 16],
          [0, 1],
        ]);
      });
    });

    describe("hasConstantDirection", () => {
      it("detects all increasing values", () => {
        const values = [1, 2, 3, 4, 5];
        expect(hasConstantDirection(values)).toBe(true);
      });

      it("detects all decreasing values", () => {
        const values = [5, 4, 3, 2, 1];
        expect(hasConstantDirection(values)).toBe(true);
      });

      it("rejects values without a constant direction", () => {
        const values = [1, 5, 2, 4, 3];
        expect(hasConstantDirection(values)).toBe(false);
      });

      it("rejects equal values", () => {
        const values = [1, 2, 2, 3, 4];
        expect(hasConstantDirection(values)).toBe(false);
      });
    });

    describe("hasAdjacentLevels", () => {
      it("returns true when values have a distance between 1 and 3", () => {
        const values = [1, 2, 4, 7];
        expect(hasAdjacentLevels(values)).toBe(true);
      });

      it("returns false when values have a distance lower than 1", () => {
        const values = [1, 2, 2, 3];
        expect(hasAdjacentLevels(values)).toBe(false);
      });

      it("returns false when values have a distance greater than 3", () => {
        const values = [10, 20, 30];
        expect(hasAdjacentLevels(values)).toBe(false);
      });
    });

    describe("isReportSafe", () => {
      it("returns true when direction is constant and levels are adjacent", () => {
        const report: Report = [1, 2, 3, 4, 5];
        expect(isReportSafe(report)).toBe(true);
      });

      it("returns false when direction is not constant", () => {
        const report: Report = [1, 0, 1, 2, 1];
        expect(isReportSafe(report)).toBe(false);
      });

      it("returns false when levels are not adjacent", () => {
        const report: Report = [1, 2, 10, 11, 12];
        expect(isReportSafe(report)).toBe(false);
      });

      it("returns false there are not enough levels", () => {
        const report: Report = [1];
        expect(isReportSafe(report)).toBe(false);
      });
    });

    describe("isReportSafeWhenDampened", () => {
      it("returns true when direction is constant and levels are adjacent", () => {
        const report: Report = [1, 2, 3, 4, 5];
        expect(isReportSafeWhenDampened(report)).toBe(true);
      });

      it("returns true when direction is not constant for a single level", () => {
        const report: Report = [1, 3, 2, 4, 5];
        expect(isReportSafeWhenDampened(report)).toBe(true);
      });

      it("returns false when direction is not constant by more than one level", () => {
        const report: Report = [1, 0, 2, 1, 3];
        expect(isReportSafeWhenDampened(report)).toBe(false);
      });

      it("returns true when levels are not adjacent for a single level", () => {
        const report: Report = [8, 6, 4, 4, 1];
        expect(isReportSafeWhenDampened(report)).toBe(true);
      });

      it("returns false when levels are not adjacent by more than one level", () => {
        const report: Report = [8, 6, 4, 4, 4, 1];
        expect(isReportSafeWhenDampened(report)).toBe(false);
      });

      it("returns false there are not enough levels", () => {
        const report: Report = [1];
        expect(isReportSafeWhenDampened(report)).toBe(false);
      });
    });
  });
});
