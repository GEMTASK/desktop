import { ASTNode, KopiValue, type UpdateBindings, type Environment } from "../shared.ts";

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

  override async inspect(): Promise<string> {
    return "ApplyExpression";
  }

  override async evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue> {
    const functionValue = await this.expression.evaluate(environment, updateBindings) as unknown as {
      apply: (thisArg: undefined, args: [KopiValue]) => Promise<KopiValue>
    };

    return functionValue.apply(undefined, [await this.argumentExpression.evaluate(environment, updateBindings)]);
  }
}

export default ApplyExpression;
