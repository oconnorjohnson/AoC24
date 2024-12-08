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
          const word = ["X", "M", "A", "S"]
            .map((_, i) => grid[row + dx * i][col + dy * i])
            .join("");
          console.log(
            `Found ${word} starting at (${row},${col}) going direction (${dx},${dy})`
          );
        }
      }
    }
  }
  return count;
}

function checkXMAS(
  grid: string[][],
  startRow: number,
  startCol: number,
  dx: number,
  dy: number
): boolean {
  const word = "XMAS";

  // check if the word would go out of bounds
  for (let i = 0; i < word.length; i++) {
    const row = startRow + dx * i;
    const col = startCol + dy * i;

    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return false;
    }
  }

  // check if the letters match
  for (let i = 0; i < word.length; i++) {
    const row = startRow + dx * i;
    const col = startCol + dy * i;
    if (grid[row][col] !== word[i]) {
      return false;
    }
  }

  return true;
}

export function part2(input: string): number {
  return 0;
}

if (require.main === module) {
  const example = readInput(4);
  console.log("Example grid:");
  console.log(example);
  console.log("\nPart 1 result:", part1(example));
}
