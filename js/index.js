// Fetching information about the user
const fetchUserData = async (user) => {
  const apiCall = await fetch(`https://api.github.com/users/${user}`);
  const userData = await apiCall.json();
  return userData
}

// Second fetch for the user's repos
const fetchRepoData = async (user) => {
  const apiCall = await fetch(`https://api.github.com/users/${user}/repos`);
  const repoData = await apiCall.json();
  return repoData;
}

// Rendering the user's information

const renderUserData = () => {
  fetchUserData(document.querySelector("#search").value).then(res => {
    let bio = res.bio;
    // Checks if user has bio
    if(!bio) bio = 'No bio...'
    // Checks if user is found
    if(!res.id) {
      document.querySelector(".user-info").innerHTML = `
      <div class="error">Does not exist</div>
      `;
    } else {
      // Error message when user isn't found
      document.querySelector(".user-info").innerHTML = `
        <img class="user-img" src="${res.avatar_url}">
        <div class='user-data'>
          <p class="username"><i>@${res.login}</i></p>
          <p class="name"><strong>${res.name}</strong></p>
          <p class="bio">${bio}</p>
        </div>
        <h3>Repositories</h3>
      `;
      //Renders the repositories if user is found
      renderRepoData();
    }
  });
}

// Rendering the user's repos
const renderRepoData = () => {
  const fork = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Octicons-repo-forked.svg/32px-Octicons-repo-forked.svg.png"
  const star = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Octicons-star.svg/32px-Octicons-star.svg.png"

  fetchRepoData(document.querySelector("#search").value).then(res => {
    // Checks if user has repos
    if(res.length) {
      res.forEach(repo => {
        document.querySelector(".repos").innerHTML += `
        <div class="repo">
          <span>${repo.name}</span>
          <div class=repo-info>
            <img height="15" alt="Git Star" src=${star}><span>${repo.stargazers_count}</span>
            <img height="15" alt="Git Fork" src=${fork}><span>${repo.forks_count}</span>
          </div>
        </div>
        `;
      });
    } else {
      document.querySelector(".repos").innerHTML = `
        <div class="repo">
          <span style="color: #a1a1a1;"}>This user has no repos</span>
        </div>
      `;
    }
  });
}

// Event for search button
document.querySelector(".search-button").addEventListener("click", () => {
  // Clean the results
  document.querySelector(".user-info").innerHTML = '';
  document.querySelector(".repos").innerHTML = '';
  renderUserData();
});

//  Evento for "Enter" key
document.querySelector(".search-input").addEventListener("keypress", e => {
  if (13 === e.keyCode) {
    // Clean the results
    document.querySelector(".user-info").innerHTML = '';
    document.querySelector(".repos").innerHTML = '';
    renderUserData();
  }
});
