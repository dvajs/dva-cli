import { api } from 'dva-ast';
import upperCamelCase from 'simple-uppercamelcase';
import { info, error } from './log';
import { basename, dirname, join } from 'path';

const defaultEntry = 'src/index.js';
const defaultRouter = 'src/router.js';

function generate(program, { cwd }) {
  const [type, name] = program.args;

  try {
    switch (type) {
      case 'model':
        (() => {
          const modelPath = `./models/${name}`;
          const filePath = `src/models/${name}.js`;
          const entry = program.entry || defaultEntry;
          info('create', `model ${name}`);
          info('register', `to entry ${entry}`);
          api('models.create', {
            namespace: name,
            sourcePath: cwd,
            filePath,
            entry,
            modelPath,
          });
        })();
        break;
      case 'route':
        (() => {
          const componentName = upperCamelCase(name);
          const componentPath = `src/routes/${componentName}.js`;
          const componentCSSPath = `src/routes/${componentName}.css`;
          const withCSS = program.css ? `, ${componentCSSPath}` : '';
          info('create', `routeComponent ${componentPath}${withCSS}`);
          api('routeComponents.create', {
            sourcePath: cwd,
            filePath: componentPath,
            componentName,
            css: program.css,
          });
          info('create', `route ${name} with ${componentPath}`);
          api('router.createRoute', {
            filePath: program.router || defaultRouter,
            sourcePath: cwd,
            path: `/${name}`,
            component: {
              componentName,
              filePath: componentPath,
            },
          });
        })();
        break;
      case 'component':
        (() => {
          const fileName = basename(name);
          const fileDir = dirname(name);
          const componentName = upperCamelCase(fileName);
          const filePath = join('src/components', fileDir, `${componentName}.js`);
          const componentCSSPath = join('src/components', fileDir, `${componentName}.css`);
          const withCSS = program.css ? `, ${componentCSSPath}` : '';
          info('create', `component ${filePath}${withCSS}`);
          api('components.create', {
            sourcePath: cwd,
            filePath,
            componentName,
            css: program.css,
          });
        })();
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
