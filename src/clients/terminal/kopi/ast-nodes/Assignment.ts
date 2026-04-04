import { ASTNode, ASTPatternNode, KopiValue, type UpdateBindings, type Environment } from "../shared.ts";
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

  override async toString(): Promise<string> {
    return "Assignment";
  }

  override async evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue> {
    const expressionValue = await this.expression.evaluate(environment, updateBindings);
    const patternMatches = this.pattern.match2(expressionValue, environment, updateBindings);

    if (patternMatches) {
      updateBindings(patternMatches);
    }

    return KopiTuple.empty;
  }
}

export default Assignment;
