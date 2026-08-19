import { ASTNode, KopiValue } from '../shared.ts';
import { KopiString } from '../kopi-types/index.ts';
declare class StringLiteral extends ASTNode {
    readonly value: KopiString;
    constructor({ value }: {
        value: string;
    });
    inspect(): Promise<string>;
    evaluate(): Promise<KopiValue>;
}
export default StringLiteral;
