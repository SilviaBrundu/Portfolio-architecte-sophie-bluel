
// - crée un evenement submit de la section login ************
// - recuperer l'api (avec fetch) **************
// - crée des conditions et afficher les messages d erreurs **************
// - récuperer les données , userId et token


const login = document.querySelector("#login");

//création evenement type submit
login.addEventListener("submit", function () {

  fetch("http://localhost:5678/api/users/login")
    // conditions qui affichent les messages d erreurs 
    .then((response) => {
    console.log(response);
      if (response.status == 404)
        alert("User not found");
      if (response.status == 401)
        alert("Not Authorized");
      if (response.status == 200) {
        return response.json();
      }
    })

    // je recupere les données
    .then((data) => {
        //je crée ma condition qui affichera la page d'accueil si jai recuperé les données
      if (data) {
        // localStorage permet d'enregistrer les paires clé/valeur dans le navigateur.
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        //redirige vers la page d 'accueil
        location.href('./index.html')
      }
    })

    
})