import { getAllPostRefs } from "./api"
const FileSystem = require("fs");

export const getRefs = () => {
	const [links, bookLinks] = getAllPostRefs(['content', 'slug', 'title', 'bookshelf', 'date'], {filter: post => new Date(post.date) <= new Date()});
	FileSystem.writeFile('_cache/backlinks.json', JSON.stringify(links), (error) => {
    if (error) throw error;
  });
	FileSystem.writeFile('_cache/bookshelfLinks.json', JSON.stringify(bookLinks), (error) => {
    if (error) throw error;
  });
}