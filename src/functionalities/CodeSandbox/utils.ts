import { Languages_Sandbox_enum } from './const';
import { SandboxJavascript } from './SandboxJavascript/SandboxJavascript';
import { Sandbox_Return_Type } from './type';

export const SelectSandboxAndExecuteCode = async (
  code: string,
  language: Languages_Sandbox_enum
): Sandbox_Return_Type => {
  switch (language) {
    case Languages_Sandbox_enum.JAVASCRIPT:
    case Languages_Sandbox_enum.TYPESCRIPT:
      return await SandboxJavascript({
        userCode: code,
        language,
      });
    default:
      throw new Error('Unsupported language specified');
  }
};
