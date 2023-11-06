import { context, getOctokit } from '@actions/github';
import { getChangedFiles } from './get-changed-files';
import { getReviewersUsernames } from './changed-files-reviewers';
import { getInput } from '@actions/core';
import { BASE_SHA, HEAD_SHA } from './constants';

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
    console.log({ pr: context.payload.pull_request });
    const baseSha = context.payload.pull_request?.base.sha || BASE_SHA;
    const headSha = context.payload.pull_request?.head.sha || HEAD_SHA;

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
