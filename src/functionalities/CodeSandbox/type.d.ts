export interface Sandbox_Props_Interface {
  userCode: string;
  language: Sandbox_Languages_enum;
}

export interface Sandbox_Return_Interface {
  code: string;
  result: string;
  errorRunningCode: errorDetails | null;
  consoleLogs: string[];
}

export type Sandbox_Return_Type = Promise<Sandbox_Return_Interface>;

export type Sandbox_Interface = (
  props: Sandbox_Props_Interface
) => Sandbox_Return_Type;
