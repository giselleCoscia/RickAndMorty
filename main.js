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
const $detail = $("#detail");
let page = 1;
let totalPage;
let isCharacter = true;

const getPage = async () => {
  const gender = $selectGender.value ? `&gender=${$selectGender.value}` : "";
  const status = $selectStatus.value ? `&status=${$selectStatus.value}` : "";
  const apiPage = await fetch(
    `https://rickandmortyapi.com/api/${
      isCharacter ? "character" : "episode"
    }?page=${page}&name=${$inputSearch.value}&tipo=${
      $selectTipo.value
    }${gender}${status}`
  );
  const data = await apiPage.json();
  return data;
};

const getCharacter = async (id) => {
  let character = localStorage.getItem("charcater-"+id);
  if (character) {
    return JSON.parse(character);
  }
  const apiPage = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  const data = await apiPage.json();
  localStorage.setItem("charcater-"+id, JSON.stringify(data));
  return data;
};

const getCharactersUrls = async (urls) => {
  const ids = urls.map((url) => url.split("/").slice(-1)[0]);
  const characters = await Promise.all(
    ids.map((id) => getCharacter(id))
  );
  return characters;
}
const getEpisode = async (id) => {
  const apiPage = await fetch(
    `https://rickandmortyapi.com/api/episode/${id}`
  );
  const data = await apiPage.json();
  return data;
}


const drawData = (characters) => {
  $containerCards.innerHTML = "";
  for (const character of characters) {
    $containerCards.innerHTML += `<div class="bg-white rounded-lg overflow-hidden shadow-lg ">
          ${
            isCharacter
              ? `<img
            src="${character.image}"
            alt="Portada"
            class=" w-full h-64 object-cover"
          />`
              : ""
          }
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">
             ${character.name}
            </h3>
            <p class="text-gray-600 mb-4">${
              isCharacter ? character.gender : character.episode
            }</p>
    ${
      isCharacter
        ? `<p class="mb-4 font-semibold ${
            character.status === "Alive"
              ? "text-green-500"
              : character.status === "Dead"
              ? "text-red-500"
              : "text-gray-500"
          }">
      ${character.status}
    </p>`
        : ""
    }
            <div class="flex justify-between items-center">
              <button data-id="${character.id}"
                class="buttonCard bg-lime-400 hover:bg-lime-500 text-white px-3 py-1 rounded-md text-sm font-medium"
              >
               Ver Mas
              </button>
            </div>
          </div>
        </div>`;
    const $main = $("#main");
    $containerCards.querySelectorAll(".buttonCard").forEach((button, index) => {
      button.addEventListener("click", async (e) => {
        if (isCharacter) {
          $main.style.display = "none";
          $detail.style.display = "block";
          const id = e.target.dataset.id;
          $detail.innerHTML = `<h1 class="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>`;
          const character = await getCharacter(id);
          $detail.innerHTML = `<div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
           <img src="${character.image}" alt="">
           <p class="text-3xl font-bold mb-4 text-gray-200">Detalles</p>
           <p class="text-xl text-gray-200 mb-6">Nombre: ${character.name}</p>
           <p class="text-xl text-gray-200 mb-6">Especie: ${
             character.species
           }</p>
           <p class="mb-4 font-semibold ${
             character.status === "Alive"
               ? "text-green-500"
               : character.status === "Dead"
               ? "text-red-500"
               : "text-gray-500"
           }">
       ${character.status} </p>
           <p class="text-xl text-gray-200 mb-6">Origen: ${
             character.origin.name
           }</p>
           <p class="text-xl text-gray-200 mb-6">Ubicación: ${
             character.location.name
           }</p>
           <p class="text-xl text-gray-200 mb-6">Aparicion: ${character.episode
             .map((episode) => "E" + episode.split("/").pop())
             .join(", ")}</p>
           <button id="closeDetail" class="mt-4 px-4 py-2 bg-lime-400 text-white rounded">Volver</button>
         </div>  `;
          $("#closeDetail").addEventListener("click", () => {
            $detail.style.display = "none";
            $main.style.display = "block";
          });
        }
        if (!isCharacter) {
          {
            
            $main.style.display = "none";
            $detail.style.display = "block";
            const id = e.target.dataset.id;
            $detail.innerHTML = `<h1 class="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>`;
            const episode = await getEpisode(id);
            const characters = await getCharactersUrls(episode.characters);

            $detail.innerHTML = `<div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
           <p class="text-3xl font-bold mb-4 text-gray-200">Detalles</p>
           <p class="text-xl text-gray-200 mb-6">Nombre: ${episode.name}</p>
           <p class="text-xl text-gray-200 mb-6">Fecha de emision: ${episode.air_date}</p>
            <p class="text-xl text-gray-200 mb-6">Episodio: ${episode.episode}</p>
           <p class="text-xl text-gray-200 mb-6">
  Aparición:<ul>${characters.map((character) => `<li>${character.name} <img src="${character.image}"/></li>`).join("")}</ul>
           </p>
            </ul>
</p>

           <button id="closeDetail" class="mt-4 px-4 py-2 bg-lime-400 text-white rounded">Volver</button>
         </div>  `;
          $("#closeDetail").addEventListener("click", () => {
            $detail.style.display = "none";
            $main.style.display = "block";
          });

          }
        }
      });
    });
  }
};
const updateView = async () => {
  const data = await getPage();
  drawData(data.results);
  totalPage = data.info.pages;
  $numberPage.innerHTML = page;
};

const init = () => {
  updateView();
};

init();

$nextPage.addEventListener("click", () => {
  $containerCards.innerHTML = "";
  $containerCards.innerHTML = `<h1>Loading...</h1>`;
  page += 1;
  updateView();
  if (page == totalPage) {
    $nextPage.disabled = true;
  } else if (page > 1) {
    $backPage.disabled = false;
  }
});

$backPage.addEventListener("click", () => {
  $containerCards.innerHTML = "";
  $containerCards.innerHTML = `<h1>Loading...</h1>`;
  page -= 1;
  updateView();
  if (page === 1) {
    $backPage.disabled = true;
  }
});

$buttonSearch.addEventListener("click", async () => {
  page = 1;
  updateView();
});

$selectStatus.addEventListener("change", updateView);
$selectGender.addEventListener("change", updateView);

$selectTipo.addEventListener("change", () => {
  isCharacter = !isCharacter;
  updateView();
  $selectStatus.style.display = isCharacter ? "block" : "none";
  $selectGender.style.display = isCharacter ? "block" : "none";
});
