import { ASTNode, KopiValue, type UpdateBindings, type Environment } from "../shared.ts";
import { KopiTuple } from "../kopi-types/index.ts";

class TupleExpression extends ASTNode {
  expressions: ASTNode[];

  constructor({ expressions }: {
    expressions: ASTNode[]
  }) {
    super();

    this.expressions = expressions;
  }

  override async inspect(): Promise<string> {
    return "TupleExpression";
  }

  override async evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue> {
    return new KopiTuple(
      this.expressions.map(expression => expression.evaluate(environment, updateBindings)),
    );
  }
}

export default TupleExpression;
