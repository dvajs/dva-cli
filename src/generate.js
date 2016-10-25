import api from 'dva-ast/lib/api';
import { info, error, success } from './log';

const defaultEntry = './src/index.js';

function create(type, payload) {
  try {
    api(type, payload);
  } catch (e) {
    error(e.stack);
  }
}

function generate(program, { cwd }) {
  const [type, name] = program.args;
  info('create', `${type} ${name}`);

  switch (type) {
    case 'model':
      const modelPath = `./models/${name}`;
      const filePath = `./src/models/${name}.js`;
      create('models.create', {
        namespace: name,
        sourcePath: cwd,
        filePath,
        entry: program.entry || defaultEntry,
        modelPath,
      });
      break;
    default:
      error(`ERROR: uncaught type ${type}`);
      break;
  }
}

export default generate;
