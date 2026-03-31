import KopiTuple from "../kopi-types/KopiTuple.ts";
import { ASTPatternNode, KopiValue, type EnvBind, type Environment } from "../shared.ts";

class IdentifierPattern extends ASTPatternNode {
  readonly name: string;

  constructor({ name }: { name: string }) {
    super();

    this.name = name;
  }

  override async inspect(): Promise<string> {
    return "IdentifierPattern";
  }

  override async evaluate(environment: Environment, envbind: EnvBind): Promise<KopiValue> {
    return KopiTuple.empty;
  }

  override async match(value: KopiValue, environment: Environment, envbind: EnvBind) {
    return {
      [this.name]: value
    };
  }
}

export default IdentifierPattern;
