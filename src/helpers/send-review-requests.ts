import { TOctokit } from '../types';

export const sendReviewRequests = async (
  Octokit: TOctokit,
  reviewers: string[]
) => {
  console.log({ reviewers });
};
