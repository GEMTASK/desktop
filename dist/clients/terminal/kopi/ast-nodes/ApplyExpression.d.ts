import { ASTNode, KopiValue, UpdateBindings, Environment } from '../shared.ts';
declare class ApplyExpression extends ASTNode {
    expression: ASTNode;
    argumentExpression: ASTNode;
    constructor({ expression, argumentExpression }: {
        expression: ASTNode;
        argumentExpression: ASTNode;
    });
    inspect(): Promise<string>;
    evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue>;
}
export default ApplyExpression;
