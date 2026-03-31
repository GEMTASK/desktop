import { ASTNode, KopiValue } from "../shared.ts";
import { KopiNumber } from "../kopiTypes.ts";

class NumericLiteral extends ASTNode {
  readonly value: KopiNumber;

  constructor({ value }: {
    value: number
  }) {
    super();

    this.value = new KopiNumber(value);
  }

  override async evaluate(): Promise<KopiValue> {
    return this.value;
  }
}

export default NumericLiteral;
