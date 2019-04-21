 
    const fetchJsonp = require('fetch-jsonp');
 


const searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",fetchMusic);

function fetchMusic(e){
    e.preventDefault();
   const searchText = document.querySelector('#search-text').value;
   const fetchUrl =`https://itunes.apple.com/search?term=${searchText}`;

   fetchJsonp(fetchUrl)
    .then(res => res.json())
    .then(data => showMusic(data.results))
    .catch(err => console.log(err));
}

function showMusic(musics){
    console.log(musics);
    const results = document.querySelector('#results');
    
    results.innerHTML='';

    for(let i = 0;i<musics.length;i++){
        const music = musics[i];

        if(music.kind !== "song"){
            continue;
        }
       const div = document.createElement('div');
       div.classList.add('card');
       div.innerHTML =`
     <img class="card-img-top" src=${music.artworkUrl100} alt="Card image cap">
     <div class="card-body">
        <h5 class="card-title">${music.trackName}</h5>
        <p class="card-text">${music.artistName}</p>
     </div>
     <ul class="list-group list-group-flush">
        <li class="list-group-item">${music.collectionName}</li>
        <li class="list-group-item">${music.primaryGenreName}.${music.releaseDate.split('-',1)}</li>
        <li class="list-group-item">
        Sample:<br>  
        <audio src=${music.previewUrl} controls='controls'></audio>
        </li>
    </ul>
    <div class="card-body">
        <a href=${music.trackViewUrl} class="card-link">link</a>     
    </div>
       `;
       results.appendChild(div);
    }
    
  }
