import { NodeVM } from 'vm2';
import { Sandbox_Interface } from '../type';
import { Languages_Sandbox_enum } from '../const';
import { compileTypeScript } from '../SandboxTypescript/SandboxTypescript';

export const SandboxJavascript: Sandbox_Interface = async ({
  userCode,
  language,
}) => {
  let capturedLogs: string[] = [];
  let resultsArray: any = [];
  const vm = new NodeVM({
    timeout: 2000,
    console: 'redirect',
    sandbox: {
      resultCollector: (data: any) => {
        resultsArray.push(JSON.stringify(data));
      },
    },

    require: {
      external: true,
      builtin: [],
      root: './',
      mock: {},
    },
    compiler:
      language === Languages_Sandbox_enum.TYPESCRIPT
        ? (code) => {
            return compileTypeScript(code);
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
  let result: any;
  try {
    result = await vm.run(userCode, 'vm.js');
  } catch (error: any) {
    console.error(
      'Failed to execute user code:_____________________________________',
      error
    );
    result = null;
    const firstTwoLinesOfStack = error?.stack?.split('\n').slice(0, 2);

    errorDetails = JSON.stringify(
      {
        errorMessage: error?.message,
        errorStack: firstTwoLinesOfStack,
      },
      null,
      2
    );
    result = null;
  }
  return {
    code: JSON.stringify(userCode),
    result: JSON.stringify(resultsArray),
    errorRunningCode: errorDetails,
    consoleLogs: capturedLogs,
  };
};
