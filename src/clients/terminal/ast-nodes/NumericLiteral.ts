import { ASTNode, KopiValue } from "../shared.ts";
import { KopiNumber } from "../kopi-types/index.ts";

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
