import { KopiValue, type Environment } from "../shared";

class KopiNumberConstructor extends KopiValue {
  static symbol = Symbol("KopiNumber");

  apply(thisArg: undefined, [thatArg, environment]: [KopiValue, Environment]) {
    const thatConstructorSymbol = (thatArg.constructor as typeof KopiValue).type.symbol;

    console.log(thatConstructorSymbol);

    return environment[thatConstructorSymbol][KopiNumberConstructor.symbol](thatArg);
  }

  override async inspect(): Promise<string> {
    return "Number";
  }
}

export default KopiNumberConstructor;
