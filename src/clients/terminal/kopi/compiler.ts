import * as parser from "./lib/parser.js";

import { KopiValue, type Environment } from "./shared.ts";
import { KopiNumber, KopiString } from "./kopi-types/index.ts";

import transform from "./ast-nodes/transform.ts";
import { assert } from "./utils.ts";
import KopiFunction from "./kopi-types/KopiFunction.ts";
import KopiNumberConstructor from "./kopi-types/KopiNumberConstructor.ts";

const sleep = (seconds: number) => {
  return new Promise<number>(resolve => setTimeout(() => resolve(seconds), seconds * 1000));
};

// KopiNumberConstructor.PI = Math.PI;

class LsCommand {
  options: string;

  constructor(options: string = "hello") {
    this.options = options;
  }

  inspect() {
    return this.options;
  }

  apply() {
    return new LsCommand("world");
  }
}

let environment: any = {
  a: new KopiNumber(5),
  sleep: new KopiFunction(async (seconds: KopiValue) => {
    assert(seconds instanceof KopiNumber, "Argument to sleep() must be a number");

    return new KopiNumber(await sleep(seconds.value));
  }),
  [KopiNumberConstructor.symbol]: KopiNumber.methods,
  [KopiString.symbol]: KopiString.methods,
  Number: new KopiNumberConstructor(),
  // String: new KopiStringConstructor(),
  ls: new LsCommand(),
};

const updateBindings = (bindings: Environment) => {
  environment = { ...environment, ...bindings };
};

const parse = (source: string) => {
  return transform(parser.parse(source));
};

const interpret = async (line: string, _environment: Environment = environment) => {
  const ast = parse(line);

  return ast.evaluate(_environment, updateBindings);
};

export {
  environment,
  parse,
  interpret,
};
