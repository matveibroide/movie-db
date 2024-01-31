export default class MovieDbService {
  _apiBase = "https://api.themoviedb.org/";
  _apiMovie = "https://api.themoviedb.org/3/search/movie";
  _apiKey = "87e20ae45e40ed1f3d42750b1ffbfa4e";
  _apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2UyMGFlNDVlNDBlZDFmM2Q0Mjc1MGIxZmZiZmE0ZSIsInN1YiI6IjY0YjgxNTVmYjFmNjhkMDE0NDZhMjM1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W5ELXuv7y-jDQlslYva6dqOqJwNmLDvcc_pJF-uLrig";

  async getResource(url) {
    const res = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2UyMGFlNDVlNDBlZDFmM2Q0Mjc1MGIxZmZiZmE0ZSIsInN1YiI6IjY0YjgxNTVmYjFmNjhkMDE0NDZhMjM1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W5ELXuv7y-jDQlslYva6dqOqJwNmLDvcc_pJF-uLrig",
        accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }

  async getMovie(query) {
    const updatedQuery = query.replaceAll(" ", "%20");
    const res = await this.getResource(
      `${this._apiMovie}?query=${updatedQuery}&include_adult=false&language=en-US&page=1`
    );
    return res.results;
  }
}
