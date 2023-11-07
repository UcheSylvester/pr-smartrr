import { Context } from '@actions/github/lib/context';
import { TOctokit } from '../types';
import { sendReviewRequests } from './send-review-requests';

describe('sendReviewRequests', () => {
  it('should send review requests to the specified reviewers', async () => {
    const Octokit = {
      rest: {
        pulls: {
          requestReviewers: jest.fn(),
        },
      },
    } as unknown as TOctokit;
    const reviewers = ['reviewer1', 'reviewer2'];
    const context = {
      repo: {
        owner: 'owner',
        repo: 'repo',
      },
      payload: {
        pull_request: {
          number: 123,
        },
      },
    } as unknown as Context;
    await sendReviewRequests({ Octokit, reviewers, context });
    expect(Octokit.rest.pulls.requestReviewers).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      pull_number: 123,
      reviewers: ['reviewer1', 'reviewer2'],
    });
  });
});
