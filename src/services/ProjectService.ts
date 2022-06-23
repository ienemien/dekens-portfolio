import type PostResponse from "@/model/PostResponse";
import type Project from "@/model/Project";
import { useAlertStore } from "@/stores/AlertStore";
import axios, { type AxiosResponse } from "axios";

export default class ProjectService {
  private static AXIOS_CONFIG = { timeout: 3000 };
  private alertStore = useAlertStore();
  private static PROJECTS_URL = "/api/projects";
  private static DEFAULT_PROJECTS_PER_PAGE = 10;

  public async fetchProjects(
    page: number,
    categories?: number[],
    orderBy?:
      | "author"
      | "date"
      | "id"
      | "include"
      | "modified"
      | "parent"
      | "relevance"
      | "slug"
      | "include_slugs"
      | "title"
  ): Promise<PostResponse | undefined> {
    const projectsResponse: PostResponse = {
      totalPages: 0,
      total: 0,
      posts: [],
    };
    let url = `${ProjectService.PROJECTS_URL}?page=${page}&per_page=${ProjectService.DEFAULT_PROJECTS_PER_PAGE}`;

    if (categories && categories.length > 0) {
      url = `${url}&project-categories=${categories}`;
    }
    if (orderBy) {
      url = `${url}&orderby=${orderBy}`;
    }

    try {
      const response: AxiosResponse = await axios.get(
        url,
        ProjectService.AXIOS_CONFIG
      );
      projectsResponse.posts = response.data;
      projectsResponse.totalPages = parseInt(
        response.headers["x-wp-totalpages"] ?? "0"
      );
      projectsResponse.total = parseInt(response.headers["x-wp-total"] ?? "0");

      return projectsResponse;
    } catch (err) {
      this.alertStore.addAlert(
        "Helaas konden de projecten op dit moment niet worden opgehaald, probeer het later nog eens."
      );
    }
  }

  public async fetchProject(projectId: string): Promise<Project | undefined> {
    const URL = `${ProjectService.PROJECTS_URL}/${projectId}`;

    try {
      const response: AxiosResponse = await axios.get(
        URL,
        ProjectService.AXIOS_CONFIG
      );
      return response.data;
    } catch (err) {
      this.alertStore.addAlert(
        "Helaas kon het project op dit moment niet worden opgehaald, probeer het later nog eens."
      );
    }
  }
}
