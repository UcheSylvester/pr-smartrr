import { INVALID_REVIEWERS } from './constants';

export const formatReviewers = (reviewers: string) => {
  const _reviewers = reviewers
    .trim()
    .split('\n')
    .reduce<string[]>((acc, reviewer) => {
      const _reviewer = reviewer.trim();
      if (reviewer && !INVALID_REVIEWERS.includes(_reviewer)) {
        acc.push(_reviewer);
      }
      return acc;
    }, []);

  return [...new Set(_reviewers)];
};
