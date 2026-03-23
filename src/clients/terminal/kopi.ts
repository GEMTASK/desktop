// import { ASTNode, KopiValue, type BindValues } from "./types";

// import { KopiNumber } from "./kopiTypes";

import * as astNodes from "./astNodes.ts";
import type { ASTNode, KopiValue } from "./types.ts";

type RawAstNode = {
  type: "OperatorExpression",
  operator: string,
  leftExpression: RawAstNode,
  rightExpression: RawAstNode
} | {
  type: "NumericLiteral",
  value: number
};

const rawAst = {
  type: "OperatorExpression",
  operator: "+",
  leftExpression: {
    type: "NumericLiteral",
    value: 3
  },
  rightExpression: {
    type: "NumericLiteral",
    value: 2
  }
} as const;

const transformAst = (rawAstNode: RawAstNode): ASTNode => {
  switch (rawAstNode.type) {
    case "NumericLiteral":
      return new astNodes.NumericLiteral(rawAstNode);
    case "OperatorExpression":
      return new astNodes.OperatorExpression({
        operator: rawAstNode.operator,
        leftExpression: transformAst(rawAstNode.leftExpression),
        rightExpression: transformAst(rawAstNode.rightExpression)
      });
  }
};

const ast = transformAst(rawAst);

let environment = {};

const bindValues = (values: Record<string, KopiValue>) => {
  environment = { ...environment, ...values };
};

const value = ast.evaluate(environment, bindValues);

console.log(value);
