"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandboxJavascript = void 0;
const vm2_1 = require("vm2");
const const_1 = require("../const");
const SandboxTypescript_1 = require("../SandboxTypescript/SandboxTypescript");
const SandboxJavascript = async ({ userCode, language, }) => {
    let capturedLogs = [];
    let resultsArray = [];
    const vm = new vm2_1.NodeVM({
        timeout: 2000,
        console: 'redirect',
        sandbox: {
            resultCollector: (data) => {
                resultsArray.push(JSON.stringify(data));
            },
        },
        require: {
            external: true,
            builtin: [],
            root: './',
            mock: {},
        },
        compiler: language === const_1.Languages_Sandbox_enum.TYPESCRIPT
            ? (code) => {
                return (0, SandboxTypescript_1.compileTypeScript)(code);
            }
            : undefined,
    });
    vm.on('console.log', (data) => {
        capturedLogs.push(JSON.stringify(data));
    });
    let errorDetails = null;
    process.on('uncaughtException', (error) => {
        console.error('There was an uncaught error:', error);
        errorDetails = error;
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
    let result;
    try {
        result = await vm.run(userCode, 'vm.js');
    }
    catch (error) {
        console.error('Failed to execute user code:_____________________________________', error);
        result = null;
        const firstTwoLinesOfStack = error?.stack?.split('\n').slice(0, 2);
        errorDetails = JSON.stringify({
            errorMessage: error?.message,
            errorStack: firstTwoLinesOfStack,
        }, null, 2);
        result = null;
    }
    return {
        code: JSON.stringify(userCode),
        result: JSON.stringify(resultsArray),
        errorRunningCode: errorDetails,
        consoleLogs: capturedLogs,
    };
};
exports.SandboxJavascript = SandboxJavascript;
