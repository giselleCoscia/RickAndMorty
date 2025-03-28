// "characters": "https://rickandmortyapi.com/api/character",
// "locations": "https://rickandmortyapi.com/api/location",
// "episodes": "https://rickandmortyapi.com/api/episode"/

const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

const $inputSearch = $("#inputSearch");
const $buttonSearch = $("#buttonSearch");
const $backPage = $("#backPage");
const $nextPage = $("#nextPage");
const $containerCards = $("#containerCards");
const $numberPage = $("#numberPage");
const $selectStatus = $("#status");
const $selectGender = $("#gender");
const $selectTipo = $("#tipo");
let page = 1;
let totalPage;
let isCharacter = true;



const getPage = async () => {
    const gender = $selectGender.value?`&gender=${$selectGender.value}`:"";
    const status = $selectStatus.value?`&status=${$selectStatus.value}`:"";
    const apiPage = await fetch(
      `https://rickandmortyapi.com/api/${isCharacter?"character":"episode"}?page=${page}&name=${$inputSearch.value}&tipo=${$selectTipo.value}${gender}${status}`
    );
    const data = await apiPage.json();
    return data;
};

const drawData = (characters) => {
  
  $containerCards.innerHTML = "";
  for (const character of characters) {
    $containerCards.innerHTML += `<div id="imC" class="  bg-white rounded-lg overflow-hidden shadow-lg ">
          ${isCharacter?`<img id="imgCard"
            src="${character.image}"
            alt="Portada"
            class=" w-full h-64 object-cover"
          />`:""}
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">
             ${character.name}
            </h3>
            <p class="text-gray-600 mb-4">${isCharacter?character.gender:character.episode}</p>
             ${isCharacter?`<p class="text-gray-600 mb-4">${character.status}</p>`:""}
            <div class="flex justify-between items-center">
              <button
                class="bg-lime-400 hover:bg-lime-500 text-white px-3 py-1 rounded-md text-sm font-medium"
              >
               Ver Mas
              </button>
            </div>
          </div>
        </div>`;
  }
};

const updateView = async ()=>{
    const data = await getPage();
    drawData(data.results);
    totalPage = data.info.pages;
    $numberPage.innerHTML = page;
}

const init = () => {
    updateView()
};

init();


$nextPage.addEventListener("click", () => {
  $containerCards.innerHTML = "";
  $containerCards.innerHTML = `<h1>Loading...</h1>`;
  page += 1;
  updateView();
  if(page == totalPage){
    $nextPage.disabled = true;
  } else if (page > 1){
    $backPage.disabled = false;
  }         
  
});

$backPage.addEventListener("click", () => { 
    $containerCards.innerHTML = "";
    $containerCards.innerHTML = `<h1>Loading...</h1>`;
    page -= 1;
    updateView();
    if(page === 1){
        $backPage.disabled = true;
    }
}); 

$buttonSearch.addEventListener("click", async () => {
    page = 1;
    updateView();
}); 

$selectStatus.addEventListener("change",updateView);
$selectGender.addEventListener("change", updateView);  

$selectTipo.addEventListener("change", async () => {
        isCharacter = !isCharacter;
        updateView();
        $selectStatus.style.display = isCharacter ? "block" : "none";
        $selectGender.style.display = isCharacter ? "block" : "none";
   }          
);  


