//déclaration de la variable "produit dans le local storage", puis convertir les données au format JSON en objet JavaScript
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
// console.log(productInLocalStorage);

//-------------------------------------------------Affichage des produits dans le panier---------------------------------------------------------
//sélection de la class où je vais intégrer le JS
const productDisplayCart = document.querySelector('#cart__items');
// console.log(productDisplayCart);

//déclaration d'une variable "Array" vide pour l'implantation de mon selecteur "j" a ma boucle ci-dessous
let productStructureCart = [];

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
        for (j = 0; j < productInLocalStorage.length; j++){
            // console.log(productInLocalStorage.length);
            productStructureCart = productStructureCart + `<article class="cart__item" data-id="${productInLocalStorage[j].productId}" data-color="${productInLocalStorage[j].choiceColor}">
            <div class="cart__item__img">
              <img src="${productInLocalStorage[j].productImage}" alt="${productInLocalStorage[j].imageAlt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${productInLocalStorage[j].productName}</h2>
                <p>${productInLocalStorage[j].choiceColor}</p>
                <p>${productInLocalStorage[j].productPrice} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : ${productInLocalStorage[j].quantity} </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[j].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
        }
        //Intégration du code HTML dans la page "Panier"
        if (j === productInLocalStorage.length){
            productDisplayCart.innerHTML = productStructureCart;
        }
    }
//--------------------------------------------------Gestion du bouton supprimer l'article---------------------------------------------------------
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

//---------------------------------------------------------Total du panier----------------------------------------------------------------------------------------
//Fonction calcule du montant total dans le panier et de la quantité total d'article
function prixTotal(){
  
  //Déclaration de la variable pour mettre les prix qui sont présent dans le panier
  let prixTotalCalcul = [];

  //Récuperer les prix qui sont dans le panier
  for (let l = 0 ; l < productInLocalStorage.length ; l++){
    let priceProductToCart = productInLocalStorage[l].productPrice;

  //Intégrer les prix à la variable "prixTotalCalcul" sous forme de tableau/array
  prixTotalCalcul.push(priceProductToCart);
    console.log(prixTotalCalcul);
  }

//Additionner les prix qui sont dans la variable prixTotalCalcul avec la méthode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = prixTotalCalcul.reduce(reducer, 0);
console.log(totalPrice);

//Afficher le prix total et la quantité total dans articles dans le panier, en l'intégrant en HTML
//Déclaration de l'emplacement HTML pour le total et les quantités produits
const displayTotalPrice = document.querySelector('#totalPrice');
  displayTotalPrice.innerHTML = `${totalPrice}`;
}
prixTotal();

//-------------------------------------Modifier la quantité d'un produit dans le panier----------------------------------------------------------
function modifierQuantity(){
  let quantityModif = setAttribute('itemQuantity','42');//ici peut etre les paramettres a modifier pour faire la fonction

  for ( let m = 0 ; m < quantityModif.length ; m++){
    quantityModif[m].addEventListener('change',(event)=>{
      event.preventDefault();

      let quantityProduct = productInLocalStorage[m].quantity;
      let modifQuantity = quantityModif[m].choiceColor;

      const choiceQuantity = productInLocalStorage.find((el) => el.modifQuantity !== quantityProduct);
            choiceQuantity.quantity = modifQuantity;
      
      productInLocalStorage[m].quantity = choiceQuantity.quantity;

      localStorage.setItem("product", JSON.stringify(productInLocalStorage));

      location.reload();
    })
  
    
  }
}
modifierQuantity();
// modifier les qualités produit dans le paniers