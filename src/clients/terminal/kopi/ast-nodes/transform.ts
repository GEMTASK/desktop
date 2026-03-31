import type { ASTNode, ASTPatternNode, RawASTNode } from "../shared";

import * as astNodes from "./index.ts";

const transform = (rawAstNode: RawASTNode): ASTNode => {
  switch (rawAstNode.type) {
    case "Assignment":
      return new astNodes.Assignment({
        pattern: transform(rawAstNode.pattern) as ASTPatternNode,
        expression: transform(rawAstNode.expression)
      });
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
        value: rawAstNode.value
      });
    case "Identifier":
      return new astNodes.Identifier({
        name: rawAstNode.name
      });
    case "IdentifierPattern":
      return new astNodes.IdentifierPattern({
        name: rawAstNode.name
      });
  }

  throw new Error(`No transform found for '${rawAstNode.type}'`);
};

export default transform;
