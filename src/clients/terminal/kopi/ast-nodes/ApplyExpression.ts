import { ASTNode, KopiValue, type EnvBind, type Environment } from "../shared.ts";

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

  override async toString(): Promise<string> {
    return "ApplyExpression";
  }

  override async evaluate(environment: Environment, envbind: EnvBind): Promise<KopiValue> {
    const functionValue = await this.expression.evaluate(environment, envbind) as unknown as {
      apply: (thisArg: undefined, args: [KopiValue]) => Promise<KopiValue>
    };

    return functionValue.apply(undefined, [await this.argumentExpression.evaluate(environment, envbind)]);
  }
}

export default ApplyExpression;
