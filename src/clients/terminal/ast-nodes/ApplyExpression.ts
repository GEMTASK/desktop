import { ASTNode, KopiValue, type EnvBind } from "../shared.ts";

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
    const functionValue = await this.expression.evaluate(environment, envbind) as unknown as {
      apply: (thisArg: undefined, args: [KopiValue]) => Promise<KopiValue>
    };

    return functionValue.apply(undefined, [await this.argumentExpression.evaluate(environment, envbind)]);
  }
}

export default ApplyExpression;
