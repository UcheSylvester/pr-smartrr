import { exec } from 'child_process';

export const getChangedFiles = async (base: string, head: string) => {
  const command = `git diff --name-only ${base} ${head}`;
  console.log({ command, base, head });
  return new Promise<string>((resolve, reject) => {
    exec(command.trim(), (error, stdout) => {
      if (error) {
        reject(error.message);
      }
      resolve(stdout);
    });
  });
};
