//Targets div w/ class "overview"  where profile info will appear
const overview = document.querySelector(".overview");
//GitHub username
const username = "Collin-cr8"
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
  </div> `
  overview.append(div);
};