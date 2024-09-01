type KeysOfType<T> = keyof T;

export function getKey<T>(key: KeysOfType<T>): string {
  return key as string;
}
