import { ASTNode, KopiValue } from "../shared.ts";

class Identifier extends ASTNode {
  readonly name: string;

  constructor({ name }: {
    name: string
  }) {
    super();

    this.name = name;
  }

  async evaluate(environment: Record<string, KopiValue>): Promise<KopiValue> {
    const value = environment[this.name];

    if (!value) {
      throw Error(`Variable ${this.name} not found in current scope`);
    }

    return value;
  }
}

export default Identifier;
