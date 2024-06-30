export const calculateAge = (birthday) => {
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const filterBlogPosts = (post) =>
  process.env.NODE_ENV === 'development' ||
  // (!post.hidden && new Date(post.date) <= new Date());
  !post.hidden;

export const slugify = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '') // This is where the - would go if kebab casing
    .replace(/\:/g, '')
    .toLowerCase();

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export const getImageValuesFromMarkdown = (md) => {
  const regex =
    /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
  return Array.from(md.matchAll(regex)).map((res) => res[1]);
};

export const getInternalLinksFromMarkdown = (md) => {
  const regex =
    /(?:__|[*#])|\[(.*?)\]\(\/(.*?)\)/g;
  return Array.from(md.matchAll(regex)).map((res) => {
    if (res && res.length > 1) {
      return res[2];
    }
  });
};
