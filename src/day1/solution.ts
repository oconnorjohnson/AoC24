import { readInput } from "../utils/readInput";

const input = readInput(1);

export function part1(input: string): number {
  const [list1, list2] = parseInput(input);

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  const differences = list1.map((item, index) => Math.abs(item - list2[index]));

  return differences.reduce((acc, cur) => acc + cur, 0);
}

export function part2(input: string): number {
  const [list1, list2] = parseInput(input);
  const frequencies = new Map<number, number>();

  // count frequencies in list2
  list2.forEach((num) => {
    frequencies.set(num, (frequencies.get(num) || 0) + 1);
  });

  // lets test our frequency counting
  const similarityScore = list1.reduce((total, num) => {
    const frequency = frequencies.get(num) || 0;
    const score = num * frequency;

    console.log(
      `${num} appears ${frequency} times: ${num} * ${frequency} = ${score}`
    );

    return total + score;
  }, 0);

  return similarityScore;
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
  const example = readInput(1);
  console.log("\nPart 2 result:", part2(example));
}
