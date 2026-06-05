export const getGitHubProfile = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  return res.json();
};
