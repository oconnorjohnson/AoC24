import { readFileSync } from "fs";
import { join } from "path";

export function readInput(day: number, filename: string = "input.txt"): string {
  return readFileSync(
    join(__dirname, `../day${day}/inputs/${filename}`),
    "utf-8"
  );
}
