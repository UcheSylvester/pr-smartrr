import { context, getOctokit } from '@actions/github';
import { getChangedFiles } from './get-changed-files';
import { getReviewersUsernames } from './changed-files-reviewers';
import { getInput } from '@actions/core';

/**
 * STEPS
 * V0.0.1
 * Get PR creator
 * Get changed files
 * Get committers of the changed files
 * Compare committers and take the top 3 committers (excluding the creator) with the most commits as reviewers
 * Get reviewers emails
 * Get github username from emails
 * Add reviewers to PR
 *
 * V0.0.2
 * Allow for default reviewers incase there are no reviewers found (e.g. for new files)
 *
 */

const run = async () => {
  try {
    const baseSha =
      context.payload.pull_request?.base.sha ||
      '2d2f73c099310be56ace9e4aa3a922eb23ff0650';
    const headSha =
      context.payload.pull_request?.head.sha ||
      '71c867b0d68417a9de4774aedb92182169028538';

    const token = getInput('github-token');
    const Octokit = getOctokit(token);

    const changedFiles = await getChangedFiles(baseSha, headSha);
    const usernames = await getReviewersUsernames(Octokit, changedFiles);

    console.log({ usernames, changedFiles });
  } catch (error) {
    console.log({ error });
  }
};

run();
