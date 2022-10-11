//FONCTION DE CALCUL DE NUMERO ALEATOIRE POUR lE NUMERO DE COMMANDE
function displayOrderNumber (min, max){
    min = 900;
    max = 9000;
   return Math.floor(Math.random()* (max - min + 1)) + min ;
}
// console.log(displayOrderNumber());

//SELECTION DE L'ELEMENT DANS LE DOM
const orderId = document.querySelector("#orderId");

    //INTEGRATION DU NUMERO DE COMMANDE ALEATOIRE
    orderId.textContent = "000000" + displayOrderNumber();
    // console.log(orderId);