import { parseISO, getMonth, getDate, addDays } from 'date-fns';

const TARGET_COUNT = 5;
const MAX_RANGE_DAYS = 7;

export function getOnThisDayPosts(allPosts, targetDate = new Date()) {
  let rangeDays = 0;
  let foundPosts = [];

  // Expand range until we find TARGET_COUNT posts or reach MAX_RANGE_DAYS
  while (foundPosts.length < TARGET_COUNT && rangeDays <= MAX_RANGE_DAYS) {
    foundPosts = filterPostsByDateRange(allPosts, targetDate, rangeDays);

    if (foundPosts.length >= TARGET_COUNT || rangeDays >= MAX_RANGE_DAYS) {
      break;
    }

    rangeDays++;
  }

  // Sort by date descending (most recent year first)
  const sortedPosts = foundPosts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return {
    posts: sortedPosts, // Return ALL posts found, not just TARGET_COUNT
    rangeDays,
    totalFound: foundPosts.length,
  };
}

function filterPostsByDateRange(posts, targetDate, rangeDays) {
  const targetMonth = getMonth(targetDate);
  const targetDay = getDate(targetDate);

  const matches = [];

  for (const post of posts) {
    const postDate = parseISO(post.date);

    // Check each day in the range (±rangeDays from target)
    for (let offset = -rangeDays; offset <= rangeDays; offset++) {
      const checkDate = addDays(new Date(2000, targetMonth, targetDay), offset);

      if (
        getMonth(postDate) === getMonth(checkDate) &&
        getDate(postDate) === getDate(checkDate)
      ) {
        matches.push(post);
        break;
      }
    }
  }

  return matches;
}
