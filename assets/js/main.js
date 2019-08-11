class gitRepos {
  constructor(user) {
    this.user = user;
    this.init();
  }

  init() {
    let container = document.querySelector(".repos");

    const ApiUrl = `https://api.github.com/users/${
      this.user
    }/repos?client_id=aeb5f86067832f6d67af&client_secret=ab8dd96efdbcf6865e004581a2a2fe7821f3475d`;

    fetch(ApiUrl)
      .then(response => response.json())
      .then(data => {
        this.data = data;
        this.printRepos(data);
      })
      .catch(err => console.log(`oh no!! ${err}`));

    this.addEventListeners();
  }

  //filter only in name
  filterRepos(search) {
    let output;
    if (search == "") {
      output = this.data;
    } else {
      output = this.data.filter(repo => {
        return repo.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    this.printRepos(output);
  }

  addEventListeners() {
    document.querySelector("input").addEventListener("input", event => {
      const search = event.target.value;
      this.filterRepos(search);
    });
  }

  printRepos(repos) {
    console.log(repos);
    const container = document.querySelector(".repos");
    const timeCont = document.querySelector(".time");
    const today = new Date();
    const time = `${(today.getHours() < 10 ? "0" : "") +
      today.getHours()} : ${(today.getMinutes() < 10 ? "0" : "") +
      today.getMinutes()}`;
    const html = repos
      .map(function(repo) {
        const { name, html_url, description, has_pages, language } = repo;
        return `
      <div class="card">
      <h3>${name}</h3>
      <p>${description}</p>
      <p>${language}</p>
      </div>`;
      })
      .join("");
    timeCont.innerHTML = time;
    container.innerHTML = html;
  }
}

const PanniGit = new gitRepos("pannisimai");
