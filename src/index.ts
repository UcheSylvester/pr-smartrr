import { context, getOctokit } from '@actions/github';
import { getInput, info, setFailed, warning } from '@actions/core';
import { BASE_SHA, DEFAULT_MAX_REVIEWERS, HEAD_SHA } from './constants';
import {
  getChangedFiles,
  getReviewersEmails,
  getReviewersUsernames,
  getValidReviewers,
  sendReviewRequests,
} from './helpers';

export const run = async () => {
  try {
    const baseSha = context.payload.pull_request?.base.sha || BASE_SHA;
    const headSha = context.payload.pull_request?.head.sha || HEAD_SHA;
    const creator = context.payload.pull_request?.user.login;

    const maxReviewers = getInput('max-reviewers');
    const token = getInput('github-token');

    const Octokit = getOctokit(token);

    const changedFiles = await getChangedFiles(baseSha, headSha);
    if (!changedFiles) {
      warning('No changed files found!');
      return;
    }

    const emails = await getReviewersEmails(changedFiles);
    if (!emails.length) {
      warning('No reviewers found!');
      return;
    }

    const usernames = await getReviewersUsernames(Octokit, emails);

    const validReviewers = getValidReviewers({
      reviewers: usernames,
      creator,
      maxReviewers: isNaN(Number(maxReviewers))
        ? DEFAULT_MAX_REVIEWERS
        : Number(maxReviewers),
    });

    if (!validReviewers?.length) {
      warning('No valid reviewers found!');
      return;
    }

    const response = await sendReviewRequests({
      Octokit,
      reviewers: validReviewers,
      context,
    });

    console.log(response);
    info(`Review requests sent to ${validReviewers.join(', ')}`);
  } catch (e) {
    console.log(e);
    setFailed((e as Error).message);
  }
};

run();
