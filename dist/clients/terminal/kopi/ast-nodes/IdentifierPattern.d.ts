import { ASTPatternNode, KopiValue, UpdateBindings, Environment } from '../shared.ts';
declare class IdentifierPattern extends ASTPatternNode {
    readonly name: string;
    constructor({ name }: {
        name: string;
    });
    inspect(): Promise<string>;
    evaluate(environment: Environment, updateBindings: UpdateBindings): Promise<KopiValue>;
    match(value: KopiValue, environment: Environment, updateBindings: UpdateBindings): Promise<{
        [x: string]: KopiValue;
    }>;
    match2(value: KopiValue, environment: Environment, updateBindings: UpdateBindings): {
        [x: string]: KopiValue;
    };
}
export default IdentifierPattern;
