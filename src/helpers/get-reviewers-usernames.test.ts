import { getReviewersUsernames } from '.';
import { TOctokit } from '../types';

describe('getReviewersUsernames', () => {
  it('should return an array of unique reviewers usernames', async () => {
    const emails = ['user1@example.com', 'user2@example.com'];
    const usernames = ['user1'];
    const mockSearchUsers = jest.fn().mockResolvedValue({
      data: {
        items: [{ login: 'user1' }, { login: 'user2' }],
      },
    });
    const mockOctokit = {
      rest: {
        search: {
          users: mockSearchUsers,
        },
      },
    } as unknown as TOctokit;

    const result = await getReviewersUsernames(mockOctokit, emails);
    expect(result).toEqual(usernames);
    expect(mockSearchUsers).toHaveBeenCalledTimes(2);
    expect(mockSearchUsers).toHaveBeenCalledWith({ q: 'user1@example.com' });
    expect(mockSearchUsers).toHaveBeenCalledWith({ q: 'user2@example.com' });
  });

  it('should filter out invalid reviewers', async () => {
    const emails = ['user1@example.com', 'user2@example.com'];
    const usernames: string[] = [];
    const mockSearchUsers = jest.fn().mockResolvedValue({
      data: {
        items: [{ login: undefined }, { login: null }],
      },
    });
    const mockOctokit = {
      rest: {
        search: {
          users: mockSearchUsers,
        },
      },
    } as unknown as TOctokit;

    const result = await getReviewersUsernames(mockOctokit, emails);
    expect(result).toEqual(usernames);
    expect(mockSearchUsers).toHaveBeenCalledTimes(2);
    expect(mockSearchUsers).toHaveBeenCalledWith({ q: 'user1@example.com' });
    expect(mockSearchUsers).toHaveBeenCalledWith({ q: 'user2@example.com' });
  });
});
