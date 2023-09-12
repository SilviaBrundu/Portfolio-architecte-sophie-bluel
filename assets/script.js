
// creation du lien avec l api via fetch
// on recupere les données avec then et on utilise json
callApiWorks()

fetch('http://localhost:5678/api/categories')
    .then(response => response.json()) 
    .then(categories => {
        createButton(categories)
        const buttons = document.querySelectorAll('.categories')
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener('click', (event) => {
            callApiWorks(event.target.textContent)
            })
        }
        //console.log(categories)
    }) 

function callApiWorks (filter) {
    fetch('http://localhost:5678/api/works')
    .then(response => response.json()) 
    .then(projects => {
       //console.log(filter)
        //console.log(projects)
    const filteredProjects = filter && filter !== 'Tous' ? projects.filter(project => project.category.name === filter): projects
    createGallery(filteredProjects)
    })
}

// fonction qui va afficher les images de la galerie
function createGallery(project){
    //console.log(project)
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

//fonction qui crée les boutons
function createButton(categories) {
    const portfolio = document.querySelector('#portfolio')
    const divButton = document.createElement('div')
    divButton.classList.add('all') 
    portfolio.appendChild(divButton) 
    const buttonAll = document.createElement('button')  //création bouton "tous"
    buttonAll.textContent = "Tous"
    buttonAll.classList.add('categories')
    divButton.appendChild(buttonAll)

    categories.forEach( category => { //création des 3 boutons différents
        const filtersButton = document.createElement('button')
        filtersButton.textContent = category.name
        filtersButton.classList.add('categories')
        divButton.appendChild(filtersButton)
    })

    portfolio.insertBefore(divButton,portfolio.children[1]); //permet de placer correctement la div button 
}



