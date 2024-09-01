"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectSandboxAndExecuteCode = void 0;
const const_1 = require("./const");
const SandboxJavascript_1 = require("./SandboxJavascript/SandboxJavascript");
const SelectSandboxAndExecuteCode = async (code, language) => {
    switch (language) {
        case const_1.Languages_Sandbox_enum.JAVASCRIPT:
        case const_1.Languages_Sandbox_enum.TYPESCRIPT:
            return await (0, SandboxJavascript_1.SandboxJavascript)({
                userCode: code,
                language,
            });
        default:
            throw new Error('Unsupported language specified');
    }
};
exports.SelectSandboxAndExecuteCode = SelectSandboxAndExecuteCode;
