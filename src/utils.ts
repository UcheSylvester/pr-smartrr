import { INVALID_REVIEWERS } from './constants';

export const formatReviewers = (reviewers: string) => {
  const _reviewers = reviewers
    .trim()
    .split('\n')
    .reduce<string[]>((acc, reviewer) => {
      if (reviewer && !INVALID_REVIEWERS.includes(reviewer.trim())) {
        acc.push(reviewer.trim());
      }
      return acc;
    }, []);

  return [...new Set(_reviewers)];
};
