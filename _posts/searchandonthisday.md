---
title: Search! And On This Day!
tags:
  - Tech
  - This Website
date: '2025-10-30T10:35:07.322Z'
---

Wanted to say two long-time personally desired features now exist on this site: Searching blog articles and an ["On This Day"](on-this-day) page. (See the fancy new magnifying glass icon towards the top right!)

The On This Day page is another way of [tending the garden](/blog/digital%20Garden). It's admittedly most interesting to me since I can dip in and see the seasonality of thoughts and projects. And, of course, it adds [topography](/backlinksinjs) in a new dimension.

The search feature is one _I've_ personally needed as well. Of course, searching markdown in VS Code is a breeze. But when out in the wild, armed only with a phone, trying to remember if I've written about something, or searching for a quote I've posted, it'll now be handy to do so.

If the spelunking intrigues you, have at it!

## Dev

For the technically curious:

### Search

I'm used to considering search functionality for a massive amount of data, following table joins and mongodb aggregations. It initially sounds expensive to develop.

Thankfully, doing so for a static site with mostly text was much easier to plug-and-play.

The heavy lifting is being done by an incredibly lightweight package (15.4 kB!), Fuse.js. Setup and search is very straightforward:

```JavaScript
const searchResults = fuse.search(debouncedQuery);


const Fuse = FuseModule.default;
const fuseInstance = new Fuse(searchIndex, {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'excerpt', weight: 0.3 },
    { name: 'content', weight: 0.2 },
    { name: 'tags', weight: 0.1 },
  ],
  threshold: 0.2,
  // . . .
});
```

I just have to provide a searchIndex of all posts for it to parse through. This can be generated at build time with a script.

I had to play with the threshold. Fuse allows for fuzzy search, so a misspelling of "JavaScript" as "JavaScrpt" would still return results. But, left too wide, and unrelated results started popping up. Even the difference between 0.2 and 0.3 was significant!

A wrinkle to consider: My posts are in markdown, so including the full body of the text would include the links text and urls. When searching, I don't want to find a page just because it links to another page (for example: Searching "Stancfhield" shouldn't return pages that include a link to the /stanchfield post). A regex pattern passed to a replace function handles cleaning up the posts before indexing.

I've opted to make the search client-side to keep it feeling snappy and responsive. It comes with the tradeoff of having to send a MB of data to the client, but this is mitigating by lazy-loading the search component and lib, only downloading after the user has opened the search modal. The index is also cached across the site while browsing, so once the client has it, there's no need to re-download it.

Again — it felt strange to generate a massive file of _every_ post for the index to allow for the entire text of the site to be searchable. But, alas — this seems to be fairly common practice, and in the grand scheme of things, a lazy-loaded 1 MB file is not entirely unreasonable in a world where low res videos are 4.5 MB sent to the client.

### On This Day

On the other hand, this page is being handled Server Side. The page is standalone and, admittedly, may likely be infrequently visited, so generating on the serer per request is preferable.

The code here is a simple date comparison of posts, excluding years. The one complication is that, more than likely, there are days with no posts! My solution is to increment in both directions by a day until a minimum number of posts (5) are found, with a ceiling of 7 days.

```JavaScript
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
```

Perhaps there's an opportunity to optimize with Next's Incremental Static Regenteration. However, having markdown on disc in the server means searching is fairly quick. So it would be a consideration for larger projects, but the simple approach is best here.
