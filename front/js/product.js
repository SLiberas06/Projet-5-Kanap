//Paramétrage de récupération de l'id dans l'URL de la page "produits"
let source = window.location.href;
// console.log(source); renvoi l'url du lien(href) de la fenêtre(window) locale(location)
let url = new URL(source);
// console.log(url); renvoi le détail de l'url sous forme d'objet
const idProduct = url.searchParams.get("id");
// console.log(idProduct); renvoi l'id de la page produit + Vérification que chaque page produit a attribuée sont propre id
         
//récuperation des données Api de l'id appelé
function dataApi(){
    const dataApi = fetch("http://localhost:3000/api/products/"+ idProduct);
        dataApi
        .then(async(resData)=>{
            // console.table(resData);
            //déclaration de la constante detail qui a pour valeur la reponse de l'api au format json
            const detail = await resData.json();
                // console.table(detail);
                    //si l'on a les details on appelle la fonction 
                    if(detail){
                        addDetail(detail);
                    }
        })
        .catch((err)=>{
            console.log("error api" + err);
        })
}
dataApi();
    
//sélection d'emplacement dans le code HTML pour chaque clé et insertion des valeurs(detail) dans le DOM
async function addDetail(detail){
    //Ajout du nom du produit
    let title = document.querySelector('#title');
        title.innerHTML = `${detail.name}`;
    //Ajout de l'image du produit
    let image = document.querySelector('.item__img');
        image.innerHTML = `<img src="${detail.imageUrl}" alt="${detail.altTxt}">`;
    //Ajout du prix du produit
    let price = document.querySelector('#price');
        price.innerHTML = `${detail.price}`;
    //Ajout de la description du produit
    let description = document.querySelector('#description');
        description.textContent = `${detail.description}`;
    //Ajout de la quantité en stock du produit
    let quantity = document.querySelector('#quantity');
        quantity.innerHTML =`${100}`;
    //Boucle d'ajout choix des "options de couleur"
    for (let color of detail.colors){
        let colorChoice = document.createElement("option");
        document.querySelector('#colors').appendChild(colorChoice);
        colorChoice.value = color;
        colorChoice.innerHTML = color;
    }
addCart(detail);
};
//---------------------------------Ajout au panier--------------------------------------------
//Récupération des données sélectionnées et l'envoi au panier
function addCart(detail){

    //Sélection de id du formulaire
    const colorChoice = document.querySelector("#colors");
    const quantityChoice = document.querySelector("#quantity");

    //Selection du bouton "Ajouter au panier"
    const btn_addToCart = document.querySelector('#addToCart');
    // console.log(btn_addToCart);

        //Ecouter le bouton et ajouter au panier
        btn_addToCart.addEventListener("click",(event)=>{
        

            //Intégrer les choix en variables
            let optionColor = colorChoice.value;
            let optionQuantity = quantityChoice.value;
            //Si la couleur n'est pas sélectionnée
                if(optionColor < [1]){
                    alert("Merci de sélectionner la couleur souhaitée !");
                };
            //Si l'utilisateur choisit une quantité supérieur au stock évoqué
                if(optionQuantity > 100){
                    alert( "Quantité limitée");
                }
            //Sinon , si il ne sélectionne pas de quantité    
                else if(optionQuantity < 1){
                    alert("Merci de sélectionner la quantité souhaitée !");
                };
            
            //Récuperation des valeurs du formulaire
            let optionProduct = { 
                productName : detail.name,
                productId: idProduct,
                choiceColor : optionColor,
                quantity :optionQuantity,
                productPrice : detail.price,
                productDescription : detail.description,
                productImage : detail.imageUrl,
                imageAlt : detail.altTxt
               
            };
            //conditions de calcul du prix par rapport à la quantité
            if(optionQuantity + 1){
                optionProduct.productPrice = optionProduct.productPrice * optionQuantity;
            };

            console.log(optionProduct);
//------------------------------------------Local storage-----------------------------------------------------------
//--------------------------Stocker les valeurs du formulaire dans le storage---------------------------------------
//déclaration de la variable "produit dans le local storage", puis convertir les données au format JSON en objet JavaScript
            let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
                //fonction popup
                // const popupConfirmation = () =>{
                //     if(window.confirm(`${detail.name} option :${optionColor},${optionQuantity} a bien été ajouté au panier
                //     Voir le panier OK ou continuer mes achats ANNULER`)){
                //         window.location.href = "cart.html";

                //     }else{
                //         window.location.href = "index.html";
                //     }
                // }
                //si il y a des produits enregistrés dans le local storage 
                // if(productInLocalStorage){
                //     productInLocalStorage.push(optionProduct);
                //     localStorage.setItem('product',JSON.stringify(productInLocalStorage));
                    console.log(productInLocalStorage);
                //     popupConfirmation();
                // }
                // //si il n'y a pas de produits enregistrés dans le local storage
                // else{
                // productInLocalStorage = [];
                // productInLocalStorage.push(optionProduct);
                // localStorage.setItem('product',JSON.stringify(productInLocalStorage));
                // console.log(productInLocalStorage);
                // popupConfirmation();
                // }
        })
    }; 
