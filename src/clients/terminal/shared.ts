interface RawASTNode {
  [key: string]: any;
}

class KopiValue {
  _inspect(): string {
    return "";
  }

  [key: string]: unknown
}

type EnvBind = (bindings: Record<string, KopiValue>) => void;

class ASTNode extends KopiValue {
  async evaluate(environment: Record<string, KopiValue>, envbind: EnvBind): Promise<KopiValue> {
    return new KopiValue();
  }
}

export {
  type RawASTNode,
  type EnvBind,
  KopiValue,
  ASTNode
};
