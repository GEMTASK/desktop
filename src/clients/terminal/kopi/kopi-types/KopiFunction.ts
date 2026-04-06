import { KopiValue } from "../shared";

class KopiFunction extends KopiValue {
  _function: (arg: KopiValue) => Promise<KopiValue>;

  constructor(_function: (arg: KopiValue) => Promise<KopiValue>) {
    super();

    this._function = _function;
  };

  async apply(thisArg: undefined, args: [KopiValue]) {
    return this._function.apply(undefined, args);
  }

  async inspect(): Promise<string> {
    return "Function";
  }
}

export default KopiFunction;
