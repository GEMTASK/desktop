import { KopiValue } from '../shared.ts';
declare class KopiString extends KopiValue {
    static symbol: symbol;
    static methods: {
        [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue;
    };
    readonly value: string;
    constructor(value: string);
    inspect(): Promise<string>;
}
export default KopiString;
