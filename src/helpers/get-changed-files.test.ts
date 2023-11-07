import { BASE_SHA, HEAD_SHA } from '../constants';
import { getChangedFiles } from '.';

describe('getChangedFiles', () => {
  it('should return a string of changed files', async () => {
    const changedFiles = await getChangedFiles(BASE_SHA, HEAD_SHA);
    expect(typeof changedFiles).toBe('string');
    expect(changedFiles).toContain('.ts'); // assuming you have TypeScript files in your project
  });

  it('should throw an error if there is an issue with the git command', async () => {
    const base = 'main';
    const head = 'feature-branch';
    await expect(getChangedFiles(base, head)).rejects.toThrow();
  });
});
