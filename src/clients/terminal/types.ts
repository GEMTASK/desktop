class KopiValue {
  inspect(): string {
    return "";
  }

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
  type BindValues,
  KopiValue,
  ASTNode
};
