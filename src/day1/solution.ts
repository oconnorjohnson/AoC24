import { readInput } from "../utils/readInput";

const input = readInput(1, "example.txt");

export function part1(input: string): number {
  const [list1, list2] = parseInput(input);
  return 0;
}

export function part2(input: string): number {
  // Your solution for part 2
  return 0;
}

function parseInput(input: string): [number[], number[]] {
  const lines = input.trim().split("\n");
  const list1: number[] = [];
  const list2: number[] = [];

  lines.forEach((line) => {
    const [num1, num2] = line.split(/\s+/).map(Number);
    list1.push(num1);
    list2.push(num2);
  });

  return [list1, list2];
}

if (require.main === module) {
  const example = readInput(1, "example.txt");
  const [list1, list2] = parseInput(example);

  console.log("Example lists:");
  console.log("List 1:", list1); // Should show [3, 4, 2, 1, 3, 3]
  console.log("List 2:", list2); // Should show [4, 3, 5, 3, 9, 3]

  console.log("\nPart 1 result:", part1(example));
}
