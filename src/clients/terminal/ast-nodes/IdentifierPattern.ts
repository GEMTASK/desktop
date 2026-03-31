import { ASTPatternNode, KopiValue, type EnvBind } from "../shared.ts";

class IdentifierPattern extends ASTPatternNode {
  readonly name: string;

  constructor({ name }: { name: string }) {
    super();

    this.name = name;
  }

  override async match(value: KopiValue, environment: Record<string, KopiValue>, envbind: EnvBind) {
    return {
      [this.name]: value
    };
  }
}

export default IdentifierPattern;
