import type PostResponse from "@/model/PostResponse";
import type Project from "@/model/Project";
import { useAlertStore } from "@/stores/AlertStore";
import axios, { type AxiosResponse } from "axios";

export default class ProjectService {
  private static AXIOS_CONFIG = { timeout: 3000 };
  private alertStore = useAlertStore();
  private static PROJECTS_URL =
    "https://www.jojannekedekens.nl/wp-json/wp/v2/projects";
  private static DEFAULT_PROJECTS_PER_PAGE = 9;

  public async fetchProjects(
    page?: number,
    per_page?: number,
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
    let url = `${ProjectService.PROJECTS_URL}?page=${page ?? 1}&per_page=${
      per_page ?? ProjectService.DEFAULT_PROJECTS_PER_PAGE
    }`;

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

  public async fetchProjectsInOrder(
    firstCategory: number,
    lastCategory: number
  ): Promise<PostResponse | undefined> {
    const projectsResponse: PostResponse = {
      totalPages: 0,
      total: 0,
      posts: [],
    };

    const currentProjects =
      ((await this.fetchProjects(1, 100, [firstCategory]))
        ?.posts as Project[]) ?? [];
    const pastProjects =
      ((await this.fetchProjects(1, 100, [lastCategory]))
        ?.posts as Project[]) ?? [];
    projectsResponse.posts = currentProjects.concat(pastProjects);
    projectsResponse.totalPages = Math.floor(projectsResponse.posts.length / 9);
    projectsResponse.total = projectsResponse.posts.length;

    return projectsResponse;
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
