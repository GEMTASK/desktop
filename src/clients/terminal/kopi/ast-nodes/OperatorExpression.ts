import { ASTNode, KopiValue, type UpdateBindings, type Environment } from "../shared.ts";

type Methods = {
  [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue
};

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

  override async inspect(): Promise<string> {
    return "OperatorExpression";
  }

  override async evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue> {
    const [leftExpressionValue, rightExpressionValue] = await Promise.all([
      this.leftExpression.evaluate(environment, updateBindings),
      this.rightExpression.evaluate(environment, updateBindings),
    ]);

    const symbol = (leftExpressionValue.constructor as typeof KopiValue).type.symbol;
    const method = (environment[symbol] as unknown as Methods)[this.operator];

    if (typeof method !== "function") {
      throw new Error(`'${leftExpressionValue.toString()
        }' of type ${leftExpressionValue.constructor.name} doesn't have an operator method '${this.operator}'`);
    }

    return method.apply(undefined, [leftExpressionValue, rightExpressionValue]);
  }
}

export default OperatorExpression;
