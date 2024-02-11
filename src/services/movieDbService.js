export default class MovieDbService {
  _apiBase = "https://api.themoviedb.org/";
  _apiMovie = "https://api.themoviedb.org/3/search/movie";
  _apiKey = "87e20ae45e40ed1f3d42750b1ffbfa4e";
  _apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2UyMGFlNDVlNDBlZDFmM2Q0Mjc1MGIxZmZiZmE0ZSIsInN1YiI6IjY0YjgxNTVmYjFmNjhkMDE0NDZhMjM1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W5ELXuv7y-jDQlslYva6dqOqJwNmLDvcc_pJF-uLrig";


  createGuestSession = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2UyMGFlNDVlNDBlZDFmM2Q0Mjc1MGIxZmZiZmE0ZSIsInN1YiI6IjY0YjgxNTVmYjFmNjhkMDE0NDZhMjM1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W5ELXuv7y-jDQlslYva6dqOqJwNmLDvcc_pJF-uLrig",
        },
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to create guest session");
    }
  };

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

  async getMovie(query, pageNumber = 1) {
    const updatedQuery = query.replaceAll(" ", "%20");
    const res = await this.getResource(
      `${this._apiMovie}?query=${updatedQuery}&include_adult=false&language=en-US&page=${pageNumber}`
    );
    return res.results;
  }

  async rateMovie(id, sessionId = "",value) {
    console.log(id)
    console.log(sessionId);
    
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${sessionId}`,
      { method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2UyMGFlNDVlNDBlZDFmM2Q0Mjc1MGIxZmZiZmE0ZSIsInN1YiI6IjY0YjgxNTVmYjFmNjhkMDE0NDZhMjM1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W5ELXuv7y-jDQlslYva6dqOqJwNmLDvcc_pJF-uLrig",
      },
      body: '{"value":8.5}',}
    );

    if (!res.ok) {
      throw new Error(`Something gone wrong, status:${res.status}}`);
    } else {
      return res.json();
    }
  }

  getRatedMoviesList = async (guestSessionId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch, received status:${res.staus}`);
    }

    return res.json();
  };
}
