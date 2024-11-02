export interface PkgVersionInfo {
  label: string;
  nameOrHref: string;
  render?: (record: PkgVersionInfo) => JSX.Element;
}

export interface CardInfo {
  title: string;
  content: PkgVersionInfo[];
}

export interface PkgJson {
  name: string;
  version: string;
  dependencies: PkgVersionInfo[];
  devDependencies: PkgVersionInfo[];
}

export interface PackageInfo {
  label: string;
  titleOrHref: string;
  isLink: boolean;
}

export function transformVersionData(tuple: [string, string]): PkgVersionInfo {
  const [$name, $version] = tuple;
  return {
    label: $name,
    nameOrHref: $version
  };
}
