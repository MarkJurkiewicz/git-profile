var username = document.querySelector('#user-input .user-input-text');

username.addEventListener('change', function (event) {
    var ghReq = new XMLHttpRequest();
    ghReq.addEventListener("load", updateProfileBadge);
    ghReq.open("GET", "https://api.github.com/users/" + username.value);
    ghReq.send();
});

var emptyUser = {
    login: "",
    name: "",
    location: "",
    public_repos: "",
    public_gists: "",
    avatar_url: "images/img_placeholder.svg"
};

function updateProfileBadge() {
    var response = JSON.parse(this.responseText);
    if (response.message === "Not Found") {
        updateDomWithUser(emptyUser);
    } else {
        updateDomWithUser(response);
    }
}

updateDomWithUser(emptyUser);

function updateDomWithUser(user) {
    var profile = document.getElementById('git-profile');
    profile.querySelector('.git-profile-username').innerText = user.login;
    profile.querySelector('.git-profile-name').innerText = user.name;
    profile.querySelector('.git-profile-location').innerText = user.location;
    profile.querySelector('.git-profile-repo-count').innerText = user.public_repos;
    profile.querySelector('.git-profile-gist-count').innerText = user.public_gists;
    profile.querySelector('.git-profile-avatar').style.backgroundImage = "url(" + user.avatar_url + ")";
}