import { ASTNode, KopiValue, UpdateBindings, Environment } from '../shared.ts';
declare class OperatorExpression extends ASTNode {
    readonly operator: "+" | "-";
    readonly leftExpression: ASTNode;
    readonly rightExpression: ASTNode;
    constructor({ operator, leftExpression, rightExpression }: {
        operator: "+" | "-";
        leftExpression: ASTNode;
        rightExpression: ASTNode;
    });
    inspect(): Promise<string>;
    evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue>;
}
export default OperatorExpression;
