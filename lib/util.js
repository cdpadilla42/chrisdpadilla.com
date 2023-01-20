export const calculateAge = (birthday) => {
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const filterBlogPosts = (post) =>
  process.env.NODE_ENV === 'development' ||
  (!post.hidden && new Date(post.date) <= new Date());

export const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/\:/g, '')
    .toLowerCase();
