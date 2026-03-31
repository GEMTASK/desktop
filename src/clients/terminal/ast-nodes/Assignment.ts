import { ASTNode, ASTPatternNode, KopiValue, type EnvBind, type Environment } from "../shared.ts";
import { KopiTuple } from "../kopi-types/index.ts";

class Assignment extends ASTNode {
  readonly pattern: ASTPatternNode;
  readonly expression: ASTNode;

  constructor({ pattern, expression }: {
    pattern: ASTPatternNode, expression: ASTNode
  }) {
    super();

    this.pattern = pattern;
    this.expression = expression;
  }

  override async inspect(): Promise<string> {
    return "Assignment";
  }

  override async evaluate(environment: Environment, envbind: EnvBind): Promise<KopiValue> {
    const expressionValue = await this.expression.evaluate(environment, envbind);
    const patternMatches = await this.pattern.match(expressionValue, environment, envbind);

    if (patternMatches) {
      envbind(patternMatches);
    }

    return KopiTuple.empty;
  }
}

export default Assignment;
