interface RawASTNode {
  [key: string]: any;
}

class KopiValue {
  _inspect(): string {
    return "";
  }

  [key: string]: unknown

  // methods: {
  //   [key: string]: (that: KopiValue) => KopiValue
  // } = {};
}

type BindValues = (bindings: Record<string, KopiValue>) => void;

class ASTNode extends KopiValue {
  async evaluate(environment: Record<string, KopiValue>, bindValues: BindValues): Promise<KopiValue> {
    return new KopiValue();
  }
}

export {
  type RawASTNode,
  type BindValues,
  KopiValue,
  ASTNode
};
