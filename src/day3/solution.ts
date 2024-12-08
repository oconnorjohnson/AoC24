// the goal of the program is just to multiply some numbers. It does that with instructions like mul(X,Y), where X and Y are each 1-3 digit numbers. For instance, mul(44,46) multiplies 44 by 46 to get a result of 2024. Similarly, mul(123,4) would multiply 123 by 4.
// because the program's memory has been corrupted, there are also many invalid characters that should be ignored, even if they look like part of a mul instruction. Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.
// Scan the corrupted memory for uncorrupted mul instructions. What do you get if you add up all of the results of the multiplications?

import { readInput } from "../utils/readInput";

export function part1(input: string): number {
  const mulRegex = /(?<![\w])mul\((\d{1,3}),(\d{1,3})\)/g;

  let total = 0;
  let match;

  while ((match = mulRegex.exec(input)) !== null) {
    const [_, num1, num2] = match;
    const result = parseInt(num1) * parseInt(num2);
    console.log(`Found: mul(${num1},${num2}) = ${result}`);
    total += result;
  }

  return total;
}

export function part2(input: string): number {
  let total = 0;
  let isEnabled = true;
  let position = 0;

  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const doRegex = /(?<![\w])do\(\)/g;
  const dontRegex = /(?<![\w])don't\(\)/g;

  const instructions: {
    type: "mul" | "do" | "dont";
    position: number;
    match: RegExpExecArray;
  }[] = [];

  let match;
  while ((match = mulRegex.exec(input)) !== null) {
    instructions.push({ type: "mul", position: match.index, match });
  }
  while ((match = doRegex.exec(input)) !== null) {
    instructions.push({ type: "do", position: match.index, match });
  }
  while ((match = dontRegex.exec(input)) !== null) {
    instructions.push({ type: "dont", position: match.index, match });
  }

  // sort instructions by position
  instructions.sort((a, b) => a.position - b.position);

  // process insturctions in order
  instructions.forEach((instruction) => {
    console.log(
      `Found ${instruction.type} at position ${instruction.position}`
    );

    if (instruction.type === "do") {
      isEnabled = true;
      console.log("  Enabling mul instructions");
    } else if (instruction.type === "dont") {
      isEnabled = false;
      console.log("  Disabling mul instructions");
    } else if (instruction.type === "mul" && isEnabled) {
      const [_, num1, num2] = instruction.match;
      const result = parseInt(num1) * parseInt(num2);
      console.log(`  Processing enabled mul(${num1},${num2}) = ${result}`);
      total += result;
    } else if (instruction.type === "mul") {
      const [_, num1, num2] = instruction.match;
      console.log(`  Skipping disabled mul(${num1},${num2})`);
    }
  });

  return total;
}

if (require.main === module) {
  const example = readInput(3);
  console.log("\nProcessing:", example);
  console.log("Part 2 result:", part2(example));
}
