import readline from "node:readline/promises";
import { env, stdin, stdout } from "node:process";

import { environment, interpret } from "./compiler.ts";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  prompt: "> "
});

rl.prompt();

const nodeEnvironment = {
  ...environment,
  exit: {
    toString: async () => { process.exit(); return ""; }
  }
};

for await (const line of rl) {
  const value = await interpret(line, nodeEnvironment);

  console.log(await value.toString());

  rl.prompt();
}

rl.close();
