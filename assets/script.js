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
        const isAuth = localStorage.getItem('token') && localStorage.getItem('userId')
        if (isAuth) {
            displayAuthElements(buttons);
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
    buttonAll.textContent = 'Tous'
    buttonAll.classList.add('category')
    divButton.appendChild(buttonAll)


    categories.forEach(category => { //création des 3 boutons différents
        const filtersButton = document.createElement('button')
        filtersButton.textContent = category.name
        filtersButton.classList.add('category')
        divButton.appendChild(filtersButton)
    })

    //permet de placer correctement la div divButton
    portfolio.insertBefore(divButton,portfolio.children[1]);  
}


// ******Affichage Editeur *****
function displayAuthElements() {
    const login = document.getElementById('login');
    login.innerHTML= 'logout'   //creation du logout
    login.href = '#'

    createBlackBarEditionMode();
    createButtonEditProject();

    login.addEventListener('click', function (event) { // des que je click sur logout 
        event.preventDefault(); 
        localStorage.clear(); // tout se vide et se reinitialise 
        location.reload(); 
        displayAuthElement();
    })
}

// fonction qui crée la barre noire

function createBlackBarEditionMode() {

    const editBlackbar = document.createElement('div'); 
    editBlackbar.classList.add('edit-blackbar');
    document.body.appendChild(editBlackbar);  

    const edition = document.createElement('div');
    edition.classList.add('edition');
    editBlackbar.appendChild(edition);

    const iconPen = document.createElement("i"); //creation iconpen
    iconPen.classList = "fa-solid fa-pen-to-square";
    iconPen.setAttribute('id', 'icon-pen-edit-mode');

    const editionModeBtn = document.createElement('button');// creation bouton mode edition
    editionModeBtn.classList.add('edition-mode-button');
    editionModeBtn.innerText = 'Mode édition';
    edition.appendChild(iconPen)
    edition.appendChild(editionModeBtn);

    document.body.insertBefore(editBlackbar,document.body.children[0]);//place la div ou je veut dans le dom
}

// fonction qui crée le bouton modifier

function createButtonEditProject () {
    const editProject = document.querySelector('.edit-project') //creation bouton modifier

    const iconPen2 = document.createElement("i"); //creation iconpen
    iconPen2.classList = "fa-solid fa-pen-to-square";
    iconPen2.setAttribute('id', 'icon-pen');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editProject.appendChild(iconPen2)
    editButton.innerText = 'Modifier'; 
    editProject.appendChild(editButton);

    const btnFilters = document.querySelector('.categories'); //cache les boutons des filtres
    btnFilters.innerHTML = '' ;
}

