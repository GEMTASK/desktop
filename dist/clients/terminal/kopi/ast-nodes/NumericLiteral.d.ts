import { ASTNode, KopiValue } from '../shared.ts';
import { KopiNumber } from '../kopi-types/index.ts';
declare class NumericLiteral extends ASTNode {
    readonly value: KopiNumber;
    constructor({ value }: {
        value: number;
    });
    inspect(): Promise<string>;
    evaluate(): Promise<KopiValue>;
}
export default NumericLiteral;
