import * as parser from "./lib/parser.js";

import { KopiValue, type Environment } from "./shared.ts";
import { KopiNumber } from "./kopi-types/index.ts";

import transform from "./ast-nodes/transform.ts";
import { assert } from "./utils.ts";
import KopiFunction from "./kopi-types/KopiFunction.ts";

const sleep = (seconds: number) => {
  return new Promise<number>(resolve => setTimeout(() => resolve(seconds), seconds * 1000));
};

// const KopiNumberConstructor = (value: KopiValue) => {
//   assert(value instanceof KopiNumber);

//   return new KopiNumber(value.value);
// };

// KopiNumberConstructor.PI = Math.PI;

class KopiNumberConstructor extends KopiValue {
  static methods: {
    [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue
  };

  apply(thisArg: undefined, args: [KopiValue, Environment]) {
    // console.log(args[0]);

    console.log(environment[args[0].constructor.symbol][KopiNumber.symbol](args[0]));

    return environment[args[0].constructor.symbol][KopiNumber.symbol](args[0]);
  }

  override async inspect(): Promise<string> {
    return "Number";
  }
}

KopiNumberConstructor.methods = {
  [KopiNumber.symbol]: (thisArg: KopiValue, thatArg: KopiValue) => {
    return thatArg;
  },
};

let environment: any = {
  a: new KopiNumber(5),
  sleep: new KopiFunction(async (seconds: KopiValue) => {
    assert(seconds instanceof KopiNumber, "Argument to sleep() must be a number");

    return new KopiNumber(await sleep(seconds.value));
  }),
  [KopiNumber.symbol]: KopiNumber.methods,
  // Number: new KopiFunction(async (value: KopiValue) => new KopiNumber((value as any).value)),
  Number: new KopiNumberConstructor(),
};

const updateBindings = (bindings: Environment) => {
  environment = { ...environment, ...bindings };
};

// const ast = transform(parser.parse("3 - (2 + 1)"));
// const ast = transform(parser.parse("sleep 2 + sleep 3"));
// const ast = transform(parser.parse("()"));
// const ast = transform(parser.parse("((), sleep (0.5 + 0.5), sleep (1.0 + 1.0))"));

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
