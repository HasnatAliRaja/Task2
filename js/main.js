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
      console.log("Pehla deedar", data);
      if (
        localStorage.getItem("movies") == null ||
        localStorage.getItem("movies") == undefined
      ) {
        console.log("Does not exist, Hahaha I got in ehehehhe");
        storeMoviesInStorage(data);
      } else {
        console.log(
          "I could not get in Noooooo, that Damn!!!! localStorage ahhhhhhhhhhh"
        );
      }
      generateTable();//Used to generate tables for the main Page....
    })

    .catch((err) => {
      console.log(err);
    });
}
function generateTable() {
  let call = 0;
  console.log("CalledTimes", ++call);
  let data = JSON.parse(localStorage.getItem("movies"));
  console.log("CalledTimes", ++call, data);
  let num = 0;
  let tab = `<tr> 
          <th>#</th>
          <th class="idCol">Id</th>
          <th>Title</th> 
          <th>Release Date</th>
          <th>Director</th> 
          <th>Producer</th> 
          <th>RT</th> 
          <th>Actions</th>
         </tr>`;

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
        <button onclick=" movieSelectedEdit('${
          r.id
        }')" >Edit</button>
        <button onclick="location.href='/editAdd.html'">Remove</button>
    </td>           
    </tr>`;
  }
  
  //StoringInStorage

  storeMoviesInStorage(data);

  // Setting innerHTML as tab variable
  document.getElementById("moviesTable").innerHTML = tab;
}

function storeMoviesInStorage(data) {
  localStorage.clear();
  localStorage.setItem("movies", JSON.stringify(data));
}
function movieSelectedEdit(id) {
  localStorage.setItem("detailsMovie", id);
  window.location = "editAdd.html";
  
  return false;
}
function movieSelectedDetails(id) {
  localStorage.setItem("detailsMovie", id);
  window.location = "details.html";
  console.log("ID", id);
  console.log("sessionStrorage", JSON.parse(localStorage.getItem("movies")));
  return false;
}

function findIndex(films, id) {
  for (r of films) {
    if (r.id === id) {
      console.log("Number", r.num);
      return r.num;
    }
  }
}

function showMovie() {
  let index = null;
  films = JSON.parse(localStorage.getItem("movies"));
  id = localStorage.getItem("detailsMovie");

  index = films.map((a, id) => {
    if (id == a.id) {
      return console.log("warr Jaa");
    }
  });

  console.log("heya", films, index, id);

  try {
    console.log("shown");

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
    console.log(e);
  }
}

//Add Movie
function addMovie(){

  localStorage.setItem('addMovie',true);
  window.location = 'editAdd.html';
  return false;


}