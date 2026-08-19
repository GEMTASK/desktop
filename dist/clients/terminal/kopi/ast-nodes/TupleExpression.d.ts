import { ASTNode, KopiValue, UpdateBindings, Environment } from '../shared.ts';
declare class TupleExpression extends ASTNode {
    expressions: ASTNode[];
    constructor({ expressions }: {
        expressions: ASTNode[];
    });
    inspect(): Promise<string>;
    evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue>;
}
export default TupleExpression;
