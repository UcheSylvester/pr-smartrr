import { exec } from 'child_process';
import { INVALID_REVIEWERS } from './constants';
import { getOctokit } from '@actions/github';
import { warning } from '@actions/core';

export const getReviewersEmails = async (changedFiles: string) => {
  return new Promise<string[] | undefined>((resolve) => {
    exec(
      `git log --pretty=format:"%ae" -- ${changedFiles} | sort -u`,
      (error, stdout) => {
        if (stdout) {
          resolve(formatReviewers(stdout));
        }
      }
    );
  });
};

export const getReviewersUsernames = async (
  Octokit: ReturnType<typeof getOctokit>,
  changedFiles: string
) => {
  const emails = await getReviewersEmails(changedFiles);
  console.log({ emails });
  if (!emails) {
    warning('No reviewers found');
    return [];
  }
  const usernames = await Promise.all(
    emails.map(async (email) => {
      const { data } = await Octokit.rest.search.users({ q: email });
      if (data.items.length > 0) {
        return data.items[0].login;
      }
    })
  );

  return usernames.filter((username) => !INVALID_REVIEWERS.includes(username));
};

const formatReviewers = (reviewers: string) => {
  const _reviewers = reviewers
    .trim()
    .split('\n')
    .filter(
      (reviewer) => reviewer !== '' && !INVALID_REVIEWERS.includes(reviewer)
    );

  return [...new Set(_reviewers)];
};
