import { KopiValue } from '../shared.ts';
import { default as KopiNumberConstructor } from './KopiNumberConstructor.ts';
declare class KopiNumber extends KopiValue {
    static type: typeof KopiNumberConstructor;
    static methods: {
        [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue;
    };
    readonly value: number;
    constructor(value: number);
    inspect(): Promise<string>;
}
export default KopiNumber;
