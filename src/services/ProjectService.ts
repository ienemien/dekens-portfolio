import type PostResponse from "@/model/PostResponse";
import type Project from "@/model/Project";

export default class ProjectService {
  private static PROJECTS_URL = "/api/projects";
  private static DEFAULT_PROJECTS_PER_PAGE = 10;

  public async fetchProjects(
    page: number,
    perPage?: number
  ): Promise<PostResponse | undefined> {
    const projectsResponse: PostResponse = {
      totalPages: 0,
      total: 0,
      posts: [],
    };
    const projectsPerPage = perPage ?? ProjectService.DEFAULT_PROJECTS_PER_PAGE;
    const response: Response = await fetch(
      `${ProjectService.PROJECTS_URL}?page=${page}&per_page=${projectsPerPage}`
    );

    if (response.status === 200) {
      projectsResponse.posts = await response.json();
      projectsResponse.totalPages = parseInt(
        response.headers.get("x-wp-totalpages") ?? "0"
      );
      projectsResponse.total = parseInt(
        response.headers.get("x-wp-total") ?? "0"
      );
      return projectsResponse;
    } else {
      throw "Could not fetch projects.";
    }
  }

  public async fetchProject(projectId: string): Promise<Project> {
    const URL = `${ProjectService.PROJECTS_URL}/${projectId}`;
    const response = await fetch(URL);

    if (response.status === 200) {
      return response.json();
    }

    throw "Could not fetch project by id: " + projectId;
  }
}
