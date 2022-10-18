//Fonction de recuperation du numéroi de commande
function displayOrderNumber() {
  //Paramétrage de récupération de l'id dans l'URL de la page "produits"
  const params = new URLSearchParams(window.location.search);

  //recuperation de l'id de commande dans l'url
  const getId = params.get("orderId");

  //Selection de l'element dans le DOM
  const orderId = document.getElementById("orderId");

  //Intégration de l'identifiant de commande dans le DOM via urlSearchParams
  orderId.textContent = getId;

  //on vide le local storage
  localStorage.clear();
}
displayOrderNumber();
