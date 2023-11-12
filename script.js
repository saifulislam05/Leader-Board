const playersData = [
  {
    firstName: "Saiful",
    lastName: "Islam",
    country: "India",
    score: 100,
  },
  {
    firstName: "John",
    lastName: "Doe",
    country: "United States",
    score: 85,
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    country: "Canada",
    score: 92,
  },
  {
    firstName: "Elena",
    lastName: "Martinez",
    country: "Spain",
    score: 78,
  },
  {
    firstName: "Yuki",
    lastName: "Tanaka",
    country: "Japan",
    score: 96,
  },
];
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const country = document.getElementById("country");
const score = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const tableBody = document.getElementById("tableBody");

document.addEventListener("DOMContentLoaded", renderUi(playersData));

function renderUi(data) {
  const sortedData = sortData(data);
  const rankedPlayers = rankPlayers(sortedData);
  let fragment = new DocumentFragment();

  console.log(rankedPlayers);
  rankedPlayers.forEach((singleData, index) => {
    const { rank, firstName, lastName, country, score } = singleData;
    let row = document.createElement("tr");
    row.innerHTML = `<td>${rank}</td>
                        <td>${firstName} ${lastName}</td>
                        <td>${country}</td>
                        <td>${score}</td>
                        <td id=${index} class="actions flex gap-4 items-center">
                                <button class="decrease btn btn-xs btn-outline btn-accent">-5</button>
                                <button class="increase btn btn-xs btn-outline btn-accent">+5</button>
                            <i class="deleteBtn fa-regular fa-trash-can text-red-600 cursor-pointer"></i>
                        </td> `;
    fragment.appendChild(row);
  });

  tableBody.innerHTML = "";
  tableBody.appendChild(fragment);
}
// sorting as per score in accending order 
function sortData(data) {
  return data.sort((a, b) => b.score - a.score);
}
// Event listener for adding new Data to playersData
addBtn.addEventListener("click", addData);

function addData(event) {
  event.preventDefault();

  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const countryValue = country.value;
  const scoreValue = score.value;

  const obj = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    country: countryValue,
    score: scoreValue
  };

  playersData.push(obj);
  renderUi(playersData);
}

tableBody.addEventListener("click", (e) => {
  const index = e.target.closest(".actions").id;
  if (e.target.classList.contains("decrease")) {
    decreaseScore(index);
  } else if (e.target.classList.contains("increase")) {
    increaseScore(index);
  } else if (e.target.classList.contains("deleteBtn")) {
    removePlayer(index);
  }
});

function decreaseScore(index) {
  playersData[index].score = playersData[index].score - 5;
  renderUi(playersData);
}
function increaseScore(index) {
  playersData[index].score = playersData[index].score + 5;
  renderUi(playersData);
}
function removePlayer(index) {
  playersData.splice(index, 1);
  renderUi(playersData);
}

// Ranking each players on their score


function rankPlayers(data) {
  let currentRank = 0;
  let previousScore = -1;
  return data.map(player => {
    if (player.score != previousScore) {
      previousScore = player.score;
      currentRank++;
    }
    return { ...player, rank: currentRank }
  });
}












