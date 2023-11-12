
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

// Input fields and button references
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const country = document.getElementById("country");
const score = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const tableBody = document.getElementById("tableBody");

// Trophy icon markup
const trophy = `<span className="w-full flex justify-center items-center">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 512 512"
        className="text-orange-400 dark:text-orange-200"
        height="18"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M98.398 21.146a17.092 17.092 0 0 0-4.636.521c-20.49 5.262-33.163 20.63-36.116 38.649-2.952 18.019 2.168 38.346 12.676 58.193 20.695 39.086 63.262 77.08 117.852 85.85-5.61-6.72-11.05-14.246-16.274-22.375-39.008-12.57-70.021-42.344-85.67-71.899-9.206-17.387-12.846-34.491-10.82-46.857C77.437 50.862 83.482 42.89 98.238 39.1c.065-.017.068-.034.092-.053-.065-.143.105-.08 0 0 .022.049.061.11.176.217.527.493 1.689 2.24 2.207 5.14 1.036 5.804-.413 15.593-8.135 25.68l14.293 10.942c10.418-13.61 13.65-28.086 11.56-39.785-1.044-5.85-3.396-11.165-7.628-15.124-3.174-2.969-7.747-4.868-12.405-4.972zm315.204 0c-4.658.104-9.23 2.003-12.405 4.972-4.232 3.96-6.584 9.274-7.629 15.124-2.089 11.699 1.143 26.174 11.56 39.785l14.294-10.942c-7.722-10.087-9.171-19.876-8.135-25.68.518-2.9 1.68-4.647 2.207-5.14a.695.695 0 0 0 .176-.217c-.105-.08.065-.143 0 0 .024.019.027.036.092.053 14.756 3.79 20.801 11.76 22.828 24.127 2.026 12.366-1.614 29.47-10.82 46.857-15.649 29.555-46.662 59.33-85.67 71.899-5.223 8.129-10.665 15.655-16.274 22.375 54.59-8.77 97.157-46.764 117.852-85.85 10.508-19.847 15.628-40.174 12.676-58.193-2.953-18.02-15.626-33.387-36.116-38.649a17.092 17.092 0 0 0-4.636-.521zm-276.166 7.713c2.146 36.533 16.76 83.07 36.537 120.824 10.707 20.442 22.876 38.334 34.761 50.685C220.62 212.72 232 218.858 240 218.858h32c8 0 19.38-6.138 31.266-18.49 11.885-12.351 24.054-30.243 34.761-50.685 19.777-37.755 34.39-84.29 36.537-120.824H137.436zm95.564 208v16h46v-16h-46zm6.445 34c-2.458 25.967-12.796 57.873-24.437 76h81.984c-11.64-18.127-21.979-50.033-24.437-76h-33.11zm-38.445 94v14h110v-14H201zm-32 32v94h174v-94H169zm23 23h128v48H192v-48z"></path>
      </svg>
    </span>`;

// Initial rendering of the UI
document.addEventListener("DOMContentLoaded", renderUi(playersData));

// Function to render the UI based on player data
function renderUi(data) {
  // Sort data by score in descending order
  const sortedData = sortData(data);

  // Rank players and get a new array with ranks
  const rankedPlayers = rankPlayers(sortedData);

  let fragment = new DocumentFragment();
  rankedPlayers.forEach((singleData, index) => {
    const { rank, firstName, lastName, country, score } = singleData;

    let row = document.createElement("tr");
    row.innerHTML = `<td>${rank === 1 ? trophy : rank}</td>
                        <td>${firstName} ${lastName}</td>
                        <td>${country}</td>
                        <td>${score}</td>
                        <td id=${index} class="actions flex gap-4 items-center">
                                <button class="decrease btn btn-xs btn-outline btn-accent">-5</button>
                                <button class="increase btn btn-xs btn-outline btn-accent">+5</button>
                            <i class="deleteBtn fa-regular fa-trash-can text-red-600 cursor-pointer"></i>
                        </td> `;

    fragment.appendChild(row);

    // If the rank is 1, add the trophy to the first cell of the row
    if (rank === 1) {
      const firstTd = row.querySelector("td:first-child");
      firstTd.innerHTML = trophy;
    }
  });

  // Clear existing content and append the fragment to the table body
  tableBody.innerHTML = "";
  tableBody.appendChild(fragment);
}

// Function to sort player data by score in descending order
function sortData(data) {
  return data.sort((a, b) => b.score - a.score);
}

// Event listener for adding new player data
addBtn.addEventListener("click", addData);

// Function to add new player data
function addData(event) {
  event.preventDefault();

  // Get input values
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const countryValue = country.value;
  const scoreValue = score.value;

  // Preventing to submit if any input field is empty
  if (
    firstNameValue === "" ||
    lastNameValue === "" ||
    countryValue === "" ||
    scoreValue === ""
  ) {
    document.getElementById("alert").classList.remove("hidden");
    return;
  } else if (!document.getElementById("alert").classList.contains("hidden")) {
    document.getElementById("alert").classList.add("hidden");
  }

  // Create a new player object
  const obj = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    country: countryValue,
    score: Number(scoreValue),
  };

  // Add the new player to the data and render the updated UI
  playersData.push(obj);
  renderUi(playersData);
}

// Event listener for actions (decrease, increase, delete) on player rows
tableBody.addEventListener("click", (e) => {
  const index = e.target.closest(".actions").id;

  // Perform the corresponding action based on the clicked element's class
  if (e.target.classList.contains("decrease")) {
    decreaseScore(index);
  } else if (e.target.classList.contains("increase")) {
    increaseScore(index);
  } else if (e.target.classList.contains("deleteBtn")) {
    removePlayer(index);
  }
});

// Function to decrease the score of a player
function decreaseScore(index) {
  playersData[index].score = playersData[index].score - 5;
  renderUi(playersData);
}

// Function to increase the score of a player
function increaseScore(index) {
  playersData[index].score = playersData[index].score + 5;
  renderUi(playersData);
}

// Function to remove a player from the data
function removePlayer(index) {
  playersData.splice(index, 1);
  renderUi(playersData);
}

// Function to rank players based on their score
function rankPlayers(data) {
  let currentRank = 0;
  let previousScore = -1;
  return data.map((player) => {
    if (player.score != previousScore) {
      previousScore = player.score;
      currentRank++;
    }
    return { ...player, rank: currentRank };
  });
}
