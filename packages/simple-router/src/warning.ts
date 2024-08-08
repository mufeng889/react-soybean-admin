export function warn(msg: string): void {
  // avoid using ...args as it breaks in older Edge builds
  // eslint-disable-next-line prefer-rest-params
  const args = Array.from(arguments).slice(1);
  // eslint-disable-next-line prefer-spread
  console.warn.apply(console, [`[elegant Router warn]: ${msg}`].concat(args) as [string, ...any[]]);
}
