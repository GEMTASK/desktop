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

  override async evaluate(): Promise<KopiValue> {
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

  override async evaluate(environment: Record<string, KopiValue>, bindValues: BindValues): Promise<KopiValue> {
    const [leftExpressionValue, rightExpressionValue] = await Promise.all([
      this.leftExpression.evaluate(environment, bindValues),
      this.rightExpression.evaluate(environment, bindValues)
    ]);

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

  async evaluate(environment: Record<string, KopiValue>): Promise<KopiValue> {
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
