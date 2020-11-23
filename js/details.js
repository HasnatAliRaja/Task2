document.addEventListener("DOMContentLoaded", function (event) {
  // - Code to execute when all DOM content is loaded.
  // - including fonts, images, etc.
  showMovie();
});

showMovie = () => {
  let index = null;
  films = JSON.parse(localStorage.getItem("movies"));
  id = paramExtractor(); //localStorage.getItem("detailsMovie");

  for (let r of films) {
    if (id == r.id) {
      index = r.num;
    }
  }

  try {
    let movie = `
      <div  class="movie">
          <h2>${films[index].title}</h2>
          <ul class="movieList">
              <li><strong>Director: </strong>${films[index].director}</li>
              <li><strong>Producer: </strong>${films[index].producer}</li>
              <li><strong>Release: </strong>${films[index].release_date}</li>
          </ul>
          <div class="plotDv">
              <h3>Plot</h3>
              ${films[index].description}
              <hr>
              <div>
                  <button class="underButtons"><a href="index.html">Go Back</a></button>
              </div>
          </div>
      </div>
      `;
    document.getElementById("containerMain").innerHTML = movie;
  } catch (e) {}
};

paramExtractor = () => {
  let queryString = new Array();
  if (queryString.length == 0) {
    if (window.location.search.split("?").length > 1) {
      let params = window.location.search.split("=");

      return params[1];
      
    }
  }
};
