
// creation du lien avec l api via fetch
// on recupere les données avec then et on utilise json
fetch('http://localhost:5678/api/works')
    .then(response => response.json()) 
    .then(project => {
        createGallery(project)
        //createGallery(data.filter(project => project.category.name==="Objets"))
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


