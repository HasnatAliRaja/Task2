//This is the API Url
const apiUrl = "https://ghibliapi.herokuapp.com/films";
//Jquery
// $(document).ready(()=>{
//     getMovies(apiUrl);
// });

fetchMovies=()=> {
  //response from the api
  

  if (
    localStorage.getItem("movies") == null ||
    localStorage.getItem("movies") == undefined  || JSON.parse(localStorage.getItem('movies')).length == 0
  ) {
    fetch(apiUrl)
      .then((response) => {
         response.json().then(response=>{
        console.log(response);
        localStorage.setItem('movies',JSON.stringify(response));
        generateTable();
         });
      })
      .catch((err) => {
        console.log(err);
      });
  }else if(JSON.parse(localStorage.getItem('movies')).length >= 0){
    generateTable();
  }
  

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
  document.getElementById("populateTable").innerHTML = tab;
};

storeMoviesInStorage = (data) => {
  localStorage.clear();
  localStorage.setItem("movies", JSON.stringify(data));
};
movieSelectedEdit = (id) => {
  let url = `editAdd.html?details=${encodeURIComponent(id)}`;
  window.location = url;

  return false;
};
movieSelectedDetails = (id) => {
  let url = `details.html?details=${encodeURIComponent(id)}`;
  window.location = url;
  return false;
};

findIndex = (films, id) => {
  for (r of films) {
    if (r.id === id) {
      return r.num;
    }
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
