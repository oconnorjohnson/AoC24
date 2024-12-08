import { readInput } from "../utils/readInput";

const input = readInput(2);

export function part1(input: string): number {
  const reports = input.trim().split("\n");
  const safeReports = reports.filter((report) => {
    const levels = report.split(" ").map(Number);
    console.log("\nChecking sequence:", levels.join(" "));

    const firstDiff = levels[1] - levels[0];
    const shouldBeIncreasing = firstDiff > 0;

    const isSafe = levels.every((level, index) => {
      if (index === 0) return true;
      const previousLevel = levels[index - 1];
      const difference = level - previousLevel;
      const isValidDifference =
        Math.abs(difference) >= 1 &&
        Math.abs(difference) <= 3 &&
        (shouldBeIncreasing ? difference > 0 : difference < 0);

      console.log(
        `  Comparing ${previousLevel} -> ${level}: diff=${difference}, valid=${isValidDifference}`
      );
      return isValidDifference;
    });

    console.log(`  Safe? ${isSafe}`);
    return isSafe;
  });

  return safeReports.length;
}

export function part2(input: string): number {
  const reports = input.trim().split("\n");

  const safeReports = reports.filter((report) => {
    const levels = report.split(" ").map(Number);
    console.log("\nChecking sequence:", levels.join(" "));

    // First check if it's naturally safe
    if (isReportSafe(levels)) {
      console.log("  Naturally safe!");
      return true;
    }

    // If not naturally safe, try removing each level
    for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = [...levels.slice(0, i), ...levels.slice(i + 1)];
      if (isReportSafe(modifiedLevels)) {
        console.log(`  Safe after removing ${levels[i]} at position ${i}`);
        return true;
      }
    }

    console.log("  Unsafe even with Problem Dampener");
    return false;
  });

  return safeReports.length;
}

function isReportSafe(levels: number[]): boolean {
  if (levels.length < 2) return false;

  const firstDiff = levels[1] - levels[0];
  const shouldBeIncreasing = firstDiff > 0;

  return levels.every((level, index) => {
    if (index === 0) return true;
    const previousLevel = levels[index - 1];
    const difference = level - previousLevel;
    return (
      Math.abs(difference) >= 1 &&
      Math.abs(difference) <= 3 &&
      (shouldBeIncreasing ? difference > 0 : difference < 0)
    );
  });
}

if (require.main === module) {
  console.log("\nPart 2 result:", part2(input));
}
