declare abstract class Type {
    static symbol: symbol;
}
declare abstract class KopiValue {
    abstract inspect(): Promise<string | React.ReactElement>;
    static type: typeof Type;
}
type Environment = Record<string | symbol, KopiValue>;
type UpdateBindings = (bindings: Environment) => void;
interface RawASTNode {
    [key: string]: any;
}
declare abstract class ASTNode extends KopiValue {
    abstract evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue>;
}
declare abstract class ASTPatternNode extends ASTNode {
    abstract match(value: KopiValue, environment: Environment, updateBindings: UpdateBindings): Promise<Environment | undefined>;
    abstract match2(value: KopiValue, environment: Environment, updateBindings: UpdateBindings): Environment;
}
export { type RawASTNode, type Environment, type UpdateBindings, KopiValue, ASTNode, ASTPatternNode, };
