import readline from "node:readline/promises";
import process, { stdin, stdout } from "node:process";

import * as parser from "./lib/parser.js";

import { KopiValue, type Environment } from "./shared.ts";
import { KopiNumber } from "./kopi-types/index.ts";

import transform from "./ast-nodes/transform.ts";

let environment = {
  a: new KopiNumber(5),
  sleep: (seconds: KopiValue) => {
    if (!(seconds instanceof KopiNumber)) {
      throw new Error("Error");
    }

    return new Promise(resolve => setTimeout(() => resolve(seconds), seconds.value * 1000));
  },
  exit: {
    toString: async () => { process.exit(); return ""; }
  },
  foo: async (seconds: KopiValue) => {
    if (!(seconds instanceof KopiNumber)) {
      throw new Error("Error");
    }

    return new Promise(resolve => setTimeout(() => resolve(seconds), seconds.value * 1000));
  }
};

const envbind = (bindings: Environment) => {
  console.log("envbind", bindings);

  environment = { ...environment, ...bindings };
};

// const ast = transform(parser.parse("3 - (2 + 1)"));
// const ast = transform(parser.parse("sleep 2 + sleep 3"));
// const ast = transform(parser.parse("()"));
// const ast = transform(parser.parse("((), sleep (0.5 + 0.5), sleep (1.0 + 1.0))"));
const ast = transform(parser.parse("b = 100"));

console.dir(ast, { depth: null });

const value = await ast.evaluate(environment, envbind);

console.log(">>>", await value.toString());

const rl = readline.createInterface({ input: stdin, output: stdout, prompt: "> " });

rl.prompt();

for await (const line of rl) {
  const ast = transform(parser.parse(line));
  const value = await ast.evaluate(environment, envbind);

  console.log(await value.toString());

  rl.prompt();
}

rl.close();
