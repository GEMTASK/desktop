interface RawASTNode {
  [key: string]: any;
}

abstract class KopiValue {
  abstract inspect(): Promise<string>;

  static methods: {
    [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue
  };
}

type Environment = Record<string, KopiValue>;
type EnvBind = (bindings: Environment) => void;

abstract class ASTNode extends KopiValue {
  abstract evaluate(environment: Environment, envbind: EnvBind): Promise<KopiValue>;
}

abstract class ASTPatternNode extends ASTNode {
  abstract match(
    value: KopiValue, environment: Environment, envbind: EnvBind
  ): Promise<Environment | undefined>;
}

export {
  type RawASTNode,
  type Environment,
  type EnvBind,
  KopiValue,
  ASTNode,
  ASTPatternNode
};
