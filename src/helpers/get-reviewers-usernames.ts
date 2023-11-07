import { INVALID_REVIEWERS } from '../constants';
import { TOctokit } from '../types';

export const getReviewersUsernames = async (
  Octokit: TOctokit,
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

  const _usernames = usernames.filter(
    (username): username is string => !INVALID_REVIEWERS.includes(username)
  );

  return [...new Set(_usernames)];
};
