
// creation du lien avec l api via fetch
// on recupere les données avec then et on utilise json
fetch('http://localhost:5678/api/works')
    .then(response => response.json()) 
    .then(data => {
        gallery(data)
    })

// fonction qui va afficher les images de la galerie
function gallery(data){
    for (let i = 0; i < data.length; i ++) {
        const gallery = document.querySelector('.gallery')
        const cards = document.createElement ('figure')
        gallery.appendChild(cards) 
        const image = document.createElement ('img')
        image.src = data[i].imageUrl
        cards.appendChild(image) 
        const title = document.createElement ('figcaption')
        title.innerHTML = data[i].title
        cards.appendChild(title)
    }}

