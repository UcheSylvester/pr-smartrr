import { exec } from 'child_process';

export const getChangedFiles = async (base: string, head: string) => {
  const command = `git diff --name-only ${base} ${head}`;
  console.log({ command, head, base });
  return new Promise<string>((resolve, reject) => {
    exec(command.trim(), (error, stdout, stderr) => {
      if (error) {
        reject(new Error(error.message));
        return;
      }
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      console.log({ stdout });
      resolve(stdout);
    });
  });
};
