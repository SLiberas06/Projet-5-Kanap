//Paramétrage de récupération de l'id dans l'URL de la page "produits"
let source = window.location.href; //renvoi l'url du lien(href) de la fenêtre(window) locale(location)

let url = new URL(source);//renvoi le détail de l'url sous forme d'objet

const idProduct = url.searchParams.get("id");//renvoi l'id de la page produit + Vérification que chaque page produit a attribuée sont propre id


//récuperation des données Api de l'id appelé
function dataApi() {
  const dataApi = fetch("https://projet-5-kanap-878c-7nupp757x-sliberas06.vercel.app/api/products/" + idProduct);
  dataApi
    .then(async (resData) => {

      //déclaration de la constante detail qui a pour valeur la reponse de l'api au format json
      const detail = await resData.json();

      //si l'on a les details on appelle la fonction
      if (detail) {
        addDetail(detail);
      }
    })
    .catch((err) => {
      console.log("error api" + err);
    });
}
dataApi();

//sélection d'emplacement dans le code HTML pour chaque clé et insertion des valeurs(detail) dans le DOM
async function addDetail(detail) {

  //Ajout du nom du produit
  let title = document.querySelector("#title");
  title.textContent = `${detail.name}`;

  //Ajout de l'image du produit
  let image = document.createElement("img");
  document.querySelector(".item__img").appendChild(image);
  image.src = `${detail.imageUrl}`;
  image.alt = `${detail.altTxt}`;

  //Ajout du prix du produit
  let price = document.querySelector("#price");
  price.textContent = `${detail.price}`;

  //Ajout de la description du produit
  let description = document.querySelector("#description");
  description.textContent = `${detail.description}`;

  //Ajout de la quantité en stock du produit
  let quantity = document.querySelector("#quantity");
  quantity.textContent = `${100}`;

  //Boucle d'ajout choix des "options de couleur"
  for (let color of detail.colors) {
    let colorChoice = document.createElement("option");
    document.querySelector("#colors").appendChild(colorChoice);
    colorChoice.value = color;
    colorChoice.textContent = color;
  }
  addCart(detail);
}
//---------------------------------Ajout au panier--------------------------------------------
//Récupération des données sélectionnées et l'envoi au panier
function addCart(detail) {
  //Sélection de id du formulaire
  const colorChoice = document.querySelector("#colors");
  const quantityChoice = document.querySelector("#quantity");

  //Selection du bouton "Ajouter au panier"
  const btn_addToCart = document.querySelector("#addToCart");


  //Ecouter le bouton et ajouter au panier
  btn_addToCart.addEventListener("click", (event) => {

    //Intégrer les choix en variables
    let optionColor = colorChoice.value;
    let optionQuantity = quantityChoice.value;

    //Si la couleur n'est pas sélectionnée
    if (optionColor < 1) {
      alert("Merci de sélectionner la couleur souhaitée !");
    }
    //Si l'utilisateur choisit une quantité supérieur au stock évoqué
    if (optionQuantity > 100) {
      alert("Quantité limitée");
    }
    //Sinon , si il ne sélectionne pas de quantité
    else if (optionQuantity < 1) {
      alert("Merci de sélectionner la quantité souhaitée !");
      return false;
    }

    //Récuperation des valeurs du formulaire
    let optionProduct = {
      productName: detail.name,
      productId: idProduct,
      choiceColor: optionColor,
      quantity: Number(optionQuantity),
      productDescription: detail.description,
      productImage: detail.imageUrl,
      imageAlt: detail.altTxt,
    };

    console.log(optionProduct);
    //------------------------------------------Local storage-----------------------------------------------------------
    //--------------------------Stocker les valeurs du formulaire dans le storage---------------------------------------
    //déclaration de la variable "produit dans le local storage", puis convertir les données au format JSON en objet JavaScript
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

    //fonction ajouter un produit seléctionné dans le local storage
    const addProductLocalStorage = () => {
      //ajout dans le tableau de l'objet avec les valeurs choisies par l'utilisateur
      productInLocalStorage.push(optionProduct);

      //transformation en format JSON et envoi dans la clé "product" du local storage
      localStorage.setItem("product", JSON.stringify(productInLocalStorage));
    };
    // si il y a des produits enregistrés dans le local storage
    if (productInLocalStorage) {
      console.log(productInLocalStorage);
      const inCart = productInLocalStorage.find(
        (el) =>
          el.productId === optionProduct.productId &&
          el.choiceColor === optionProduct.choiceColor
      );
      //si oui on verifie si les produits sont deja sélectionné dans le panier
      if (inCart) {
        let newQuantity =
          parseInt(optionProduct.quantity) + parseInt(inCart.quantity);
        inCart.quantity = newQuantity;
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        console.table(productInLocalStorage);
      }
      //sinon on ajout l'article séléctionné
      else {
        productInLocalStorage.push(optionProduct);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
      }
    }

    //si il n'y a pas de produits enregistrés dans le local storage
    else {
      productInLocalStorage = [];
      addProductLocalStorage();
      console.log(productInLocalStorage);
    }
  });
}