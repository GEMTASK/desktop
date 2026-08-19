import { KopiValue, Environment } from './shared.ts';
declare let environment: any;
declare const parse: (source: string) => import('./shared.ts').ASTNode;
declare const interpret: (line: string, _environment?: Environment) => Promise<KopiValue>;
export { environment, parse, interpret, };
