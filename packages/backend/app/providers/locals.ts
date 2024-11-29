export function env(key: string, defaultValue?: any) {
  return process.env[key] ?? defaultValue;
}
