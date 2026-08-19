import { KopiValue } from '../shared.ts';
declare class KopiTuple extends KopiValue {
    static readonly empty: KopiTuple;
    readonly elements: Promise<KopiValue>[];
    constructor(elements: Promise<KopiValue>[], isEmptySingleton?: boolean);
    inspect(): Promise<string>;
}
export default KopiTuple;
