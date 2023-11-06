import { TOctokit } from '../types';
import { Context } from '@actions/github/lib/context';

interface SendReviewRequests {
  Octokit: TOctokit;
  reviewers: string[];
  context: Context;
}
export const sendReviewRequests = async ({
  Octokit,
  reviewers,
  context,
}: SendReviewRequests) => {
  console.log({ reviewers, context, repo: context.repo });

  return await Octokit.rest.pulls.requestReviewers({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request?.number as number,
    reviewers,
  });
};
