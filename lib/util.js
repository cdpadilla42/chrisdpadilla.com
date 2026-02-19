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
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const lowercaseFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export const getImageValuesFromMarkdown = (md) => {
  const regex =
    /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
  return Array.from(md.matchAll(regex)).map((res) => res[1]);
};

export const getInternalLinksFromMarkdown = (md) => {
  const regex = /(?:__|[*#])|\[(.*?)\]\(\/(.*?)\)/g;
  return Array.from(md.matchAll(regex)).map((res) => {
    if (res && res.length > 1) {
      return res[2];
    }
  });
};

export const getBookshelfLinsFromMarkdown = (md) => {
  const regex = /(?:__|[*#])|\[(.*?)\]\(\/bookshelf#(.*?)\)/g;
  return Array.from(md.matchAll(regex)).map((res) => {
    if (res && res.length > 1) {
      return res[2];
    }
  });
};

export const convertCamelCaseToTitleCase = (text) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  if (!result) return result;
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

/**
 * Paginate an array of items
 * @param {Array} items - The array to paginate
 * @param {number} page - Current page number (1-indexed)
 * @param {number} pageSize - Number of items per page
 * @returns {Array} Paginated subset of items
 */
export const paginateArray = (items, page = 1, pageSize = 15) => {
  const skip = (page - 1) * pageSize;
  return items.slice(skip, skip + pageSize);
};

const TOP_LEVEL_TAG_ROUTES = {
  Gallery: '/gallery',
  Studio: '/studio',
};

export const getTagUrl = (tag) => {
  return TOP_LEVEL_TAG_ROUTES[tag] || `/blog/${lowercaseFirstLetter(tag)}`;
};
