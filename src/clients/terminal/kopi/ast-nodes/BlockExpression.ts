import { KopiTuple } from "../kopi-types/index.ts";
import { ASTNode, KopiValue, type EnvBind, type Environment } from "../shared.ts";

class BlockExpression extends ASTNode {
  readonly statements: ASTNode[];

  constructor({ statements }: {
    statements: ASTNode[]
  }) {
    super();

    this.statements = statements;
  }

  override async toString(): Promise<string> {
    return "BlockExpression";
  }

  override async evaluate(environment: Environment, envbind: EnvBind): Promise<KopiValue> {
    return this.statements.reduce<KopiValue>(async (result, statement) => (
      await result, await statement.evaluate(environment, envbind)
    ), KopiTuple.empty);
  }
}

export default BlockExpression;
