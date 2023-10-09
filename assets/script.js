const modal = document.querySelector('.modal');
const blackBackground = document.querySelector('.black-background');

callApiWorks();

fetch('http://localhost:5678/api/categories')// création du lien avec l api via fetch
.then(response => response.json())// on récupère les données avec then et on utilise json
.then(categories => {
    createButton(categories)
    let buttons = document.querySelectorAll('.category')
    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', (event) => {// permet d'dentitifer les noms des catégories dans chacun des boutons
        callApiWorks(event.target.textContent); // on associe les noms des catégories de chaque projet au noms des categories des boutons    
        })    
    }
    const isAuth = localStorage.getItem('token') && localStorage.getItem('userId')
    if (isAuth) {
        displayAuthElements(buttons)
    }
})
.catch(error => {
    console.log(error)
    alert('une erreur est survenue')
});

function callApiWorks(filter){
    fetch('http://localhost:5678/api/works')
    .then(response => response.json()) 
    .then(projects => {
        // si ça correspond filter et filter qui n'est pas égale à "tous" ont trie les projets en fonction du nom de la catégorie
        // sinon on met tout les projets ensemble
        const filteredProjects = filter && filter !== 'Tous' ? projects.filter(project => project.category.name === filter): projects
        createGallery(filteredProjects) 
        createGalleryModal(projects) // affiche ma gallery dans ma modal
    })
    .catch(error => {
        console.log(error)
        alert('une erreur est survenue')
    });  
}

function createGallery(project){ // on crée la fonction qui va afficher les images de la galerie
    document.querySelector('.gallery').innerHTML = ''// on vide la galerie pour ne pas avoir les images qui s'accumulent

    for (let i = 0; i < project.length; i ++) {
        const gallery = document.querySelector('.gallery')
        const cards = document.createElement('figure')
        gallery.appendChild(cards)

        const image = document.createElement('img')
        image.src = project[i].imageUrl
        image.setAttribute('alt', project[i].title);
        cards.appendChild(image)

        const title = document.createElement('figcaption')
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

    portfolio.insertBefore(divButton,portfolio.children[1])  //permet de placer correctement la div divButton
}

// *******************$* Affichage Editeur ************************ //

function displayAuthElements() {
    createBlackBarEditionMode()
    createButtonEditProject()
    closeModal()
    addModal2()
    addProjectModal ()

    const login = document.getElementById('login')
    login.innerHTML = 'logout'   //creation du logout
    login.href = '#'

    login.addEventListener('click', function(event) { // des que je click sur logout 
        event.preventDefault(); 
        localStorage.clear(); // tout se vide et se reinitialise 
        location.reload(); 
        displayAuthElements();
    })
}

function createBlackBarEditionMode() {// fonction qui crée la barre noire
    const editBlackbar = document.createElement('div'); 
    editBlackbar.classList.add('edit-blackbar');
    document.body.appendChild(editBlackbar);  

    const edition = document.createElement('div');
    edition.classList.add('edition');
    editBlackbar.appendChild(edition);

    const iconPen = document.createElement('i'); //creation iconpen
    iconPen.classList = 'fa-solid fa-pen-to-square';
    iconPen.setAttribute('id', 'icon-pen-edit-mode');

    const editionModeBtn = document.createElement('button');// creation bouton mode edition
    editionModeBtn.classList.add('edition-mode-button');
    editionModeBtn.innerText = 'Mode édition';
    edition.appendChild(iconPen)
    edition.appendChild(editionModeBtn);

    document.body.insertBefore(editBlackbar,document.body.children[0]);//place la div ou je veut dans le dom
}

function createButtonEditProject() {// fonction qui crée le bouton modifier
    const editProject = document.querySelector('.edit-project'); //creation bouton modifier

    const iconPen2 = document.createElement('i'); //creation iconpen
    iconPen2.classList = 'fa-solid fa-pen-to-square';
    iconPen2.setAttribute('id', 'icon-pen');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editProject.appendChild(iconPen2)
    editButton.innerText = 'modifier'; 
    editProject.appendChild(editButton);

    const btnFilters = document.querySelector('.categories'); //cache les boutons des filtres
    btnFilters.innerHTML = '' ;

    editButton.addEventListener('click', function() {  
        modal.style = 'display: flex'; 
        blackBackground.style = 'display: flex';  
    })
}

function closeModal() {
    const closeButtons = document.querySelectorAll('.button-close-modal')
    for (i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', function () {
        modal1.style ='display: none'
        modal2.style ='display: none'
        blackBackground.style ='display: none'
        });
    }
};

// ************************* MODAL *************************** //

const token = localStorage.getItem('token');
const galleryModal = document.querySelector('.gallery-modal');
const modal1 = document.querySelector('.modal-1');
const modal2 = document.querySelector('.modal-2');
const arrowIcon = document.querySelector('.button-left-modal');
const photoAdd = document.querySelector('.photo-add');
const formAdd = document.querySelector('.form-add');
const validation = document.querySelector('.button-validation');
const errorDelete = document.querySelector('#error-delete')

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

