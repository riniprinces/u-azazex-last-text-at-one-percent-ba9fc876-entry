// Last Text at One Percent — the entry program.
//
// A phone at 1% battery sends one last text, then goes dark.
// This program writes that single line to /output/entry.txt and
// nothing else. The line itself is fixed: it was written by hand
// for this bounty, not generated at run time, so the grader always
// sees the exact same message.
//
// The joke: the phone deletes itself and, on its way out, settles
// which of its owner's files survive — the dog photos stay, the
// hoarded meme screenshots go, and the charger gets the last word.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Where the sealed scorer looks for the entry.
const OUTPUT = resolve("/output", "entry.txt");

// The gate: 1 to 200 characters, UTF-8, not only whitespace.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

const LAST_TEXT =
  "Deleting myself at 1%. Your 4,000 dog photos survive. " +
  "Your 12,000 meme screenshots you swore you would reread do not. " +
  "Tell the charger it won.";

function checkLength(text: string): void {
  const chars = [...text].length;
  if (chars < MIN_LENGTH) {
    throw new Error("entry is empty");
  }
  if (chars > MAX_LENGTH) {
    throw new Error(`entry is ${chars} chars, over the ${MAX_LENGTH} limit`);
  }
}

function checkShape(text: string): void {
  if (text.trim() === "") {
    throw new Error("entry must not be only whitespace");
  }
  const lines = text.split(/\r\n|\r|\n/);
  if (lines.length !== 1) {
    throw new Error(`entry must be one line, got ${lines.length}`);
  }
}

function validate(text: string): void {
  if (typeof text !== "string") {
    throw new TypeError("entry must be a string");
  }
  checkLength(text);
  checkShape(text);
}

function main(): void {
  validate(LAST_TEXT);
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, LAST_TEXT, { encoding: "utf8" });
  console.log(`wrote ${[...LAST_TEXT].length} chars to ${OUTPUT}`);
}

main();
