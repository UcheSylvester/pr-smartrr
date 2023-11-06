import { INVALID_REVIEWERS } from '../constants';

interface GetValidReviewersArgs {
  reviewers: string[];
  creator: string;
  maxReviewers?: number;
}

export const getValidReviewers = ({
  reviewers,
  creator,
  maxReviewers = 2,
}: GetValidReviewersArgs): string[] => {
  return reviewers
    .filter((reviewer) => ![...INVALID_REVIEWERS, creator].includes(reviewer))
    .slice(0, maxReviewers);
};
