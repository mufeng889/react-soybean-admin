export function warn(msg: string): void {
  // avoid using ...args as it breaks in older Edge builds

  console.warn(`[elegant Router warn]: ${msg}`);
}