// const infoRick = [
//     {
//         "id": 1,
//         "name": "Rick Sanchez",
//         "status": "Alive",
//         "species": "Human",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "Earth (C-137)",
//             "url": "https://rickandmortyapi.com/api/location/1"
//         },
//         "location": {
//             "name": "Citadel of Ricks",
//             "url": "https://rickandmortyapi.com/api/location/3"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/1",
//             "https://rickandmortyapi.com/api/episode/2",
//             "https://rickandmortyapi.com/api/episode/3",
//             "https://rickandmortyapi.com/api/episode/4",
//             "https://rickandmortyapi.com/api/episode/5",
//             "https://rickandmortyapi.com/api/episode/6",
//             "https://rickandmortyapi.com/api/episode/7",
//             "https://rickandmortyapi.com/api/episode/8",
//             "https://rickandmortyapi.com/api/episode/9",
//             "https://rickandmortyapi.com/api/episode/10",
//             "https://rickandmortyapi.com/api/episode/11",
//             "https://rickandmortyapi.com/api/episode/12",
//             "https://rickandmortyapi.com/api/episode/13",
//             "https://rickandmortyapi.com/api/episode/14",
//             "https://rickandmortyapi.com/api/episode/15",
//             "https://rickandmortyapi.com/api/episode/16",
//             "https://rickandmortyapi.com/api/episode/17",
//             "https://rickandmortyapi.com/api/episode/18",
//             "https://rickandmortyapi.com/api/episode/19",
//             "https://rickandmortyapi.com/api/episode/20",
//             "https://rickandmortyapi.com/api/episode/21",
//             "https://rickandmortyapi.com/api/episode/22",
//             "https://rickandmortyapi.com/api/episode/23",
//             "https://rickandmortyapi.com/api/episode/24",
//             "https://rickandmortyapi.com/api/episode/25",
//             "https://rickandmortyapi.com/api/episode/26",
//             "https://rickandmortyapi.com/api/episode/27",
//             "https://rickandmortyapi.com/api/episode/28",
//             "https://rickandmortyapi.com/api/episode/29",
//             "https://rickandmortyapi.com/api/episode/30",
//             "https://rickandmortyapi.com/api/episode/31",
//             "https://rickandmortyapi.com/api/episode/32",
//             "https://rickandmortyapi.com/api/episode/33",
//             "https://rickandmortyapi.com/api/episode/34",
//             "https://rickandmortyapi.com/api/episode/35",
//             "https://rickandmortyapi.com/api/episode/36",
//             "https://rickandmortyapi.com/api/episode/37",
//             "https://rickandmortyapi.com/api/episode/38",
//             "https://rickandmortyapi.com/api/episode/39",
//             "https://rickandmortyapi.com/api/episode/40",
//             "https://rickandmortyapi.com/api/episode/41",
//             "https://rickandmortyapi.com/api/episode/42",
//             "https://rickandmortyapi.com/api/episode/43",
//             "https://rickandmortyapi.com/api/episode/44",
//             "https://rickandmortyapi.com/api/episode/45",
//             "https://rickandmortyapi.com/api/episode/46",
//             "https://rickandmortyapi.com/api/episode/47",
//             "https://rickandmortyapi.com/api/episode/48",
//             "https://rickandmortyapi.com/api/episode/49",
//             "https://rickandmortyapi.com/api/episode/50",
//             "https://rickandmortyapi.com/api/episode/51"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/1",
//         "created": "2017-11-04T18:48:46.250Z"
//     },
//     {
//         "id": 2,
//         "name": "Morty Smith",
//         "status": "Alive",
//         "species": "Human",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Citadel of Ricks",
//             "url": "https://rickandmortyapi.com/api/location/3"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/1",
//             "https://rickandmortyapi.com/api/episode/2",
//             "https://rickandmortyapi.com/api/episode/3",
//             "https://rickandmortyapi.com/api/episode/4",
//             "https://rickandmortyapi.com/api/episode/5",
//             "https://rickandmortyapi.com/api/episode/6",
//             "https://rickandmortyapi.com/api/episode/7",
//             "https://rickandmortyapi.com/api/episode/8",
//             "https://rickandmortyapi.com/api/episode/9",
//             "https://rickandmortyapi.com/api/episode/10",
//             "https://rickandmortyapi.com/api/episode/11",
//             "https://rickandmortyapi.com/api/episode/12",
//             "https://rickandmortyapi.com/api/episode/13",
//             "https://rickandmortyapi.com/api/episode/14",
//             "https://rickandmortyapi.com/api/episode/15",
//             "https://rickandmortyapi.com/api/episode/16",
//             "https://rickandmortyapi.com/api/episode/17",
//             "https://rickandmortyapi.com/api/episode/18",
//             "https://rickandmortyapi.com/api/episode/19",
//             "https://rickandmortyapi.com/api/episode/20",
//             "https://rickandmortyapi.com/api/episode/21",
//             "https://rickandmortyapi.com/api/episode/22",
//             "https://rickandmortyapi.com/api/episode/23",
//             "https://rickandmortyapi.com/api/episode/24",
//             "https://rickandmortyapi.com/api/episode/25",
//             "https://rickandmortyapi.com/api/episode/26",
//             "https://rickandmortyapi.com/api/episode/27",
//             "https://rickandmortyapi.com/api/episode/28",
//             "https://rickandmortyapi.com/api/episode/29",
//             "https://rickandmortyapi.com/api/episode/30",
//             "https://rickandmortyapi.com/api/episode/31",
//             "https://rickandmortyapi.com/api/episode/32",
//             "https://rickandmortyapi.com/api/episode/33",
//             "https://rickandmortyapi.com/api/episode/34",
//             "https://rickandmortyapi.com/api/episode/35",
//             "https://rickandmortyapi.com/api/episode/36",
//             "https://rickandmortyapi.com/api/episode/37",
//             "https://rickandmortyapi.com/api/episode/38",
//             "https://rickandmortyapi.com/api/episode/39",
//             "https://rickandmortyapi.com/api/episode/40",
//             "https://rickandmortyapi.com/api/episode/41",
//             "https://rickandmortyapi.com/api/episode/42",
//             "https://rickandmortyapi.com/api/episode/43",
//             "https://rickandmortyapi.com/api/episode/44",
//             "https://rickandmortyapi.com/api/episode/45",
//             "https://rickandmortyapi.com/api/episode/46",
//             "https://rickandmortyapi.com/api/episode/47",
//             "https://rickandmortyapi.com/api/episode/48",
//             "https://rickandmortyapi.com/api/episode/49",
//             "https://rickandmortyapi.com/api/episode/50",
//             "https://rickandmortyapi.com/api/episode/51"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/2",
//         "created": "2017-11-04T18:50:21.651Z"
//     },
//     {
//         "id": 3,
//         "name": "Summer Smith",
//         "status": "Alive",
//         "species": "Human",
//         "type": "",
//         "gender": "Female",
//         "origin": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "location": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/6",
//             "https://rickandmortyapi.com/api/episode/7",
//             "https://rickandmortyapi.com/api/episode/8",
//             "https://rickandmortyapi.com/api/episode/9",
//             "https://rickandmortyapi.com/api/episode/10",
//             "https://rickandmortyapi.com/api/episode/11",
//             "https://rickandmortyapi.com/api/episode/12",
//             "https://rickandmortyapi.com/api/episode/14",
//             "https://rickandmortyapi.com/api/episode/15",
//             "https://rickandmortyapi.com/api/episode/16",
//             "https://rickandmortyapi.com/api/episode/17",
//             "https://rickandmortyapi.com/api/episode/18",
//             "https://rickandmortyapi.com/api/episode/19",
//             "https://rickandmortyapi.com/api/episode/20",
//             "https://rickandmortyapi.com/api/episode/21",
//             "https://rickandmortyapi.com/api/episode/22",
//             "https://rickandmortyapi.com/api/episode/23",
//             "https://rickandmortyapi.com/api/episode/24",
//             "https://rickandmortyapi.com/api/episode/25",
//             "https://rickandmortyapi.com/api/episode/26",
//             "https://rickandmortyapi.com/api/episode/27",
//             "https://rickandmortyapi.com/api/episode/29",
//             "https://rickandmortyapi.com/api/episode/30",
//             "https://rickandmortyapi.com/api/episode/31",
//             "https://rickandmortyapi.com/api/episode/32",
//             "https://rickandmortyapi.com/api/episode/33",
//             "https://rickandmortyapi.com/api/episode/34",
//             "https://rickandmortyapi.com/api/episode/35",
//             "https://rickandmortyapi.com/api/episode/36",
//             "https://rickandmortyapi.com/api/episode/38",
//             "https://rickandmortyapi.com/api/episode/39",
//             "https://rickandmortyapi.com/api/episode/40",
//             "https://rickandmortyapi.com/api/episode/41",
//             "https://rickandmortyapi.com/api/episode/42",
//             "https://rickandmortyapi.com/api/episode/43",
//             "https://rickandmortyapi.com/api/episode/44",
//             "https://rickandmortyapi.com/api/episode/45",
//             "https://rickandmortyapi.com/api/episode/46",
//             "https://rickandmortyapi.com/api/episode/47",
//             "https://rickandmortyapi.com/api/episode/48",
//             "https://rickandmortyapi.com/api/episode/49",
//             "https://rickandmortyapi.com/api/episode/51"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/3",
//         "created": "2017-11-04T19:09:56.428Z"
//     },
//     {
//         "id": 4,
//         "name": "Beth Smith",
//         "status": "Alive",
//         "species": "Human",
//         "type": "",
//         "gender": "Female",
//         "origin": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "location": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/6",
//             "https://rickandmortyapi.com/api/episode/7",
//             "https://rickandmortyapi.com/api/episode/8",
//             "https://rickandmortyapi.com/api/episode/9",
//             "https://rickandmortyapi.com/api/episode/10",
//             "https://rickandmortyapi.com/api/episode/11",
//             "https://rickandmortyapi.com/api/episode/12",
//             "https://rickandmortyapi.com/api/episode/14",
//             "https://rickandmortyapi.com/api/episode/15",
//             "https://rickandmortyapi.com/api/episode/16",
//             "https://rickandmortyapi.com/api/episode/18",
//             "https://rickandmortyapi.com/api/episode/19",
//             "https://rickandmortyapi.com/api/episode/20",
//             "https://rickandmortyapi.com/api/episode/21",
//             "https://rickandmortyapi.com/api/episode/22",
//             "https://rickandmortyapi.com/api/episode/23",
//             "https://rickandmortyapi.com/api/episode/24",
//             "https://rickandmortyapi.com/api/episode/25",
//             "https://rickandmortyapi.com/api/episode/26",
//             "https://rickandmortyapi.com/api/episode/27",
//             "https://rickandmortyapi.com/api/episode/28",
//             "https://rickandmortyapi.com/api/episode/29",
//             "https://rickandmortyapi.com/api/episode/30",
//             "https://rickandmortyapi.com/api/episode/31",
//             "https://rickandmortyapi.com/api/episode/32",
//             "https://rickandmortyapi.com/api/episode/33",
//             "https://rickandmortyapi.com/api/episode/34",
//             "https://rickandmortyapi.com/api/episode/35",
//             "https://rickandmortyapi.com/api/episode/36",
//             "https://rickandmortyapi.com/api/episode/38",
//             "https://rickandmortyapi.com/api/episode/39",
//             "https://rickandmortyapi.com/api/episode/40",
//             "https://rickandmortyapi.com/api/episode/41",
//             "https://rickandmortyapi.com/api/episode/42",
//             "https://rickandmortyapi.com/api/episode/43",
//             "https://rickandmortyapi.com/api/episode/44",
//             "https://rickandmortyapi.com/api/episode/45",
//             "https://rickandmortyapi.com/api/episode/46",
//             "https://rickandmortyapi.com/api/episode/47",
//             "https://rickandmortyapi.com/api/episode/48",
//             "https://rickandmortyapi.com/api/episode/49",
//             "https://rickandmortyapi.com/api/episode/51"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/4",
//         "created": "2017-11-04T19:22:43.665Z"
//     },
//     {
//         "id": 5,
//         "name": "Jerry Smith",
//         "status": "Alive",
//         "species": "Human",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "location": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/6",
//             "https://rickandmortyapi.com/api/episode/7",
//             "https://rickandmortyapi.com/api/episode/8",
//             "https://rickandmortyapi.com/api/episode/9",
//             "https://rickandmortyapi.com/api/episode/10",
//             "https://rickandmortyapi.com/api/episode/11",
//             "https://rickandmortyapi.com/api/episode/12",
//             "https://rickandmortyapi.com/api/episode/13",
//             "https://rickandmortyapi.com/api/episode/14",
//             "https://rickandmortyapi.com/api/episode/15",
//             "https://rickandmortyapi.com/api/episode/16",
//             "https://rickandmortyapi.com/api/episode/18",
//             "https://rickandmortyapi.com/api/episode/19",
//             "https://rickandmortyapi.com/api/episode/20",
//             "https://rickandmortyapi.com/api/episode/21",
//             "https://rickandmortyapi.com/api/episode/22",
//             "https://rickandmortyapi.com/api/episode/23",
//             "https://rickandmortyapi.com/api/episode/26",
//             "https://rickandmortyapi.com/api/episode/29",
//             "https://rickandmortyapi.com/api/episode/30",
//             "https://rickandmortyapi.com/api/episode/31",
//             "https://rickandmortyapi.com/api/episode/32",
//             "https://rickandmortyapi.com/api/episode/33",
//             "https://rickandmortyapi.com/api/episode/35",
//             "https://rickandmortyapi.com/api/episode/36",
//             "https://rickandmortyapi.com/api/episode/38",
//             "https://rickandmortyapi.com/api/episode/39",
//             "https://rickandmortyapi.com/api/episode/40",
//             "https://rickandmortyapi.com/api/episode/41",
//             "https://rickandmortyapi.com/api/episode/42",
//             "https://rickandmortyapi.com/api/episode/43",
//             "https://rickandmortyapi.com/api/episode/44",
//             "https://rickandmortyapi.com/api/episode/45",
//             "https://rickandmortyapi.com/api/episode/46",
//             "https://rickandmortyapi.com/api/episode/47",
//             "https://rickandmortyapi.com/api/episode/48",
//             "https://rickandmortyapi.com/api/episode/49",
//             "https://rickandmortyapi.com/api/episode/50",
//             "https://rickandmortyapi.com/api/episode/51"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/5",
//         "created": "2017-11-04T19:26:56.301Z"
//     },
//     {
//         "id": 6,
//         "name": "Abadango Cluster Princess",
//         "status": "Alive",
//         "species": "Alien",
//         "type": "",
//         "gender": "Female",
//         "origin": {
//             "name": "Abadango",
//             "url": "https://rickandmortyapi.com/api/location/2"
//         },
//         "location": {
//             "name": "Abadango",
//             "url": "https://rickandmortyapi.com/api/location/2"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/27"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/6",
//         "created": "2017-11-04T19:50:28.250Z"
//     },
//     {
//         "id": 7,
//         "name": "Abradolf Lincler",
//         "status": "unknown",
//         "species": "Human",
//         "type": "Genetic experiment",
//         "gender": "Male",
//         "origin": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "location": {
//             "name": "Testicle Monster Dimension",
//             "url": "https://rickandmortyapi.com/api/location/21"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/10",
//             "https://rickandmortyapi.com/api/episode/11"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/7",
//         "created": "2017-11-04T19:59:20.523Z"
//     },
//     {
//         "id": 8,
//         "name": "Adjudicator Rick",
//         "status": "Dead",
//         "species": "Human",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Citadel of Ricks",
//             "url": "https://rickandmortyapi.com/api/location/3"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/28"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/8",
//         "created": "2017-11-04T20:03:34.737Z"
//     },
//     {
//         "id": 9,
//         "name": "Agency Director",
//         "status": "Dead",
//         "species": "Human",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "location": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/24"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/9",
//         "created": "2017-11-04T20:06:54.976Z"
//     },
//     {
//         "id": 10,
//         "name": "Alan Rails",
//         "status": "Dead",
//         "species": "Human",
//         "type": "Superhuman (Ghost trains summoner)",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Worldender's lair",
//             "url": "https://rickandmortyapi.com/api/location/4"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/25"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/10",
//         "created": "2017-11-04T20:19:09.017Z"
//     },
//     {
//         "id": 11,
//         "name": "Albert Einstein",
//         "status": "Dead",
//         "species": "Human",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "Earth (C-137)",
//             "url": "https://rickandmortyapi.com/api/location/1"
//         },
//         "location": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/12"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/11",
//         "created": "2017-11-04T20:20:20.965Z"
//     },
//     {
//         "id": 12,
//         "name": "Alexander",
//         "status": "Dead",
//         "species": "Human",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "Earth (C-137)",
//             "url": "https://rickandmortyapi.com/api/location/1"
//         },
//         "location": {
//             "name": "Anatomy Park",
//             "url": "https://rickandmortyapi.com/api/location/5"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/3"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/12",
//         "created": "2017-11-04T20:32:33.144Z"
//     },
//     {
//         "id": 13,
//         "name": "Alien Googah",
//         "status": "unknown",
//         "species": "Alien",
//         "type": "",
//         "gender": "unknown",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/31"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/13",
//         "created": "2017-11-04T20:33:30.779Z"
//     },
//     {
//         "id": 14,
//         "name": "Alien Morty",
//         "status": "unknown",
//         "species": "Alien",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Citadel of Ricks",
//             "url": "https://rickandmortyapi.com/api/location/3"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/10"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/14",
//         "created": "2017-11-04T20:51:31.373Z"
//     },
//     {
//         "id": 15,
//         "name": "Alien Rick",
//         "status": "unknown",
//         "species": "Alien",
//         "type": "",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Citadel of Ricks",
//             "url": "https://rickandmortyapi.com/api/location/3"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/10"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/15",
//         "created": "2017-11-04T20:56:13.215Z"
//     },
//     {
//         "id": 16,
//         "name": "Amish Cyborg",
//         "status": "Dead",
//         "species": "Alien",
//         "type": "Parasite",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Earth (Replacement Dimension)",
//             "url": "https://rickandmortyapi.com/api/location/20"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/15"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/16",
//         "created": "2017-11-04T21:12:45.235Z"
//     },
//     {
//         "id": 17,
//         "name": "Annie",
//         "status": "Alive",
//         "species": "Human",
//         "type": "",
//         "gender": "Female",
//         "origin": {
//             "name": "Earth (C-137)",
//             "url": "https://rickandmortyapi.com/api/location/1"
//         },
//         "location": {
//             "name": "Anatomy Park",
//             "url": "https://rickandmortyapi.com/api/location/5"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/3"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/17",
//         "created": "2017-11-04T22:21:24.481Z"
//     },
//     {
//         "id": 18,
//         "name": "Antenna Morty",
//         "status": "Alive",
//         "species": "Human",
//         "type": "Human with antennae",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Citadel of Ricks",
//             "url": "https://rickandmortyapi.com/api/location/3"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/10",
//             "https://rickandmortyapi.com/api/episode/28"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/18",
//         "created": "2017-11-04T22:25:29.008Z"
//     },
//     {
//         "id": 19,
//         "name": "Antenna Rick",
//         "status": "unknown",
//         "species": "Human",
//         "type": "Human with antennae",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "unknown",
//             "url": ""
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/10"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/19",
//         "created": "2017-11-04T22:28:13.756Z"
//     },
//     {
//         "id": 20,
//         "name": "Ants in my Eyes Johnson",
//         "status": "unknown",
//         "species": "Human",
//         "type": "Human with ants in his eyes",
//         "gender": "Male",
//         "origin": {
//             "name": "unknown",
//             "url": ""
//         },
//         "location": {
//             "name": "Interdimensional Cable",
//             "url": "https://rickandmortyapi.com/api/location/6"
//         },
//         "image": "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
//         "episode": [
//             "https://rickandmortyapi.com/api/episode/8"
//         ],
//         "url": "https://rickandmortyapi.com/api/character/20",
//         "created": "2017-11-04T22:34:53.659Z"
//     }
// ]