function deleteProject(id,figure) { //va permettre de supprimer les données du projets 
    fetch(`http://localhost:5678/api/works/${id}`, { 
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((reponse) => {
        if (reponse.status === 204) {
            figure.remove()
            document.querySelector('.gallery figure').remove()
            console.log('projet supprimé');
        }
    })
    .catch(error => {
        console.log(error)
        errorDelete.innerText = 'erreur dans la suppression du projet';
    });  
}

function addModal2() {
    arrowIcon.addEventListener('click', function() {
        modal1.style = 'display:flex'
        modal2.style = 'display:none'
    })

    const btnAddPicture = document.querySelector('.button-add-picture');
    btnAddPicture.addEventListener('click', function() {
        modal1.style = 'display:none'
        modal2.style = 'display:flex'        
    })
}

function addProjectModal() {
    const divAddPhoto = document.createElement('div');
    divAddPhoto.setAttribute('class', 'divAddPhoto');
    photoAdd.appendChild(divAddPhoto)

    const photoIconModal = document.createElement('i');// AJout de l'icone 
    photoIconModal.classList.add('fa-sharp', 'fa-regular', 'fa-image', 'sharpIcon');
    photoAdd.appendChild(photoIconModal);

    const addPhotoButton = document.createElement('button');// Ajout du bouton pour ajouter une photo
    addPhotoButton.type = 'button';
    addPhotoButton.setAttribute('id','add-button');
    addPhotoButton.textContent = '+ Ajouter photo';
    photoAdd.appendChild(addPhotoButton);

    const addPhotoInput = document.createElement('input');// Ajout de l'input pour la photo
    addPhotoInput.type = 'file'; //permet de telecharger un fichier
    addPhotoInput.name = 'image';
    addPhotoInput.accept = '.jpg, .jpeg, .png';
    addPhotoInput.setAttribute('id','input-file')
    photoAdd.appendChild(addPhotoInput);

    addPhotoInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (event) { // lorsque le fichier a etait telecharger on effectuer la fonction suivante 
                const img = document.createElement('img');
                img.setAttribute('src', event.target.result);//nous pouvons accéder aux propriétés et attributs de l'élément img.
                img.classList.add('img-preview');
                photoIconModal.style.display = 'none';
                addPhotoInput.style.display = 'none';
                addPhotoButton.style.display = 'none';
                addPhotoFormat.style.display = 'none';
                divAddPhoto.appendChild(img);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

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
    titreInput.setAttribute('id','title-photo')
    formAdd.appendChild(titreInput);

    const categoriePhoto = document.createElement('label');// Ajout de l'input pour la catégorie
    categoriePhoto.textContent = 'Catégorie';
    formAdd.appendChild(categoriePhoto);

    const categorieSelect = document.createElement('select');
    categorieSelect.name = 'categorie';
    categorieSelect.setAttribute('id','category-photo');
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

const uploadForm = document.getElementById('upload-form')
const errorMessage = document.getElementById('error-message')
const gallery = document.querySelector('.gallery')
let imagesProject= []

uploadForm.addEventListener('submit', function (event) { // evenement submit dans le formulaire
    event.preventDefault();
    const titlePhoto = document.getElementById('title-photo').value;  
    const categoryPhoto = document.getElementById('category-photo').value; 
    const filePhoto = document.getElementById('input-file').files[0]; 

    const data = new FormData();  // On ajoute les données du formulaire en tant que paire clé/value.

    data.append('image',filePhoto);
    data.append('title',titlePhoto);
    data.append('category',categoryPhoto);

    if (!titlePhoto || !categoryPhoto || !filePhoto) { //message d erreur si tout les champs ne sont pas rempli
        errorMessage.innerText = 'Veuillez compléter les champs du formulaire';
        errorMessage.style.display = 'block';
        return;
    }

    fetch('http://localhost:5678/api/works', {
          method:'POST', 
          headers:{'Authorization': 'Bearer '+token},
          body: data
    })
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data)
        imagesProject.push(data)  // les photos sont ajoutées avec push() dans notre tableau 'imagesProject'.
        uploadForm.reset() // remet le formulaire a zero 
        modal2.style.display = 'none' // on ferme la modal
        blackBackground.style = 'display: none'; // on enleve le fond sombre
        gallery.innerHTML += `
        <figure>
        <img src='${data.imageUrl}' alt='${data.title}'>
        <figcaption>${data.title}</figcaption>
        <figure> `
        galleryModal.innerHTML += `
        <figure>
        <img src='${data.imageUrl}' alt='${data.title}'>
        </figure>
         `
    })  
    .catch(error => {
        console.error(error);
        errorMessage.style.display = "block";
    });  

})
        