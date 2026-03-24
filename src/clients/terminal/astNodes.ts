import { ASTNode, KopiValue, type EnvBind } from "./shared.ts";

import { KopiNumber } from "./kopiTypes.ts";

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

  override async evaluate(environment: Record<string, KopiValue>, envbind: EnvBind): Promise<KopiValue> {
    const [leftExpressionValue, rightExpressionValue] = await Promise.all([
      this.leftExpression.evaluate(environment, envbind),
      this.rightExpression.evaluate(environment, envbind)
    ]);

    const method = leftExpressionValue[this.operator];

    if (typeof method !== "function") {
      throw new Error(`'${leftExpressionValue._inspect()}' of type ${leftExpressionValue.constructor.name} doesn't have an operator method '${this.operator}'`);
    }

    return method.apply(leftExpressionValue, [rightExpressionValue]);
  }
}

class ApplyExpression extends ASTNode {
  expression: ASTNode;
  argumentExpression: ASTNode;

  constructor({ expression, argumentExpression }: {
    expression: ASTNode, argumentExpression: ASTNode
  }) {
    super();

    this.expression = expression;
    this.argumentExpression = argumentExpression;
  }

  override async evaluate(environment: Record<string, KopiValue>, envbind: EnvBind): Promise<KopiValue> {
    const functionValue = await this.expression.evaluate(environment, envbind) as unknown as { apply: (thisArg: undefined, args: [KopiValue]) => Promise<KopiValue> };

    return functionValue.apply(undefined, [await this.argumentExpression.evaluate(environment, envbind)]);
  }
}

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
  OperatorExpression,
  ApplyExpression,
  NumericLiteral,
  Identifier
};
