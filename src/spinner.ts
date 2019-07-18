import { Spinner } from 'cli-spinner';

export default (message: string): Spinner => {
  const spinner = new Spinner(message);
  spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷');
  return spinner;
}
