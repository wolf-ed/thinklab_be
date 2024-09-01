import { Languages_Sandbox_enum } from '../const';
import { SandboxJavascript } from '../SandboxJavascript/SandboxJavascript';
import { Sandbox_Interface } from '../type';
import * as ts from 'typescript';

export function compileTypeScript(
  code: string,
  options?: ts.CompilerOptions
): string {
  const defaultOptions: ts.CompilerOptions = {
    module: ts.ModuleKind.CommonJS,
    strict: true,
    esModuleInterop: true,
    target: ts.ScriptTarget.ES2018,
  };

  const finalOptions = options || defaultOptions;

  const output = ts.transpileModule(code, { compilerOptions: finalOptions });
  return output.outputText;
}

export const SandboxTypescript: Sandbox_Interface = async ({
  userCode,
  language,
}) => {
  return await SandboxJavascript({
    userCode,
    language: Languages_Sandbox_enum.TYPESCRIPT,
  });
};
