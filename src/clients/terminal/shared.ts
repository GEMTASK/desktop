interface RawASTNode {
  [key: string]: any;
}

class KopiValue {
  async inspect(): Promise<string> {
    return "";
  }

  static methods: {
    [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue
  };
}

type EnvBind = (bindings: Record<string, KopiValue>) => void;

class ASTNode extends KopiValue {
  async evaluate(environment: Record<string, KopiValue>, envbind: EnvBind): Promise<KopiValue> {
    return new KopiValue();
  }
}

abstract class ASTPatternNode extends ASTNode {
  abstract match(
    value: KopiValue, environment: Record<string, KopiValue>, envbind: EnvBind
  ): Promise<Record<string, KopiValue> | undefined>;
}

export {
  type RawASTNode,
  type EnvBind,
  KopiValue,
  ASTNode,
  ASTPatternNode
};
