callApiWorks()

// création du lien avec l api via fetch
// on récupère les données avec then et on utilise json
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {
        createButton(categories)
        let buttons = document.querySelectorAll('.category')
        // i = 0 si i est inférieur au nombre de catégorie alors on rajoute une catégorie 
        // jusqu'a ce que toutes les catégories soient mises
        for (let i = 0; i < buttons.length; i++){
            // permet d'dentitifer les noms des catégories dans chacun des boutons
            buttons[i].addEventListener('click', (event) => {
            // on associe les noms des catégories de chaque projet au noms des categories des boutons
            callApiWorks(event.target.textContent)     
            })    
        }
    }) 

function callApiWorks (filter) {
    fetch('http://localhost:5678/api/works')
    .then(response => response.json()) 
    .then(projects => {
    // si ça correspond filter et filter qui n'est pas égale à "tous" ont trie les projets en fonction du nom de la catégorie
    // sinon on met tout les projets ensemble
    const filteredProjects = filter && filter !== 'Tous' ? projects.filter(project => project.category.name === filter): projects
    createGallery(filteredProjects) 
    })
}

// on crée la fonction qui va afficher les images de la galerie
// on vide la galerie pour ne pas avoir les images qui s'accumulent grace 
// au innerHTML (qui permet de modifier le contenu du dom) et d'une
// chaine de caractère vide
function createGallery(project){ 
    document.querySelector('.gallery').innerHTML = '' 
    for (let i = 0; i < project.length; i ++) {
        const gallery = document.querySelector('.gallery')
        const cards = document.createElement ('figure')
        gallery.appendChild(cards)
        const image = document.createElement ('img')
        image.src = project[i].imageUrl
        cards.appendChild(image)
        const title = document.createElement ('figcaption')
        title.innerHTML = project[i].title
        cards.appendChild(title)
    }
}

function createButton(categories) {  //fonction qui crée les boutons
    const portfolio = document.querySelector('#portfolio')
    const divButton = document.createElement('div')
    divButton.classList.add('categories') 
    portfolio.appendChild(divButton) 
    const buttonAll = document.createElement('button')  //création du bouton "tous"
    buttonAll.textContent = "Tous"
    buttonAll.classList.add('category')
    divButton.appendChild(buttonAll)

    categories.forEach(category => { //création des 3 boutons différents
        const filtersButton = document.createElement('button')
        filtersButton.textContent = category.name
        filtersButton.classList.add('category')
        divButton.appendChild(filtersButton)
    })

    //permet de placer correctement la div divButton
    portfolio.insertBefore(divButton,portfolio.children[2]);  
}


// ******Affichage Editeur *****


displayPage();
function displayPage() {
    //***************************SI JE SUIS AUTHENTIFIE **************************
    if (localStorage.getItem("token") && localStorage.getItem("userId")) { 
        const login = document.getElementById("login");
        login.style.display = "none"; // je cache le bouton login avec le display none
        const logout = document.getElementById("logout");
        logout.style.display = "block"; // et je sort le bouton logout a la place avec le display block
        logout.addEventListener("click", function (event) { // des que je click sur logout 
        event.preventDefault();
        localStorage.clear(); // tout se vide et se reinitialise 
        displayPage();
    });

    const Modifier = document.querySelector(".Modifier"); //affiche le bouton modifier
    Modifier.style.display = "flex";
    
    const edition = document.querySelector(".edition"); //affiche la barre noir
    edition.style.display = "flex";

   

}
  //***************************SI JE NE SUIS PAS AUTHENTIFIE **************************
  else {
    const login = document.getElementById("login"); //j'affiche le bouton login
    login.style.display = "block";
    const logout = document.getElementById("logout"); //cache le bouton logout
    logout.style.display = "none";

    const Modifier = document.querySelector(".Modifier"); //cache le bouton modifier
    Modifier.style.display = "none";
    
    const edition = document.querySelector(".edition"); //cache la barre noir
    edition.style.display = "none";

   
  }
}

