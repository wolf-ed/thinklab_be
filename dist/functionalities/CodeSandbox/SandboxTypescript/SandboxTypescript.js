"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandboxTypescript = void 0;
exports.compileTypeScript = compileTypeScript;
const const_1 = require("../const");
const SandboxJavascript_1 = require("../SandboxJavascript/SandboxJavascript");
const ts = __importStar(require("typescript"));
function compileTypeScript(code, options) {
    const defaultOptions = {
        module: ts.ModuleKind.CommonJS,
        strict: true,
        esModuleInterop: true,
        target: ts.ScriptTarget.ES2018,
    };
    const finalOptions = options || defaultOptions;
    const output = ts.transpileModule(code, { compilerOptions: finalOptions });
    return output.outputText;
}
const SandboxTypescript = async ({ userCode, language, }) => {
    return await (0, SandboxJavascript_1.SandboxJavascript)({
        userCode,
        language: const_1.Languages_Sandbox_enum.TYPESCRIPT,
    });
};
exports.SandboxTypescript = SandboxTypescript;
