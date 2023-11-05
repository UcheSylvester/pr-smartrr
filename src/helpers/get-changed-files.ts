import { context } from '@actions/github';
import { exec } from 'child_process';

export const getChangedFiles = async () => {
  try {
    const baseSha = context.payload.pull_request?.base.sha;
    const headSha = context.payload.pull_request?.head.sha;

    console.log({ baseSha, headSha });

    exec(
      `git diff --name-only ${baseSha} ${headSha}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }

        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }

        console.log({ stdout });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
