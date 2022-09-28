//déclaration de la variable "produit dans le local storage", puis convertir les données au format JSON en objet JavaScript
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
// console.log(productInLocalStorage);

//----------------------------------Affichage des produits du panier---------------------------------------------------------
//sélection de la class où je vais intégrer le JS
const productDisplayCart = document.querySelector('#cart__items');
// console.log(productDisplayCart);
    //Si le panier est vide : affichage "Panier vide"
    if(productInLocalStorage === null){
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
        //déclaration d'une variable "Array" vide pour l'implantation de mon selecteur "j" a ma boucle ci-dessous
        let productStructureCart = [];
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

function deleteProduct(){

    let deleteBtn = document.querySelectorAll('.deleteItem');
    // console.log(deleteBtn);

    for (let k = 0 ; k < deleteBtn.length ; k++){
        deleteBtn[k].addEventListener("click", (event) => {
            event.preventDefault();
            console.log(event);
            

        //Sélection de l'id qui va etre supprimé grâce au bouton 
        let IdToDeleted = productInLocalStorage[k].productId;
        console.log(IdToDeleted);
        //Fonction de suppresion avec la méthode "filter"
        productInLocalStorage = productInLocalStorage.filter(el => el.productId !== IdToDeleted);
        console.log(productInLocalStorage);

        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            
        })
    }
}
deleteProduct();

//on a creer une fonction de suppression des article via la boucle "for", permettant de voir
// l'ID des éléments a supprimer dans la console, a faire la suite + total

// Total du panier

