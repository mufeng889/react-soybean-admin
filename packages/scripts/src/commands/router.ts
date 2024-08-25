import process from 'node:process';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { prompt } from 'enquirer';
import { green, red } from 'kolorist';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface PromptObject {
  routeName: string;
  addRouteParams: boolean;
  routeParams: string;
  addRouteConfig: boolean;
}

const argv = yargs(hideBin(process.argv))
  .option('routeConfigFile', {
    alias: 'r',
    type: 'string',
    description: '配置文件夹名称',
    demandOption: false, // 该参数为可选
    default: 'config' // 默认值
  })
  .help()
  .parseSync();

/** generate route */
export async function generateRoute() {
  const result = await prompt<PromptObject>([
    {
      name: 'routeName',
      type: 'text',
      message: 'please enter route name',
      initial: 'demo-route_child'
    },
    {
      name: 'addRouteParams',
      type: 'confirm',
      message: 'add route params?',
      initial: false
    },
    {
      name: 'addRouteConfig',
      type: 'confirm',
      message: 'add route config?',
      initial: false
    }
  ]);

  if (result.addRouteParams) {
    const answers = await prompt<PromptObject>({
      name: 'routeParams',
      type: 'text',
      message: 'please enter route params',
      initial: 'id'
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
