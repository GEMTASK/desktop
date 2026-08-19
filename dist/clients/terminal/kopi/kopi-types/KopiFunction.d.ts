import { KopiValue } from '../shared';
declare class KopiFunction extends KopiValue {
    _function: (arg: KopiValue) => Promise<KopiValue>;
    constructor(_function: (arg: KopiValue) => Promise<KopiValue>);
    apply(thisArg: undefined, args: [KopiValue]): Promise<KopiValue>;
    inspect(): Promise<string>;
}
export default KopiFunction;
