import { ASTNode, KopiValue, type EnvBind, type Environment } from "../shared.ts";

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

  override async evaluate(environment: Environment, envbind: EnvBind): Promise<KopiValue> {
    const [leftExpressionValue, rightExpressionValue] = await Promise.all([
      this.leftExpression.evaluate(environment, envbind),
      this.rightExpression.evaluate(environment, envbind)
    ]);

    const method = (leftExpressionValue.constructor as typeof KopiValue).methods[this.operator];

    if (typeof method !== "function") {
      throw new Error(`'${leftExpressionValue.inspect()
        }' of type ${leftExpressionValue.constructor.name} doesn't have an operator method '${this.operator}'`);
    }

    return method.apply(undefined, [leftExpressionValue, rightExpressionValue]);
  }
}

export default OperatorExpression;
