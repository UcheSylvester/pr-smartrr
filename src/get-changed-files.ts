import { exec } from 'child_process';

export const getChangedFiles = async (base: string, head: string) => {
  return new Promise<string>((resolve, reject) => {
    exec(`git diff --name-only ${base} ${head}`, (error, stdout) => {
      if (error) {
        reject(error.message);
      }
      resolve(stdout);
    });
  });
};
