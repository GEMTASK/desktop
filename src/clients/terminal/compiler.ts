import * as parser from "./lib/parser.js";

import type { ASTNode, KopiValue, RawASTNode } from "./shared.ts";
import { KopiNumber } from "./kopiTypes.ts";

import * as astNodes from "./astNodes.ts";

const transform = (rawAstNode: RawASTNode): ASTNode => {
  switch (rawAstNode.type) {
    case "NumericLiteral":
      return new astNodes.NumericLiteral({
        value: new KopiNumber(rawAstNode.value)
      });
    case "Identifier":
      return new astNodes.Identifier({
        name: rawAstNode.name
      });
    case "OperatorExpression":
      return new astNodes.OperatorExpression({
        operator: rawAstNode.operator,
        leftExpression: transform(rawAstNode.leftExpression),
        rightExpression: transform(rawAstNode.rightExpression)
      });
  }

  throw new Error(`No transform found for '${rawAstNode.type}'`);
};

let environment = {
  a: new KopiNumber(5)
};

const envbind = (bindings: Record<string, KopiValue>) => {
  environment = { ...environment, ...bindings };
};

const ast = transform(parser.parse("3 - (2 + 1)"));

console.log(ast);

const value = await ast.evaluate(environment, envbind);

console.log(value);
