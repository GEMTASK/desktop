abstract class KopiValue {
  abstract toString(): string | Promise<string>;

  static symbol: symbol;
  static methods: {
    [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue
  };
}

//

type Environment = Record<string | symbol, KopiValue>;
type EnvBind = (bindings: Environment) => void;

interface RawASTNode {
  [key: string]: any;
}

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
