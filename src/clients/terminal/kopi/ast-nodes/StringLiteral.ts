import { ASTNode, KopiValue } from "../shared.ts";
import { KopiString } from "../kopi-types/index.ts";

class StringLiteral extends ASTNode {
  readonly value: KopiString;

  constructor({ value }: {
    value: string,
  }) {
    super();

    this.value = new KopiString(value);
  }

  override async inspect(): Promise<string> {
    return "StringLiteral";
  }

  override async evaluate(): Promise<KopiValue> {
    return this.value;
  }
}

export default StringLiteral;
