type Assert = (condition: unknown, message?: string) => asserts condition;

const assert: Assert = (condition: unknown, message?: string): asserts condition => {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
};

export {
  assert
};
