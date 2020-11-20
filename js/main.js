//This is the API Url
const apiUrl = "https://ghibliapi.herokuapp.com/films";
//Jquery
// $(document).ready(()=>{
//     getMovies(apiUrl);
// });

function fetchMovies() {
  //response from the api
  fetch(apiUrl)
    .then(async (response) => {
      //saving data in json
      let data = await response.json();

      //Storing in storage
     
      if (
        localStorage.getItem("movies") == null ||
        localStorage.getItem("movies") == undefined
      ) {
        let idMaker = 0;
        localStorage.setItem("idGenerator", idMaker);
        

        storeMoviesInStorage(data);
      }
      generateTable(); //Used to generate tables for the main Page....
    })
    .catch((err) => {
      console.log(err);
    });
}
generateTable = () => {
  let call = 0;
  let data = JSON.parse(localStorage.getItem("movies"));
  let num = 0;
  let tab = ``;

  // Loop to access all rows
  for (let r of data) {
    tab += `<tr>  
    <td>${(r.num = num++)}</td>  
    <td class="idCol">${r.id}</td>    
    <td>${r.title} </td> 
    <td>${r.release_date}</td> 
    <td>${r.director}</td>  
    <td>${r.producer}</td>           
    <td>${r.rt_score}</td>
    <td class="actions">
        <button onclick="movieSelectedDetails('${r.id}')">Details</button>
        <button onclick="addMovie()">Add</button>
        <button onclick=" movieSelectedEdit('${r.id}')" >Edit</button>
        <button onclick="removeMovie('${r.id}')">Remove</button>
    </td>           
    </tr>`;
  }

  //StoringInStorage

  storeMoviesInStorage(data);

  // Setting innerHTML as tab variable
  document.getElementById("moviesTable").innerHTML += tab;
};

storeMoviesInStorage = (data) => {
  localStorage.clear();
  localStorage.setItem("movies", JSON.stringify(data));
};
movieSelectedEdit = (id) => {
  localStorage.setItem("detailsMovie", id);
  window.location = "editAdd.html";

  return false;
};
movieSelectedDetails = (id) => {
  localStorage.setItem("detailsMovie", id);
  window.location = "details.html";
  return false;
};

findIndex = (films, id) => {
  for (r of films) {
    if (r.id === id) {
      return r.num;
    }
  }
};

showMovie = () => {
  let index = null;
  films = JSON.parse(localStorage.getItem("movies"));
  id = localStorage.getItem("detailsMovie");

  index = films.map((a, id) => {
    if (id == a.id) {
      return 'Awesome';
    }
  });

 

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
                <a href="index.html">Go Back</a>
            </div>
        </div>
    </div>
    `;
    document.getElementById("containerMain").innerHTML = movie;
  } catch (e) {
    
  }
};

//Add Movie
addMovie = () => {
  localStorage.setItem("addMovie", true);
  window.location = "editAdd.html";
  return false;
};
//RemoveMovie

removeMovie = (id) => {
  let films = JSON.parse(localStorage.getItem("movies"));
  let index = findIndex(films, id);

  films.splice(index, 1);
 
  localStorage.setItem("movies", JSON.stringify(films));
  generateTable();

  return false;
  //Oi
};
