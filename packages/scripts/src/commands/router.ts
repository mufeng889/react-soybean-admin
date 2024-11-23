import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { prompt } from 'enquirer';
import { green, red } from 'kolorist';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface PromptObject {
  addRouteConfig: boolean;
  addRouteParams: boolean;
  routeName: string;
  routeParams: string;
}

const argv = yargs(hideBin(process.argv))
  .option('routeConfigFile', {
    alias: 'r',
    // 该参数为可选
    default: 'config',
    demandOption: false,
    description: '配置文件夹名称',
    type: 'string' // 默认值
  })
  .help()
  .parseSync();

/** generate route */
export async function generateRoute() {
  const result = await prompt<PromptObject>([
    {
      initial: 'demo-route_child',
      message: 'please enter route name',
      name: 'routeName',
      type: 'text'
    },
    {
      initial: false,
      message: 'add route params?',
      name: 'addRouteParams',
      type: 'confirm'
    },
    {
      initial: false,
      message: 'add route config?',
      name: 'addRouteConfig',
      type: 'confirm'
    }
  ]);

  if (result.addRouteParams) {
    const answers = await prompt<PromptObject>({
      initial: 'id',
      message: 'please enter route params',
      name: 'routeParams',
      type: 'text'
    });

    Object.assign(result, answers);
  }

  const PAGE_DIR_NAME_PATTERN = /^[\w-]+[0-9a-zA-Z]+$/;

  if (!PAGE_DIR_NAME_PATTERN.test(result.routeName)) {
    throw new Error(`${red('route name is invalid, it only allow letters, numbers, "-" or "_"')}.
For example:
(1) one level route: ${green('demo-route')}
(2) two level route: ${green('demo-route_child')}
(3) multi level route: ${green('demo-route_child_child')}
(4) group route: ${green('_ignore_demo-route')}'
`);
  }

  const PARAM_REG = /^\w+$/g;

  if (result.routeParams && !PARAM_REG.test(result.routeParams)) {
    throw new Error(red('route params is invalid, it only allow letters, numbers or "_".'));
  }

  const cwd = process.cwd();

  const [dir, ...rest] = result.routeName.split('_') as string[];

  let routeDir = path.join(cwd, 'src', 'pages', dir);

  if (rest.length) {
    routeDir = path.join(routeDir, rest.join('_'));
  }

  if (!existsSync(routeDir)) {
    mkdirSync(routeDir, { recursive: true });
  } else {
    throw new Error(red('route already exists'));
  }

  const fileName = result.routeParams ? `[${result.routeParams}].tsx` : 'index.tsx';

  const reactTemplate = `export function Component() {
  return <div>${result.routeName}</div>
}

`;

  const filePath = path.join(routeDir, fileName);

  await writeFile(filePath, reactTemplate);

  if (result.addRouteConfig) {
    let configFolderName = argv.routeConfigFile || 'config';
    configFolderName += '.ts';
    const routeConfigFilePath = path.join(routeDir, configFolderName);
    const routeConfigTemplate = `export const meta = {
  title: 'test'
};`;
    await writeFile(routeConfigFilePath, routeConfigTemplate);
  }
}
