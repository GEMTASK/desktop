import { assert } from "../utils.ts";

import { KopiNumber } from "../kopi-types/index.ts";
import type { KopiValue } from "../shared.ts";

class Equatable {
  static methods = {
    "!="(thisArg: KopiValue, thatArg: KopiValue) {
      assert(thisArg instanceof KopiNumber && thatArg instanceof KopiNumber);

      return thisArg.value === thatArg.value;
    }
  };
}

export default Equatable;
