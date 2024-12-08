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
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
  let count = 0;

  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[0].length - 1; col++) {
      if (grid[row][col] === "A") {
        console.log(`\nChecking 'A' at (${row},${col})`);

        // Check all four possible arms
        const nw = isValidArm(grid, row, col, [-1, -1]); // northwest
        const se = isValidArm(grid, row, col, [1, 1]); // southeast
        const ne = isValidArm(grid, row, col, [-1, 1]); // northeast
        const sw = isValidArm(grid, row, col, [1, -1]); // southwest

        console.log(`  Arms: NW=${nw}, SE=${se}, NE=${ne}, SW=${sw}`);

        // Count all possible valid X combinations
        let localCount = 0;

        // Any two arms that form an X can make a valid pattern
        if (nw && se) localCount++; // diagonal \
        if (ne && sw) localCount++; // diagonal /
        if (nw && ne) localCount++; // top
        if (se && sw) localCount++; // bottom
        if (nw && sw) localCount++; // left
        if (ne && se) localCount++; // right

        if (localCount > 0) {
          count += localCount;
          console.log(`  Found ${localCount} X-MAS patterns at this A`);
        }
      }
    }
  }
  return count;
}

function isValidArm(
  grid: string[][],
  centerRow: number,
  centerCol: number,
  [dx, dy]: number[]
): boolean {
  // Get the two positions in this direction
  const pos1Row = centerRow + dx;
  const pos1Col = centerCol + dy;
  const pos2Row = centerRow + dx * 2;
  const pos2Col = centerCol + dy * 2;

  // Check bounds
  if (
    !isInBounds(grid, pos1Row, pos1Col) ||
    !isInBounds(grid, pos2Row, pos2Col)
  ) {
    return false;
  }

  const pos1 = grid[pos1Row][pos1Col];
  const pos2 = grid[pos2Row][pos2Col];
  const center = grid[centerRow][centerCol]; // This is 'A'

  // Check all three positions in all possible orders
  const chars = [pos2, pos1, center];
  const isValid = chars.some((c1, i) =>
    chars.some((c2, j) =>
      chars.some(
        (c3, k) =>
          i !== j &&
          j !== k &&
          i !== k && // Ensure different positions
          ((c1 === "M" && c2 === "A" && c3 === "S") || // MAS
            (c1 === "S" && c2 === "A" && c3 === "M")) // SAM
      )
    )
  );

  if (isValid) {
    console.log(
      `    Valid arm found: ${pos2}-${pos1}-${center} at (${pos2Row},${pos2Col}) and (${pos1Row},${pos1Col})`
    );
  }

  return isValid;
}

function isInBounds(grid: string[][], row: number, col: number): boolean {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

if (require.main === module) {
  const example = readInput(4, "example.txt");
  console.log("Example grid:");
  console.log(example);
  console.log("\nPart 2 result:", part2(example));
}
