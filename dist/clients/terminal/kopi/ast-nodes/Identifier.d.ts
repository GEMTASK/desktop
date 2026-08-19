import { ASTNode, KopiValue, Environment } from '../shared.ts';
declare class Identifier extends ASTNode {
    readonly name: string;
    constructor({ name }: {
        name: string;
    });
    inspect(): Promise<string>;
    evaluate(environment: Environment): Promise<KopiValue>;
}
export default Identifier;
