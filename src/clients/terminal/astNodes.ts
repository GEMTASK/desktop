import { ASTNode, KopiValue, type BindValues } from "./shared.ts";

import { KopiNumber } from "./kopiTypes.ts";

class NumericLiteral extends ASTNode {
  readonly value: KopiNumber;

  constructor({ value }: {
    value: KopiNumber
  }) {
    super();

    this.value = value;
  }

  evaluate(): KopiValue {
    return this.value;
  }
}

class OperatorExpression extends ASTNode {
  readonly operator: "+" | "-";
  readonly leftExpression: ASTNode;
  readonly rightExpression: ASTNode;

  constructor({ operator, leftExpression, rightExpression }: {
    operator: "+" | "-", leftExpression: ASTNode, rightExpression: ASTNode
  }) {
    super();

    this.operator = operator;
    this.leftExpression = leftExpression;
    this.rightExpression = rightExpression;
  }

  override evaluate(environment: Record<string, KopiValue>, bindValues: BindValues): KopiValue {
    const leftExpressionValue = this.leftExpression.evaluate(environment, bindValues);
    const rightExpressionValue = this.rightExpression.evaluate(environment, bindValues);

    const method = leftExpressionValue[this.operator];

    if (typeof method !== "function") {
      throw new Error(`'${leftExpressionValue._inspect()}' of type ${leftExpressionValue.constructor.name} doesn't have an operator method '${this.operator}'`);
    }

    return method.apply(leftExpressionValue, [rightExpressionValue]);
  }
}

class Identifier extends ASTNode {
  readonly name: string;

  constructor({ name }: {
    name: string
  }) {
    super();

    this.name = name;
  }

  evaluate(environment: Record<string, KopiValue>): KopiValue {
    const value = environment[this.name];

    if (!value) {
      throw Error(`Variable ${this.name} not found in current scope`);
    }

    return value;
  }
}

export {
  NumericLiteral,
  Identifier,
  OperatorExpression
};
