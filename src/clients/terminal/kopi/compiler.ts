import * as parser from "./lib/parser.js";

import { KopiValue, type Environment } from "./shared.ts";
import { KopiNumber, KopiString } from "./kopi-types/index.ts";

import transform from "./ast-nodes/transform.ts";
import { assert } from "./utils.ts";
import KopiFunction from "./kopi-types/KopiFunction.ts";

const sleep = (seconds: number) => {
  return new Promise<number>(resolve => setTimeout(() => resolve(seconds), seconds * 1000));
};

// KopiNumberConstructor.PI = Math.PI;

class KopiNumberConstructor extends KopiValue {
  apply(thisArg: undefined, args: [KopiValue, Environment]) {
    return environment[(args[0].constructor as typeof KopiValue).symbol][KopiNumber.symbol](args[0]);
  }

  override async inspect(): Promise<string> {
    return "Number";
  }
}

class KopiStringConstructor extends KopiValue {
  apply(thisArg: undefined, args: [KopiValue, Environment]) {
    return environment[(args[0].constructor as typeof KopiValue).symbol][KopiString.symbol](args[0]);
  }

  override async inspect(): Promise<string> {
    return "String";
  }
}

//

let environment: any = {
  a: new KopiNumber(5),
  sleep: new KopiFunction(async (seconds: KopiValue) => {
    assert(seconds instanceof KopiNumber, "Argument to sleep() must be a number");

    return new KopiNumber(await sleep(seconds.value));
  }),
  [KopiNumber.symbol]: KopiNumber.methods,
  [KopiString.symbol]: KopiString.methods,
  Number: new KopiNumberConstructor(),
  String: new KopiStringConstructor(),
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
