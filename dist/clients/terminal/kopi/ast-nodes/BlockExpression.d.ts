import { ASTNode, KopiValue, Environment } from '../shared.ts';
declare class BlockExpression extends ASTNode {
    readonly statements: ASTNode[];
    constructor({ statements }: {
        statements: ASTNode[];
    });
    inspect(): Promise<string>;
    evaluate(environment: Environment): Promise<KopiValue>;
}
export default BlockExpression;
