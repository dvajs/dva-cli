import api from 'dva-ast/lib/api';
import upperCamelCase from 'uppercamelcase';
import { info, error, success } from './log';

const defaultEntry = './src/index.js';
const defaultRouter = './src/router.js';

function generate(program, { cwd }) {
  const [type, name] = program.args;
  info('create', `${type} ${name}`);

  try {
    switch (type) {
      case 'model':
        const modelPath = `./models/${name}`;
        const filePath = `./src/models/${name}.js`;
        api('models.create', {
          namespace: name,
          sourcePath: cwd,
          filePath,
          entry: program.entry || defaultEntry,
          modelPath,
        });
        break;
      case 'route':
        const componentName = upperCamelCase(name);
        const componentPath = `./src/routes/${componentName}.js`;
        api('routeComponents.create', {
          sourcePath: cwd,
          filePath: componentPath,
          componentName,
        });
        api('router.createRoute', {
          filePath: program.router || defaultRouter,
          sourcePath: cwd,
          path: `/${name}`,
          component: {
            componentName,
            filePath: componentPath,
          },
        });
        break;
      default:
        error(`ERROR: uncaught type ${type}`);
        break;
    }
  } catch (e) {
    error(e.stack);
  }
}

export default generate;
