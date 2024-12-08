import { readInput } from "../utils/readInput";

export function part1(input: string): number {
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
  let count = 0;

  const directions = [
    [0, 1], // right
    [1, 0], // down
    [1, 1], // diagonal down-right
    [-1, 1], // diagonal up-right
    [0, -1], // left
    [-1, 0], // up
    [-1, -1], // diagonal up-left
    [1, -1], // diagonal down-left
  ];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      for (const [dx, dy] of directions) {
        if (checkXMAS(grid, row, col, dx, dy)) {
          count++;
          console.log(`Found X at (${row},${col}) with dx=${dx} and dy=${dy}`);
        }
      }
    }
  }
  return count;
}
