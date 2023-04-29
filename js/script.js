//Targets div w/ class "overview"  where profile info will appear
const overview = document.querySelector(".overview");
//GitHub username
const username = "Collin-cr8";
//Select unordered list to display repos
const repoList = document.querySelector(".repo-list");
//Select repos class where repo info appears
const allRepos = document.querySelector(".repos");
//Select "repo-data" where individual reppo data will appear
const repoData = document.querySelector(".repo-data");
//Select the back to repo gallery button
const backButton = document.querySelector(".view-repos");
//Select input with "search by name" placeholder
const filterInput = document.querySelector(".filter-repos");


//Create async function to fetch gitHub profile info using GitHub API
const getGitHub = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const gitProfileInfo = await userInfo.json();
   // console.log(gitProfileInfo);
    displayUserInfo(gitProfileInfo);

};

getGitHub();

//Create function to display fetched github info
const displayUserInfo = function(gitProfileInfo) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt = "user avatar" src=${gitProfileInfo.avatar_url} />
    </figure>
  <div>
    <p><strong>Name:</strong> ${gitProfileInfo.name}</p>
    <p><strong>Bio:</strong> ${gitProfileInfo.bio}</p>
    <p><strong>Location:</strong> ${gitProfileInfo.location}</p>
    <p><strong>Number of public repos:</strong> ${gitProfileInfo.public_repos}</p>
  </div> `;
  overview.append(div);
  fetchRepos();
};

//Create async function to fetch repos
//endpoints to get user's repos = user/${username}/repos
//parameters to sort repos by most recently updated and show up to 100 at a time
const fetchRepos = async function () {
    const getRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await getRepos.json();
    //console.log(data);
    displayRepo(data);
};

//Create function to display repo list
const displayRepo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
       const repoItem = document.createElement("li");
       repoItem.classList.add("repo");
       repoItem.innerHTML = `<h3>${repo.name}</h3>`;
       repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    //check if event target (element that was clicked) matches h3 element (name of repo)
    if (e.target.matches("h3")) {
        //target innerText where event happens
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//Create async function to get specific repo info that accepts repoName as a parameter
const getRepoInfo = async function (repoName) {
    //use endpoints to grab specific info
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();
    //Log out info of repo that is clicked
    console.log(repoInfo);
    //Create an array of Languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

//create function to DISPLAY individual repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepos.classList.add("hide");
    backButton.classList.remove("hide");
    const dataDiv = document.createElement("div");
    dataDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!
        </a>`;
    repoData.append(dataDiv);
};

//Add click event to back button
backButton.addEventListener("click", function() {
    allRepos.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
})