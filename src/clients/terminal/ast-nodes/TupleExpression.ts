import { ASTNode, KopiValue, type EnvBind } from "../shared.ts";
import { KopiTuple } from "../kopi-types/index.ts";

class TupleExpression extends ASTNode {
  expressions: ASTNode[];

  constructor({ expressions }: {
    expressions: ASTNode[]
  }) {
    super();

    this.expressions = expressions;
  }

  async evaluate(environment: Record<string, KopiValue>, envbind: EnvBind): Promise<KopiValue> {
    return new KopiTuple(
      this.expressions.map(expression => expression.evaluate(environment, envbind))
    );
  }
}

export default TupleExpression;
