import { INVALID_REVIEWERS } from './constants';

export const formatReviewers = (reviewers: string) => {
  const _reviewers = reviewers
    .trim()
    .split('\n')
    .filter((reviewer) => reviewer && !INVALID_REVIEWERS.includes(reviewer));

  return [...new Set(_reviewers)];
};
