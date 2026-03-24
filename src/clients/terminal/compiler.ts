import * as parser from "./lib/parser.js";

import type { ASTNode, KopiValue, RawASTNode } from "./shared.ts";
import { KopiNumber } from "./kopiTypes.ts";

import * as astNodes from "./astNodes.ts";

const transformAst = (rawAstNode: RawASTNode): ASTNode => {
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
        leftExpression: transformAst(rawAstNode.leftExpression),
        rightExpression: transformAst(rawAstNode.rightExpression)
      });
  }

  throw new Error(`No transformAst found for '${rawAstNode.type}'`);
};

let environment = {
  a: new KopiNumber(5)
};

const bindValues = (values: Record<string, KopiValue>) => {
  environment = { ...environment, ...values };
};

const rawAst2 = parser.parse("3 - (2 + 1)");

const ast2 = transformAst(rawAst2);

console.log(ast2);

const value2 = await ast2.evaluate(environment, bindValues);

console.log(value2);
