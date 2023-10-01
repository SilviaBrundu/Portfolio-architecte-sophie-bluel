const login = document.querySelector('#login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.getElementById('error')

login.addEventListener('submit', function (event) {//création evenement type submit
  event.preventDefault(); // permet de retirer l'envoie du formulaire par default
  const loginId = { email: email.value, password: password.value,};
  //if (!email.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) { // valider une adresse mail en imposant
  //  return false;                                                                                   // des caracteres speciaux etc
  //}

  fetch("http://localhost:5678/api/users/login", { 
    method: 'POST',//je modifie le comportement par default et passe de get a post
    headers: { 'Content-type' : 'application/json' },
    body: JSON.stringify(loginId), // stringify permet de convertir un object en une chaine de caractere
  })

  .then((response) => {// conditions qui affichent les messages d erreurs 
    console.log(response);
    if (response.status === 404)
      error.innerHTML = 'User Not Found'
    if (response.status === 401)
      error.innerHTML = 'Not Authorized'
    if (response.status === 200) {
      return response.json();
    }
  })

  .then((data) => { // - récuperer les données , userId et token
    if (data) { //je crée ma condition qui affichera la page d'accueil si jai recuperé les données
      localStorage.setItem('userId', data.userId); // localStorage permet d'enregistrer les paires clé/valeur dans le navigateur.
      localStorage.setItem('token', data.token);
      location.href = 'index.html'; //redirige vers la page d 'accueil
    }
  })

})