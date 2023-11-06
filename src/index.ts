import { context, getOctokit } from '@actions/github';
import { getInput, warning } from '@actions/core';
import { BASE_SHA, HEAD_SHA } from './constants';
import {
  getChangedFiles,
  getReviewersEmails,
  getReviewersUsernames,
} from './helpers';
import { getValidReviewers } from './helpers/get-valid-reviewers';

const run = async () => {
  try {
    const baseSha = context.payload.pull_request?.base.sha || BASE_SHA;
    const headSha = context.payload.pull_request?.head.sha || HEAD_SHA;
    const creator = context.payload.pull_request?.user.login;

    const token = getInput('github-token');
    const Octokit = getOctokit(token);

    const changedFiles = await getChangedFiles(baseSha, headSha);
    if (!changedFiles) return warning('No changed files found!');

    const emails = await getReviewersEmails(changedFiles);
    if (!emails?.length) return warning('No reviewers found!');

    const usernames = await getReviewersUsernames(Octokit, emails);

    const validReviewers = getValidReviewers({
      reviewers: usernames,
      creator,
      maxReviewers: 3,
    });

    if (!validReviewers?.length) return warning('No valid reviewers found!');

    console.log({ usernames, changedFiles });
  } catch (error) {
    console.log({ error });
  }
};

run();
