import util from "node:util";

import * as parser from "./lib/parser.js";

import { KopiValue, type ASTNode, type RawASTNode } from "./shared.ts";
import { KopiNumber } from "./kopiTypes.ts";

import * as astNodes from "./astNodes.ts";

util.inspect.defaultOptions.depth = null;

const transform = (rawAstNode: RawASTNode): ASTNode => {
  switch (rawAstNode.type) {
    case "OperatorExpression":
      return new astNodes.OperatorExpression({
        operator: rawAstNode.operator,
        leftExpression: transform(rawAstNode.leftExpression),
        rightExpression: transform(rawAstNode.rightExpression)
      });
    case "ApplyExpression":
      return new astNodes.ApplyExpression({
        expression: transform(rawAstNode.expression),
        argumentExpression: transform(rawAstNode.argumentExpression)
      });
    case "TupleExpression":
      return new astNodes.TupleExpression({
        expressions: rawAstNode.expressions.map((expression: ASTNode) => transform(expression))
      });
    case "NumericLiteral":
      return new astNodes.NumericLiteral({
        value: new KopiNumber(rawAstNode.value)
      });
    case "Identifier":
      return new astNodes.Identifier({
        name: rawAstNode.name
      });
  }

  throw new Error(`No transform found for '${rawAstNode.type}'`);
};

class KopiFunction extends KopiValue {
  _function: (arg: KopiValue) => Promise<KopiValue>;

  constructor(_function: (arg: KopiValue) => Promise<KopiValue>) {
    super();

    this._function = _function;
  }

  apply(thisArgument: undefined, args: [KopiValue]): Promise<KopiValue> {
    return this._function(args[0]);
  }
}

let environment = {
  a: new KopiNumber(5),
  sleep: new KopiFunction((seconds: KopiValue) => {
    if (!(seconds instanceof KopiNumber)) {
      throw new Error("Error");
    }

    return new Promise(resolve => setTimeout(() => resolve(seconds), seconds.value * 1000));
  })
};

const envbind = (bindings: Record<string, KopiValue>) => {
  environment = { ...environment, ...bindings };
};

// const ast = transform(parser.parse("3 - (2 + 1)"));
// const ast = transform(parser.parse("sleep 2 + sleep 3"));
// const ast = transform(parser.parse("()"));
const ast = transform(parser.parse("(sleep 1, sleep 2, sleep 3)"));

console.log(ast);
console.dir(ast, { depth: null });
console.log(util.inspect(ast, { showHidden: false, depth: null, colors: true }));

const value = await ast.evaluate(environment, envbind);

console.log(">>>", await value._inspect());
