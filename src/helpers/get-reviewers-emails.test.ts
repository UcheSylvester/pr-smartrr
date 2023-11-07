import { getReviewersEmails } from '.';

describe('getReviewersEmails', () => {
  it('should return an array of reviewers emails', async () => {
    const changedFiles = 'src/helpers/get-reviewers-emails.ts';
    const reviewersEmails = await getReviewersEmails(changedFiles);
    expect(Array.isArray(reviewersEmails)).toBe(true);
    expect(reviewersEmails.length).toBeGreaterThan(0);
    expect(typeof reviewersEmails[0]).toBe('string');
  });
});
