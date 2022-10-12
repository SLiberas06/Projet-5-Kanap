//FONCTION DE CALCUL DE NUMERO ALEATOIRE POUR lE NUMERO DE COMMANDE
function displayOrderNumber (){

    //SELECTION DE L'ELEMENT DANS LE DOM
    const orderId = document.querySelector("#orderId");
    
    //Intégration de l'identifiant de commande dans le DOM via 
    orderId.textContent = localStorage.getItem("orderId");

    //on vide le local storage
    localStorage.clear();

}
displayOrderNumber();
