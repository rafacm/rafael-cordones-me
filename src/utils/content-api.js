import Logger from "jet-logger";
import { getClient } from 'sanity.js'

export async function getAllBlogArticles() {
  const query = `*[_type == "post"] | order(startDate desc)`;
  const response = await getClient().fetch(query);
  Logger.Info("getAllProjects", response)
  return response;
}
