import { INVALID_REVIEWERS } from '../constants';
import { getValidReviewers } from './get-valid-reviewers';

describe('getValidReviewers', () => {
  it('should return an empty array if no valid reviewers are found', () => {
    const reviewers = [...INVALID_REVIEWERS, 'creator'] as string[];
    const creator = 'creator';
    const maxReviewers = 2;
    const validReviewers = getValidReviewers({
      reviewers,
      creator,
      maxReviewers,
    });
    expect(validReviewers).toEqual([]);
  });

  it('should return an array of valid reviewers', () => {
    const reviewers = [
      ...INVALID_REVIEWERS,
      'valid1',
      'valid2',
      'creator',
      'valid3',
    ] as string[];
    const creator = 'creator';
    const maxReviewers = 3;
    const validReviewers = getValidReviewers({
      reviewers,
      creator,
      maxReviewers,
    });
    expect(validReviewers).toEqual(['valid1', 'valid2', 'valid3']);
  });

  it('should return all valid reviewers if there are fewer valid reviewers than the max number of reviewers', () => {
    const reviewers = [
      ...INVALID_REVIEWERS,
      'valid1',
      'valid2',
      'creator',
      'valid3',
    ] as string[];
    const creator = 'creator';
    const maxReviewers = 5;
    const validReviewers = getValidReviewers({
      reviewers,
      creator,
      maxReviewers,
    });
    expect(validReviewers).toEqual(['valid1', 'valid2', 'valid3']);
  });

  it('should return an empty array if no reviewers are provided', () => {
    const reviewers: string[] = [];
    const creator = 'creator';
    const maxReviewers = 2;
    const validReviewers = getValidReviewers({
      reviewers,
      creator,
      maxReviewers,
    });
    expect(validReviewers).toEqual([]);
  });

  it('should return an empty array if all reviewers are invalid', () => {
    const reviewers = [...INVALID_REVIEWERS, 'creator'] as string[];
    const creator = 'creator';
    const maxReviewers = 2;
    const validReviewers = getValidReviewers({
      reviewers,
      creator,
      maxReviewers,
    });
    expect(validReviewers).toEqual([]);
  });
});
