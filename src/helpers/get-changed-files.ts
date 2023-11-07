import { exec } from 'child_process';

export const getChangedFiles = async (base: string, head: string) => {
  return new Promise<string>((resolve, reject) => {
    exec(`git diff --name-only ${base} ${head}`, (error, stdout, stderr) => {
      if (error) return reject(new Error(error.message));
      if (stderr) return reject(new Error(stderr));
      resolve(stdout);
    });
  });
};
