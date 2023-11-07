import { formatReviewers } from './utils';

describe('formatReviewers', () => {
  it('should return an array of unique reviewers', () => {
    const reviewers = `john.doe@example.com
                        jane.doe@example.com
                        john.doe@example.com
                        `;
    const expected = ['john.doe@example.com', 'jane.doe@example.com'];
    expect(formatReviewers(reviewers)).toEqual(expected);
  });

  it('should remove invalid reviewers', () => {
    const reviewers = `john.doe@example.com
                        jane.doe@example.com
                        undefined
                        `;
    const expected = ['john.doe@example.com', 'jane.doe@example.com'];
    expect(formatReviewers(reviewers)).toEqual(expected);
  });

  it('should return an empty array if input is empty', () => {
    const reviewers = '';
    const expected: string[] = [];
    expect(formatReviewers(reviewers)).toEqual(expected);
  });
});
