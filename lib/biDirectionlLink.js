import { getAllPostRefs } from "./api"
const FileSystem = require("fs");

export const getRefs = () => {
	const [links, bookLinks] = getAllPostRefs();
	FileSystem.writeFile('_cache/backlinks.json', JSON.stringify(links), (error) => {
    if (error) throw error;
  });
	FileSystem.writeFile('_cache/bookshelfLinks.json', JSON.stringify(bookLinks), (error) => {
    if (error) throw error;
  });
}