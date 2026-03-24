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
  evaluate(environment: Record<string, KopiValue>, bindValues: BindValues): KopiValue {
    return new KopiValue();
  }
}

export {
  type RawASTNode,
  type BindValues,
  KopiValue,
  ASTNode
};
