import { readFileSync } from "fs";
import { join } from "path";

export function readInput(day: number): string {
  return readFileSync(join(__dirname, `../../inputs/day${day}.txt`), "utf-8");
}
