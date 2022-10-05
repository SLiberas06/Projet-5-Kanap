function dataApi(){
  const dataApi = fetch("http://localhost:3000/api/products");
  dataApi.then(async(resData)=>{

  let response = await resData.json();
  console.log(response);

  //déclaration de la variable "produit dans le local storage", puis convertir les données au format JSON en objet JavaScript
  let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
  console.log(productInLocalStorage);

//----------------------------------------------------------------Affichage des produits dans le panier---------------------------------------------------------

  //sélection de la class où je vais intégrer le JS
  const productDisplayCart = document.querySelector('#cart__items');
  // console.log(productDisplayCart);

  //déclaration d'une variable "Array" vide pour l'implantation de mon selecteur "j" a ma boucle ci-dessous
  let productStructureCart = [];  

  //déclarations des variables "array" vides pour l'implantation des prix et dans quantités
  let totalQuantity = [];
  let totalPrice = [];  

  //Si le panier est vide : affichage "Panier vide"
  if(productInLocalStorage === null || productInLocalStorage < [0]){
    const emptyCart = `
      <div class="container-empty-cart">
        <div> Le panier est vide </div>
      </div>
      <style> .container-empty-cart{
                text-align : center;
              }
      </style>`;
      productDisplayCart.innerHTML = emptyCart;
  }
        
  //si le panier n'est pas vide : afficher les produits stockés dans le local storage
  else{
              
      //boucle d'implatation des données du local storage dans les éléments HTML
      for ( j = 0; j < productInLocalStorage.length ; j++){
          //console.log(productInLocalStorage.length);
                   
          productStructureCart = productStructureCart + 
                  `<article class="cart__item" data-id="${productInLocalStorage[j].productId}" data-color="${productInLocalStorage[j].choiceColor}">
                      <div class="cart__item__img">
                        <img src="${productInLocalStorage[j].productImage}" alt="${productInLocalStorage[j].imageAlt}">
                      </div>
                      <div class="cart__item__content">
                        <div class="cart__item__content__description">
                          <h2>${productInLocalStorage[j].productName}</h2>
                    <p>Couleur : ${productInLocalStorage[j].choiceColor}</p>
                    <p>Prix unitaire : ${response[j].price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                          <div class="cart__item__content__settings__quantity">
                            <p>Quantité :  </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[j].quantity}" data-id="${productInLocalStorage[j].productId}" data-color="${productInLocalStorage[j].choiceColor}">
                          </div>
                          <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                          </div>
                        </div>
                      </div>
                    </article>`;
          
                  //Déclaration de variables pour changer le type string des prix en type number
                  let priceInNumber = parseInt(response[j].price * productInLocalStorage[j].quantity);
                  let quantityInNumber = parseInt(productInLocalStorage[j].quantity);

                  //On pousse les valeurs converties en nombres dans les variables Array plus haut
                  totalPrice.push(priceInNumber);
                  totalQuantity.push(quantityInNumber); 
                  console.log(totalPrice);

              }

              //Intégration du code HTML dans la page "Panier"
              if (j === productInLocalStorage.length){
                  productDisplayCart.innerHTML = productStructureCart;
              }
           
  }
          
//------------------------------------------------------------Affichage du prix total et de la quantité total----------------------------------------------

//Additionner les prix qui sont dans les variables totalQuantity et totalPrice avec la méthode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;

//Résultat du total quantités d'aricles
const totalQuantityCart = totalQuantity.reduce(reducer, 0);
      console.log(totalQuantityCart);

//Résultat du total prix d'arcticles
const totalPriceCart = totalPrice.reduce(reducer, 0);
      console.log(totalPriceCart);

//Afficher le prix total et la quantité total dans articles dans le panier, en l'intégrant en HTML
//Sélection de l'emplacement HTML pour le total prix produits
const displayTotalPrice = document.querySelector('#totalPrice');
      displayTotalPrice.innerHTML = `${totalPriceCart}`;

//Sélection de l'emplacement HTML pour le total quantités produits
const displayTotalQuantity = document.querySelector('#totalQuantity');
      displayTotalQuantity.innerHTML = `${totalQuantityCart}`;
   
//-----------------------------------------------------------Gestion du bouton supprimer l'article---------------------------------------------------------

//Sélection des références des boutons "Supprimer" 
let deleteBtn = document.querySelectorAll('.deleteItem');
// console.log(deleteBtn);

//Boucle de suppression des produits au click en référece de l'id du produit
for (let k = 0 ; k < deleteBtn.length ; k++){
      deleteBtn[k].addEventListener("click", (event) => {
        event.preventDefault();
              console.log(event);

        //Sélection du produit par son id et son option couleur qui va etre supprimé grâce au bouton 
        let IdToDeleted = productInLocalStorage[k].productId + productInLocalStorage[k].choiceColor;

        //déclaration d'une variable d'alerte de suppression du produit avec les références du produit : nom et couleur.
        let alertDeleteProduct = productInLocalStorage[k].productName + " " + productInLocalStorage[k].choiceColor + " " ;
            console.log(IdToDeleted);

        //Fonction de suppresion avec la méthode "filter"
        productInLocalStorage = productInLocalStorage.filter(el => el.productId + el.choiceColor !== IdToDeleted && el.productName !== alertDeleteProduct);
            console.log(productInLocalStorage);
                
        //Ajouter le produit à supprimer dans le local storage
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
              
        //alerte pour avertir que le produit à été suprimé du panier
        alert(alertDeleteProduct+ 'a été supprimé du panier');

        //raffraichir le panier après suppression du produit
        window.location.href ="cart.html";
      });
}

//--------------------------------------------------Fonction modification Quantité produit---------------------------------------------------------------------

  function modifQuantity() {

    //Sélection de l'élément "input" pour le choix de la quantité 
    let inputModify = document.querySelectorAll('.itemQuantity');

    //Boucle de modification des produits au changement de l'input en référece de l'id du produit
    for (let m = 0 ; m < inputModify.length ; m++){
            inputModify[m].addEventListener("change", (event) => {
              event.preventDefault();
                    console.log(event);

              //Déclaration de variables prix/quantité + valeur de l'input
              let quantityModif = (productInLocalStorage[m].quantity * productInLocalStorage[m].productPrice);
              let quantityValue = inputModify[m].valueAsNumber;
              let idToModif = productInLocalStorage[m].productId + productInLocalStorage[m].choiceColor;

              //Fonction de modification avec la méthode "find"
              const newQuantity = productInLocalStorage.find((el) => el.quantityValue !== quantityModif && el.productId + el.choiceColor === idToModif);
                  // console.log(newQuantity);

                  //La quantité de la constante newQuantity devient la valeur modifiée de l'input
                  newQuantity.quantity = quantityValue;
                  console.log(newQuantity);


                  //La quantité du produit dans le local Storage devient la nouvelle quantité
                  productInLocalStorage[m].quantity = newQuantity.quantity;
                  console.log(productInLocalStorage[m].quantity);

                  // totalPrice.push(quantityModif);
                  // totalQuantity.push(productInLocalStorage[m].quantity);
                  // console.log(totalQuantity);

                  // //Additionner les prix qui sont dans les variables totalQuantity et totalPrice avec la méthode reduce
                  // const reducer = (accumulator, currentValue) => accumulator + currentValue;

                  // //Calcul de prix total et quantité totale
                  // const modifTotalPrice = totalPrice.reduce(reducer, 0);
                  // console.log(modifTotalPrice);

                  // //Condition, si on a un affichage prix & un affichage quantité, alors les nouvelles valeurs sont injectés dans le HTML
                  // if(displayTotalQuantity.innerHTML && displayTotalPrice.innerHTML){
                  //   displayTotalQuantity.innerHTML = `${productInLocalStorage[m].quantity}`;
                  //   displayTotalPrice.innerHTML = `${totalPriceCart}`;
                  // }
                  // else{
                  //   return("error");
                  // }
                      
                  //Ajouter l'option "change" de la quantité dans le local storage
                  localStorage.setItem("product", JSON.stringify(productInLocalStorage));

                  //Rafraîchir la page 
                  location.reload();
                  
            });
    }
  }
  modifQuantity();
  })
}
dataApi();  

