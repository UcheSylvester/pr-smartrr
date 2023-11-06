import { INVALID_REVIEWERS } from '../constants';
import { getOctokit } from '@actions/github';

export const getReviewersUsernames = async (
  Octokit: ReturnType<typeof getOctokit>,
  emails: string[]
) => {
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
