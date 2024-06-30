import { getAllPostRefs } from "./api"
const FileSystem = require("fs");

export const getRefs = () => {
	const links = getAllPostRefs();
	FileSystem.writeFile('_cache/backlinks.json', JSON.stringify(links), (error) => {
    if (error) throw error;
  });
}