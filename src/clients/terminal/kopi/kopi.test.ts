import { describe, expect, test } from "vitest";

import { interpret } from "./compiler";
import { KopiNumber, KopiTuple } from "./kopi-types";

test("Types", async () => {
  const result = await interpret(`
    (123, 456)
  `);

  expect(result).toStrictEqual(
    new KopiTuple([
      Promise.resolve(new KopiNumber(123)),
      Promise.resolve(new KopiNumber(456))
    ])
  );
});

test("Math", async () => {
  const result = await interpret(`
    2.5 + 2.5
  `);

  expect(result).toStrictEqual(
    new KopiNumber(5)
  );
});

test("Async operations", async () => {
  const tuple = await interpret(`
    (sleep (sleep 1) + sleep 1, sleep 1 + sleep 1)
  `) as KopiTuple;

  expect(await Promise.all(tuple.elements)).toStrictEqual([
    new KopiNumber(2),
    new KopiNumber(2)
  ]);
});
