import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { environment as originalEnvironment, parse } from "./compiler.ts";
import type { Environment } from "./shared.ts";
import type BlockExpression from "./ast-nodes/BlockExpression.ts";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  prompt: "> "
});

let environment = {
  ...originalEnvironment,
  exit: {
    inspect: async () => { process.exit(); }
  }
};

const updateBindings = (bindings: Environment) => {
  environment = { ...environment, ...bindings };
};

console.log("Kopi shell – a simple, immutable, async programming langauge.");

rl.prompt();

for await (const line of rl) {
  const astRootNode = parse(line);

  for (const astNode of (astRootNode as BlockExpression).statements) {
    const value = await astNode.evaluate(environment, updateBindings);

    console.log(await value.toString());
  }

  rl.prompt();
}

rl.close();
