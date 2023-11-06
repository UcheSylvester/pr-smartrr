import { exec } from 'child_process';

export const getChangedFiles = async (base: string, head: string) => {
  const command = `git diff --name-only ${base.trim()} ${head.trim()}`;
  console.log({ command, base, head });
  return new Promise<string>((resolve, reject) => {
    exec(command.trim(), { shell: '/bin/sh' }, (error, stdout) => {
      if (error) {
        reject(error.message);
      }
      resolve(stdout as unknown as string);
    });
  });
};
