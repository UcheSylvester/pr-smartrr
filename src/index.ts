import { context } from '@actions/github';
import { getChangedFiles } from './helpers/get-changed-files';

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
  const creator = context.payload.pull_request?.user?.login;

  const changedFiles = getChangedFiles();

  console.log({ creator, changedFiles });
};

run();
