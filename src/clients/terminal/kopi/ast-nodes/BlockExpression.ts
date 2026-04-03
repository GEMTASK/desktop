import { KopiTuple } from "../kopi-types/index.ts";
import { ASTNode, KopiValue, type UpdateBindings, type Environment } from "../shared.ts";

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

  // async? assignment race conditions?
  override async evaluate(environment: Environment): Promise<KopiValue> {
    const updateBindings = (bindings: Environment) => {
      environment = { ...environment, ...bindings };
    };

    return await this.statements.reduce<KopiValue>(async (result, statement) => (
      await result, await statement.evaluate(environment, updateBindings)
    ), KopiTuple.empty);
  }
}

export default BlockExpression;
