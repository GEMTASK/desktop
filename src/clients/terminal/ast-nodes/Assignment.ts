import { ASTNode, ASTPatternNode, KopiValue, type EnvBind } from "../shared.ts";
import { KopiTuple } from "../kopiTypes.ts";

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

  override async evaluate(environment: Record<string, KopiValue>, envbind: EnvBind): Promise<KopiValue> {
    const expressionValue = await this.expression.evaluate(environment, envbind);
    const patternMatches = await this.pattern.match(expressionValue, environment, envbind);

    if (patternMatches) {
      envbind(patternMatches);
    }

    return KopiTuple.empty;
  }
}

export default Assignment;
