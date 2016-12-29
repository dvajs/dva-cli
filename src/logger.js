import leftPad from 'left-pad';
import chalk from 'chalk';

export function info(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

export function error(message) {
  console.error(chalk.red(message));
}

export function success(message) {
  console.error(chalk.green(message));
}
