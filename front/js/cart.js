//déclaration de la variable "produit dans le local storage", puis convertir les données au format JSON en objet JavaScript
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

function productById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      console.log("erreur: " + err);
    })
    .then(function (response) {
      return response;
    });
}

//----------------------------------------------------------------Affichage des produits dans le panier---------------------------------------------------------
async function getDetailToCart() {
  //sélection de la class où je vais intégrer le JS
  const productDisplayCart = document.getElementById("cart__items");
  // console.log(productDisplayCart);

  //déclaration d'une variable "Array" vide pour l'implantation de mon selecteur "j" a ma boucle ci-dessous
  let productStructureCart = [];

  //déclarations des variables "array" vides pour l'implantation des prix et dans quantités
  let totalQuantity = [];
  let totalPrice = [];

  //Si le panier est vide : affichage "Panier vide"
  if (productInLocalStorage === null || productInLocalStorage < [0]) {
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
  else {
    //boucle d'implatation des données du local storage dans les éléments HTML
    for (j = 0; j < productInLocalStorage.length; j++) {
      const products = await productById(productInLocalStorage[j].productId);

      productStructureCart.push(
        `<article class="cart__item" data-id="${productInLocalStorage[j].productId}" data-color="${productInLocalStorage[j].choiceColor}">
                                      <div class="cart__item__img">
                                        <img src="${productInLocalStorage[j].productImage}" alt="${productInLocalStorage[j].imageAlt}">
                                      </div>
                                      <div class="cart__item__content">
                                        <div class="cart__item__content__description">
                                          <h2>${productInLocalStorage[j].productName}</h2>
                                    <p>Couleur : ${productInLocalStorage[j].choiceColor}</p>
                                    <p>Prix unitaire: ${products.price} €</p>
                                        </div>
                                        <div class="cart__item__content__settings">
                                          <div class="cart__item__content__settings__quantity">
                                            <p>Quantité :  </p>
                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[j].quantity}">
                                          </div>
                                          <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                          </div>
                                        </div>
                                      </div>
                                    </article>`
      );

      //Déclaration de variables pour changer le type string des prix en type number
      let priceInNumber = parseInt(
        products.price * productInLocalStorage[j].quantity
      );

      let quantityInNumber = parseInt(productInLocalStorage[j].quantity);

      //On pousse les valeurs converties en nombres dans les variables Array plus haut
      totalPrice.push(priceInNumber);
      console.log(totalPrice);

      totalQuantity.push(quantityInNumber);

      //Intégration du code HTML dans la page "Panier"
      if (j <= productInLocalStorage.length) {
        productDisplayCart.innerHTML = productStructureCart;
        calculTotalCart();
        modifQuantity();
      }
    }
  }

  //------------------------------------------------------------Affichage du prix total et de la quantité total----------------------------------------------
  async function calculTotalCart() {
    //Additionner les prix qui sont dans les variables totalQuantity et totalPrice avec la méthode reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    //Résultat du total quantités d'aricles
    const totalQuantityCart = await totalQuantity.reduce(reducer, 0);

    //Résultat du total prix d'arcticles
    const totalPriceCart = await totalPrice.reduce(reducer, 0);

    //Afficher le prix total et la quantité total dans articles dans le panier, en l'intégrant en HTML
    //Sélection de l'emplacement HTML pour le total prix produits
    const displayTotalPrice = document.getElementById("totalPrice");
    displayTotalPrice.innerHTML = totalPriceCart;

    //Sélection de l'emplacement HTML pour le total quantités produits
    const displayTotalQuantity = document.getElementById("totalQuantity");
    displayTotalQuantity.innerHTML = totalQuantityCart;
  }

  //-----------------------------------------------------------Gestion du bouton supprimer l'article---------------------------------------------------------

  //Sélection des références des boutons "Supprimer"
  let deleteBtn = document.querySelectorAll(".deleteItem");

  //Boucle de suppression des produits au click en référece de l'id du produit
  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener("click", (event) => {
      event.preventDefault();

      //Sélection du produit par son id et son option couleur qui va etre supprimé grâce au bouton
      let IdToDeleted =
        productInLocalStorage[k].productId +
        productInLocalStorage[k].choiceColor;

      //déclaration d'une variable d'alerte de suppression du produit avec les références du produit : nom et couleur.
      let alertDeleteProduct =
        productInLocalStorage[k].productName +
        " " +
        productInLocalStorage[k].choiceColor +
        " ";

      //Fonction de suppresion avec la méthode "filter"
      productInLocalStorage = productInLocalStorage.filter(
        (el) =>
          el.productId + el.choiceColor !== IdToDeleted &&
          el.productName !== alertDeleteProduct
      );

      //Ajouter le produit à supprimer dans le local storage
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));

      //alerte pour avertir que le produit à été suprimé du panier
      alert(alertDeleteProduct + "a été supprimé du panier");

      //raffraichir le panier après suppression du produit
      window.location.href = "cart.html";
    });
  }

  //--------------------------------------------------Fonction modification Quantité produit---------------------------------------------------------------------
  async function modifQuantity() {
    //Sélection de l'élément "input" pour le choix de la quantité
    let inputModify = document.querySelectorAll(".itemQuantity");

    //Boucle de modification des produits au changement de l'input en référece de l'id du produit
    for (let m = 0; m < inputModify.length; m++) {
      const products = await productById(productInLocalStorage[m].productId);

      inputModify[m].addEventListener("change", (event) => {
        event.preventDefault();
        // console.log(event);

        //Déclaration de variables prix/quantité + valeur de l'input
        let quantityModif = parseInt(productInLocalStorage[m].quantity);
        // console.log(quantityModif);
        let quantityValue = parseInt(inputModify[m].valueAsNumber);
        // console.log(quantityValue);
        let idToModif = productInLocalStorage[m].choiceColor;

        //Fonction de modification avec la méthode "find"
        const newQuantity = productInLocalStorage.find(
          (el) =>
            el.quantityValue !== quantityModif && el.choiceColor == idToModif
        );

        //La quantité de la constante newQuantity devient la valeur modifiée de l'input
        newQuantity.quantity = quantityValue;

        if (newQuantity) {
          //on mute la variable de la quantité puis on pousse cette valeur dans l'array du total quantité
          quantityInNumber = productInLocalStorage[m].quantity - quantityModif;
          totalQuantity.push(quantityInNumber);

          //On fait de même pour la nouvelle valeur du prix
          priceInNumber = products.price * quantityInNumber;
          totalPrice.push(priceInNumber);

          //on ajoute la nouvelle valeur de quantité dans le LS
          localStorage.setItem(
            "product",
            JSON.stringify(productInLocalStorage)
          );

          //on appelle la fonction du calcul total quantité et total prix
          calculTotalCart();
        }
      });
    }
  }

  modifQuantity();

  //------------------------------------------------------------------------------Gestion du formulaire-----------------------------------------------------------------
  function postDataToServer() {
    //Selection du bouton "Commender" dans le DOM
    const btnCommander = document.getElementById("order");
    console.log(btnCommander);

    //Ecoute de l'evenement du bouton au click
    btnCommander.addEventListener("click", (event) => {
      event.preventDefault();

      //déclaration d'un array vide pour intégrer les id produit à la commande
      let idProducts = [];
      for (let n = 0; n < productInLocalStorage.length; n++) {
        idProducts.push(productInLocalStorage[n].productId);
      }

      //Creation de la constante du formulaire, en imcrémentant les valeurs de chaque clés dans les éléments sélectionnés du DOM
      const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };

      //Création de l'objet order, pour regrouper les données de la commande
      const order = {
        contact: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          address: contact.address,
          city: contact.city,
          email: contact.email,
        },
        products: idProducts,
      };

      //---------------------------------------------------------------------------Validation du formulaire RegExp--------------------------------------------------------------
      //Déclaration d'une constante de vérification de saisie adresse
      const regExpAddress = (value) => {
        return /^[a-zA-Z0-9,-_ ']{2,50}[ ]{0,2}$/.test(value);
      };

      //Déclaration d'un constante de vérification de saisie prenom/Nom/Ville
      const regExpFirstLastName = (value) => {
        return /^[A-Za-z\é\è\ê\-]{2,30}$/.test(value);
      };

      //Déclaration d'une constante de vérification de saisie adresse e-mail
      const regExpEmail = (value) => {
        return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,20}$/.test(
          value
        );
      };

      //message erreur en cas de mauvaise saisie prenom/nom/ville
      const textAlertName = (value) => {
        return `${value} :  Nb caractères : 2 - 30 / Les chiffres et symboles ne sont pas autorisés `;
      };

      //message erreur en cas de mauvaise saisie d'adresse
      const textAlertAdress = (value) => {
        return `${value} : Veuillez de saisir une adresse valide`;
      };

      //message erreur en cas de mauvaise saisie de la ville
      const textAlertCity = (value) => {
        return `${value} : Veuillez saisir une ville ou un code postal valide`;
      };
      //message erreur en cas de mauvaise saisie d'adresse e-mail
      const textAlertemail = (value) => {
        return `${value} : Veuillez saisir une adresse e-mail valide`;
      };

      //Fonction de control de la saisie du prénom
      function firstNameControl() {
        const firstName = contact.firstName;

        if (regExpFirstLastName(firstName)) {
          firstNameErrorMsg.textContent = "Saisie valide ";
          firstNameErrorMsg.style.color = "white";
          return true;
        } else {
          firstNameErrorMsg.textContent = textAlertName("Prénom");
          return false;
        }
      }

      //Fonction de control de la saisie du nom
      function lastNameControl() {
        const lastName = contact.lastName;

        if (regExpFirstLastName(lastName)) {
          lastNameErrorMsg.textContent = "Saisie valide ";
          lastNameErrorMsg.style.color = "white";
          return true;
        } else {
          lastNameErrorMsg.textContent = textAlertName("Nom");
          return false;
        }
      }

      //Fonction de control de la saisie de l'adresse
      function addressControl() {
        const address = contact.address;

        if (regExpAddress(address)) {
          addressErrorMsg.textContent = "Saisie valide ";
          addressErrorMsg.style.color = "white";
          return true;
        } else {
          addressErrorMsg.textContent = textAlertAdress("Adresse");
          return false;
        }
      }

      //Fonction de control de la saisie de la Ville
      function cityControl() {
        const city = contact.city;

        if (regExpAddress(city)) {
          cityErrorMsg.textContent = "Saisie valide ";
          cityErrorMsg.style.color = "white";
          return true;
        } else {
          cityErrorMsg.textContent = textAlertCity("Ville");
          return false;
        }
      }

      //Fonction de control de la saisie de l'adresse
      function emailControl() {
        const email = contact.email;

        if (regExpEmail(email)) {
          emailErrorMsg.textContent = "Saisie valide ";
          emailErrorMsg.style.color = "white";
          return true;
        } else {
          emailErrorMsg.textContent = textAlertemail("Email");
          return false;
        }
      }
      //ajouter le bouton commander ici
      if (
        firstNameControl() &&
        lastNameControl() &&
        addressControl() &&
        cityControl() &&
        emailControl()
      ) {
        // localStorage.setItem("order", JSON.stringify(order));
      } else {
        alert("Veuillez bien remplir le formulaire");
        return false;
      }

      //---------------------------------------------------------------------------Fin du control du formulaire---------------------------------------------------------------------------
      //envoyer les données de la commande vers le serveur via une requête POST
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        //stockage de la reponse de l'api
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);

          localStorage.clear();
          //On envois les données du formulaire dans le local storage
          localStorage.setItem("orderId", data.orderId);

          //Et on le transfere vers la page confirmation de la commande où l'utilisation trouvera son numero de commande
          window.location.href =
            "confirmation.html?" + "orderId=" + data.orderId;
        })
        .catch((err) => {
          alert("erreur server :" + err.message);
        });
    });
  }

  postDataToServer();
}
getDetailToCart();
