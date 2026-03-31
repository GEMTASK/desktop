import { ASTNode, KopiValue, type EnvBind, type Environment } from "../shared.ts";
import { KopiTuple } from "../kopi-types/index.ts";

class TupleExpression extends ASTNode {
  expressions: ASTNode[];

  constructor({ expressions }: {
    expressions: ASTNode[]
  }) {
    super();

    this.expressions = expressions;
  }

  override async toString(): Promise<string> {
    return "TupleExpression";
  }

  override async evaluate(environment: Environment, envbind: EnvBind): Promise<KopiValue> {
    return new KopiTuple(
      this.expressions.map(expression => expression.evaluate(environment, envbind))
    );
  }
}

export default TupleExpression;
