// creation du lien avec l api via fetch
// on recupere les données avec then et on utilise json
fetch('http://localhost:5678/api/works')
    .then(response => response.json()) 
    .then(project => {
        createGallery(project)
    })

fetch('http://localhost:5678/api/categories')
    .then(response => response.json()) 
    .then(categories => {
        createButton(categories)
        console.log(categories)
    }) 
  

// fonction qui va afficher les images de la galerie
function createGallery(project){
    const filters = []
    for (let i = 0; i < project.length; i ++) {
        if (!filters.includes(project[i].category.name)){ //creation des 3 category, le "!" inverse une condition
            filters.push(project[i].category.name)
        } 
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
    console.log(filters)
}

//fonction qui crée les boutons
function createButton(categories) {
    const divButton = document.createElement('div') //création bouton "tous"
    document.querySelector('#portfolio').appendChild(divButton) 
    const buttonAll = document.createElement('button')
    buttonAll.textContent = "Tous"
    divButton.appendChild(buttonAll)

    categories.forEach( category => { //création des 3 boutons différents
        const filtersButton = document.createElement('button')
        filtersButton.textContent = category.name
        divButton.appendChild(filtersButton)
    })
}



