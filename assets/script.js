callApiWorks();

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
            callApiWorks(event.target.textContent);     
            })    
        }
        const isAuth = localStorage.getItem('token') && localStorage.getItem('userId')
        if (isAuth) {
            displayAuthElements(buttons)
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
        createGalleryModal(projects) // affiche ma gallery dans ma modal
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
        console.log(project)
    }
}

function createButton(categories) {  //fonction qui crée les boutons
    const portfolio = document.querySelector('#portfolio')
    const divButton = document.createElement('div');
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
    portfolio.insertBefore(divButton,portfolio.children[1])  
}


// ******Affichage Editeur *****
function displayAuthElements() {

    createBlackBarEditionMode()
    createButtonEditProject()
    closeModal()
    addModal2()
    addProjectModal ()

    const login = document.getElementById('login')
    login.innerHTML = 'logout'   //creation du logout
    login.href = '#'

    login.addEventListener('click', function (event) { // des que je click sur logout 
        event.preventDefault(); 
        localStorage.clear(); // tout se vide et se reinitialise 
        location.reload(); 
        displayAuthElements();
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

const modal = document.querySelector('.modal');

// fonction qui crée le bouton modifier

function createButtonEditProject() {
    const editProject = document.querySelector('.edit-project'); //creation bouton modifier

    const iconPen2 = document.createElement("i"); //creation iconpen
    iconPen2.classList = "fa-solid fa-pen-to-square";
    iconPen2.setAttribute('id', 'icon-pen');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editProject.appendChild(iconPen2)
    editButton.innerText = 'modifier'; 
    editProject.appendChild(editButton);

    const btnFilters = document.querySelector('.categories'); //cache les boutons des filtres
    btnFilters.innerHTML = '' ;

    editButton.addEventListener('click', function () {  
        modal.style = 'display: flex';   
    })
    
}

function closeModal() {

    const closeButton = document.querySelector('.button-close-modal');
    closeButton.addEventListener('click', function () {
        modal.style = 'display: none';
    })
}

// ************************* MODAL *************************** //

const token = localStorage.getItem('token');
const galleryModal = document.querySelector('.gallery-modal');

function createGalleryModal(projects) {
    projects.forEach(projectModal => {
        
        const figure = document.createElement('figure');
        figure.classList.add('modal-picture');
        figure.dataset.id = projectModal.id;
        galleryModal.appendChild(figure);
        
        const img = document.createElement('img');
        figure.appendChild(img);
        
        const iconContainer = document.createElement('span');
        figure.appendChild(iconContainer);
        const trashIcon = document.createElement('i');
                    
        iconContainer.appendChild(trashIcon);
        img.src = projectModal.imageUrl;
        img.setAttribute('alt', projectModal.title);
        trashIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-stack-1x', 'tarsh');

        trashIcon.addEventListener('click', () => { 
            const id = figure.dataset.id;
            deleteProject(id, figure, trashIcon)
        })
        
    });
};

function deleteProject(id,figure,trashIcon) { //va permettre de supprimer les données du projets 
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:5678/api/works/${id}`, { 
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((reponse) => {
        if (reponse.status === 204) {
            trashIcon.remove(figure) 
          console.log("project deleted");
        } else {
          alert("project deletion error");
        }
      })
  }

const modal1 = document.querySelector('.modal-1');
const modal2 = document.querySelector('.modal-2');

function addModal2 () {
    const arrowIcon = document.querySelector('.button-left-modal');


    arrowIcon.addEventListener('click', function () {
        modal1.style = 'display:flex'
        modal2.style = 'display:none'
    })

    const btnAddPicture = document.querySelector('.button-add-picture');
    btnAddPicture.addEventListener('click', function () {
        modal1.style = 'display:none'
        modal2.style = 'display:flex'        
    })
}

const photoAdd = document.querySelector('.photo-add')
const formAdd = document.querySelector('.form-add')

function addProjectModal () {
    const photoIconModal = document.createElement('i');// AJout de l'icone 
    photoIconModal.innerHTML = '<i class="fa-sharp fa-regular fa-image sharpIcon"></i>';
    photoAdd.appendChild(photoIconModal);

    const addPhotoButton = document.createElement('button');// Ajout du bouton pour ajouter une photo
    addPhotoButton.type = 'button';
    addPhotoButton.classList.add('add-button');
    addPhotoButton.textContent = '+ Ajouter photo';
    photoAdd.appendChild(addPhotoButton);

    const addPhotoInput = document.createElement('input');// Ajout de l'input pour la photo
    addPhotoInput.type = 'file'; //p ermet de telecharger un fichier
    addPhotoInput.name = 'photo';
    addPhotoInput.style.display = 'none';
    photoAdd.appendChild(addPhotoInput);

    const addPhotoFormat = document.createElement('p'); // Ajout du format d'image
    addPhotoFormat.classList.add('addPhotoFormat');
    addPhotoFormat.textContent = "jpg, png : 4mo max";
    photoAdd.appendChild(addPhotoFormat);

    const titrePhoto = document.createElement('label');// Ajout de l'input pour le titre
    titrePhoto.textContent = 'Titre';
    formAdd.appendChild(titrePhoto);

    const titreInput = document.createElement('input');
    titreInput.type = 'text';
    titreInput.name = 'titre';
    formAdd.appendChild(titreInput);

    const categoriePhoto = document.createElement('label');// Ajout de l'input pour la catégorie
    categoriePhoto.textContent = 'Catégorie';
    formAdd.appendChild(categoriePhoto);

    const categorieSelect = document.createElement('select');
    categorieSelect.name = 'categorie';
    formAdd.appendChild(categorieSelect);

    const categorie1 = document.createElement('option');// Ajout des options de la catégorie
    categorie1.value = '1';
    categorie1.textContent = '1 - Objets';
    categorieSelect.appendChild(categorie1);

    const categorie2 = document.createElement('option');
    categorie2.value = '2';
    categorie2.textContent = '2 - Appartements';
    categorieSelect.appendChild(categorie2);

    const categorie3 = document.createElement('option');
    categorie3.value = '3';
    categorie3.textContent = '3 - Hotels & restaurants';
    categorieSelect.appendChild(categorie3);
}    