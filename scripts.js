let database = [];
const correctUsername = "243865";
const correctPassword = "Puppenhaus89";

document.addEventListener('DOMContentLoaded', () => {
    loadDatabase();
});

function loadDatabase() {
    fetch('Archiv.json')
        .then(response => response.json())
        .then(data => {
            database = data;
        });
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        document.getElementById('loginContainer').style.display = 'none';
        showList();
    } else {
        alert('Username oder Passwort ist falsch!');
    }
}

function showList() {
    const content = document.getElementById('content');
    
    content.innerHTML = `<input type="text" id="searchBox" placeholder="Suche...">
                         <button onclick="filterList()">Suchen</button>`;

    for (let article of database) {
        content.innerHTML += `
            <div class="article" onclick="showArticle('${article.Kürzel}')">
                <span>${article.Kürzel}</span>
                <span>${article.Titel}</span>
            </div>`;
    }
}

function showArticle(kurzel) {
    const article = database.find(a => a.Kürzel === kurzel);

    const content = document.getElementById('content');
    content.innerHTML = `
        <button onclick="showList()">Zurück</button>
        <h1 style="color: black; font-weight: bold;">${article.Titel}</h1>
        <p>${article.Text}</p>
        <p>${article.Kürzel}</p>
        <img src="${article.Bild1}" alt="Bild 1">
        <img src="${article.Bild2}" alt="Bild 2">
        <img src="${article.Bild3}" alt="Bild 3">`;
}

function filterList() {
    const value = document.getElementById('searchBox').value;

    const filteredArticles = database.filter(a => 
        a.Kürzel.includes(value) || 
        a.Titel.toLowerCase().includes(value.toLowerCase())
    );

    const content = document.getElementById('content');
    content.innerHTML = `<input type="text" id="searchBox" value="${value}" placeholder="Suche...">
                         <button onclick="filterList()">Suchen</button>`;

    for (let article of filteredArticles) {
        content.innerHTML += `
            <div class="article" onclick="showArticle('${article.Kürzel}')">
                <span>${article.Kürzel}</span>
                <span>${article.Titel}</span>
            </div>`;
    }
}
