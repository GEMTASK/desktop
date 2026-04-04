abstract class KopiValue {
  abstract toString(): string | Promise<string>;

  static symbol: symbol;
}

//

type Environment = Record<string | symbol, KopiValue>;
type UpdateBindings = (bindings: Environment) => void;

interface RawASTNode {
  [key: string]: any;
}

abstract class ASTNode extends KopiValue {
  abstract evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue>;
}

abstract class ASTPatternNode extends ASTNode {
  abstract match(
    value: KopiValue, environment: Environment, updateBindings: UpdateBindings
  ): Promise<Environment | undefined>;

  abstract match2(
    value: KopiValue, environment: Environment, updateBindings: UpdateBindings
  ): Environment;
}

export {
  type RawASTNode,
  type Environment,
  type UpdateBindings,
  KopiValue,
  ASTNode,
  ASTPatternNode
};
