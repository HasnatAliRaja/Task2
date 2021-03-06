document.addEventListener("DOMContentLoaded", function (event) {
  // - Code to execute when all DOM content is loaded.
  // - including fonts, images, etc.
  
  if (localStorage.getItem("addMovie") == "true") {
    addMovie();
  } else {
    editMovie();
  }
});

function editMovie() {
  let index = null;
  films = JSON.parse(localStorage.getItem("movies"));
  id = paramExtractor();
  

  index = findIndex(films, id);
  

  try {
    

    let movie = `
        <div  class="movie">
            <form class="editForm" >
                <h1>Title</h1>
                <input id="title" value="${films[index].title}" maxlength='50'>
                <ul class="movieList">
                    <li><strong>Director: </strong><input id="director" value="${films[index].director}" maxlength='50'></li>
                    <li><strong>Producer: </strong><input id="producer" value="${films[index].producer}" maxlength='50'></li>
                    <li><strong>Release: </strong><input id="release" value="${films[index].release_date}" max='2024'></li>
                    <li><strong>Rt-Score: </strong><input id="rtScore" value="${films[index].rt_score}" max='100'></li>
                </ul>
                <div class="plotDv">
                    <h3>Plot</h3>
                    <textarea id="description"  style = "width:600px;height:300px;">${films[index].description}</textarea>
                    <hr>
                    <div>
                       
                       <button type='button' value='submit' onclick="saveChanges(${index})">Save</button>
                       <button class="underButtons"><a href="index.html">Go Back</a></button>
                    </div>
                   
                </div>
                
            </form>
        </div>
        `;

    document.getElementById("containerMain").innerHTML = movie;
  } catch (e) {
    console.log(e);
  }
}

function findIndex(films, id) {
  
  for (r of films) {
    if (r.id == id) {
      
      return r.num;
    }
  }
}

function saveChanges(index) {
  let films = JSON.parse(localStorage.getItem("movies"));
  let titleN = document.getElementById("title").value;
  let directorN = document.getElementById("director").value;
  let producerN = document.getElementById("producer").value;
  let releaseN = document.getElementById("release").value;
  let descriptionN = document.getElementById("description").value;
  let rt_scoreN = document.getElementById("rtScore").value;

  films[index].title = titleN;
  films[index].director = directorN;
  films[index].producer = producerN;
  films[index].release_date = releaseN;
  films[index].description = descriptionN;
  films[index].rt_score = rt_scoreN;

  localStorage.setItem("movies", JSON.stringify(films));
  return false;
}

function addMovie() {
  let index = null;
  films = JSON.parse(localStorage.getItem("movies"));

  try {
    let movie = `
        <div  class="movie">
            <form class="editForm" >
                <input id="title">
                <ul class="movieList">
                    <li><strong>Director: </strong><input id="director" ></li>
                    <li><strong>Producer: </strong><input id="producer"></li>
                    <li><strong>Release: </strong><input id="release"></li>
                    <li><strong>Rt-Score: </strong><input id="rtScore"></li>
                </ul>
                <div class="plotDv">
                    <h3>Plot</h3>
                    <textarea id="description"  style = "width:600px;height:300px;"></textarea>
                    <hr>
                    <div>
                       
                       <button class="underButtons" type='button' value='submit' onclick="saveNewMovie()">Save</button>
                       <button class="underButtons"><a href="index.html">Go Back</a></button>
                    </div>
                   
                </div>
                
            </form>
        </div>
        `;

    document.getElementById("containerMain").innerHTML = movie;
  } catch (e) {
    console.log(e);
  }
}

function saveNewMovie() {
  
  let titleN = document.getElementById("title").value;
  let directorN = document.getElementById("director").value;
  let producerN = document.getElementById("producer").value;
  let releaseN = document.getElementById("release").value;
  let descriptionN = document.getElementById("description").value;
  let rt_scoreN = document.getElementById("rtScore").value;
  let films = JSON.parse(localStorage.getItem("movies"));
  

  let obj = {
      id: idGenerator(),
      title:titleN,
      director:directorN,
      producer:producerN,
      release_date:releaseN,
      description:descriptionN,
      rt_score:rt_scoreN
  }

  films.unshift(obj);
  localStorage.setItem('movies',JSON.stringify(films));
  localStorage.setItem('addMovie',false);
  return false;


}
function idGenerator(){

    let idMaker = localStorage.getItem('idGenerator');
    localStorage.setItem('idGenerator',++idMaker);
    
    return idMaker;
    

}
paramExtractor = () => {
  let queryString = new Array();
  if (queryString.length == 0) {
    if (window.location.search.split("?").length > 1) {
      let params = window.location.search.split("=");

      return params[1];
      
    }
  }
};
