import { KopiValue, Environment } from '../shared';
declare class KopiNumberConstructor extends KopiValue {
    static symbol: symbol;
    apply(thisArg: undefined, [thatArg, environment]: [KopiValue, Environment]): any;
    inspect(): Promise<string>;
}
export default KopiNumberConstructor;
