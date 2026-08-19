import { ASTNode, ASTPatternNode, KopiValue, UpdateBindings, Environment } from '../shared.ts';
declare class Assignment extends ASTNode {
    readonly pattern: ASTPatternNode;
    readonly expression: ASTNode;
    constructor({ pattern, expression }: {
        pattern: ASTPatternNode;
        expression: ASTNode;
    });
    inspect(): Promise<string>;
    evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue>;
}
export default Assignment;
