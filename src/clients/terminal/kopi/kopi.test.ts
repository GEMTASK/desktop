import { expect, test } from "vitest";
import { interpret } from "./compiler";
import { KopiNumber } from "./kopi-types";

test("demo", async () => {
  const result = await interpret("5", {});

  expect(result).toStrictEqual(new KopiNumber(5));
});
