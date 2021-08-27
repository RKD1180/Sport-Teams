document.getElementById("error-message").style.display = "none";
document.getElementById("error-message2").style.display = "none";
const loadTeams = () => {
  const getInput = document.getElementById("search-field");
  const getInputValue = getInput.value;
  document.getElementById("error-message").style.display = "none";
  document.getElementById("error-message2").style.display = "none";
  if (getInputValue == "") {
    document.getElementById("error-message").style.display = "block";
  } else {
    //   console.log(getInputValue);
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${getInputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPlayer(data.teams));
  }
};

const displayPlayer = (teams) => {
  //   console.log(teams);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  teams.forEach((player) => {
    // console.log(player);
    const createDiv = document.createElement("div");
    createDiv.classList.add("col");
    createDiv.innerHTML = `
    <div onclick="teamDetails(${player.idLeague})" class="card">
    <img src="${player.strTeamBadge}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${player.strTeam}</h5>
      <p class="card-text">${player.strDescriptionEN.slice(0, 250)}</p>
    </div>
  </div>
    
    `;
    searchResult.appendChild(createDiv);
  });
};

const teamDetails = (teamId) => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${teamId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showTeamDetails(data.teams[0]));
};

const showTeamDetails = (team) => {
  //   console.log("detals");
  const teamDetails = document.getElementById("team-details");
  teamDetails.textContent = "";
  const createDiv = document.createElement("div");
  createDiv.classList.add("col");
  createDiv.innerHTML = `
    <div class="card">
              <img src="${team.strTeamBadge}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${team.strTeam}</h5>
                <p class="card-text">${team.strDescriptionEN.slice(0, 300)}</p>
              </div>
            </div>
    
    `;
  teamDetails.appendChild(createDiv);
};
