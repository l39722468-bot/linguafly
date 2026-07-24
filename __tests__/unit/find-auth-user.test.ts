/**
 * @jest-environment node
 */

describe('find-auth-user exports', () => {
  it('expone resolveAuthUserId y verifyPasswordWithRetry', async () => {
    const mod = await import('@/lib/auth/find-auth-user');
    expect(typeof mod.findAuthUserIdByEmail).toBe('function');
    expect(typeof mod.resolveAuthUserId).toBe('function');
    expect(typeof mod.verifyPasswordWithRetry).toBe('function');
  });
});
