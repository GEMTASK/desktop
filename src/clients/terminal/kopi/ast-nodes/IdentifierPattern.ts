import KopiTuple from "../kopi-types/KopiTuple.ts";
import { ASTPatternNode, KopiValue, type UpdateBindings, type Environment } from "../shared.ts";

class IdentifierPattern extends ASTPatternNode {
  readonly name: string;

  constructor({ name }: { name: string }) {
    super();

    this.name = name;
  }

  override async toString(): Promise<string> {
    return "IdentifierPattern";
  }

  override async evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue> {
    return KopiTuple.empty;
  }

  override async match(value: KopiValue, environment: Environment, updateBindings: UpdateBindings) {
    return {
      [this.name]: value
    };
  }

  override match2(value: KopiValue, environment: Environment, updateBindings: UpdateBindings) {
    return {
      [this.name]: value
    };
  }
}

export default IdentifierPattern;
