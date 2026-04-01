import * as parser from "./lib/parser.js";

import { KopiValue, type Environment } from "./shared.ts";
import { KopiNumber } from "./kopi-types/index.ts";

import transform from "./ast-nodes/transform.ts";

type Assert = (condition: unknown, message?: string) => asserts condition;

const assert: Assert = (condition: unknown, message?: string): asserts condition => {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
};

const sleep = (seconds: number) => {
  return new Promise<number>(resolve => setTimeout(() => resolve(seconds), seconds * 1000));
};

let environment = {
  a: new KopiNumber(5),
  sleep: async (seconds: KopiValue) => {
    assert(seconds instanceof KopiNumber, "Argument to sleep() must be a number");

    return new KopiNumber(await sleep(seconds.value));
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

const interpret = async (line: string, _environment: Environment = environment) => {
  const ast = transform(parser.parse(line));

  return ast.evaluate(_environment, envbind);
};

export {
  environment,
  interpret
};
