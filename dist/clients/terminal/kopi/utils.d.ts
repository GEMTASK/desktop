type Assert = (condition: unknown, message?: string) => asserts condition;
declare const assert: Assert;
export { assert };
