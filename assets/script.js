callApiWorks()

// création du lien avec l api via fetch
// on récupère les données avec then et on utilise json
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(categories => {
        createButton(categories)
        const buttons = document.querySelectorAll('.category')
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
    portfolio.insertBefore(divButton,portfolio.children[1]);  
}



