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
            console.table(resData);
            //déclaration de la constante detail qui a pour valeur la reponse de l'api au format json
            const detail = await resData.json();
                console.table(detail);
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
    //Boucle d'ajout choix des "options de couleur"
    for (let color of detail.colors){
        let colorChoice = document.createElement("option");
        document.querySelector('#colors').appendChild(colorChoice);
        colorChoice.value = color;
        colorChoice.innerHTML = color;
    }

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
    event.preventDefault();

//Intégrer les choix en variables
const optionColor = colorChoice.value;
const optionQuantity = quantityChoice.value;

//Récuperation des valeurs du formulaire

let optionProduct ={
    name : detail.name,
    id: idProduct,
    color : optionColor,
    quantity :optionQuantity,
    price : detail.price,
    description : detail.description,
    image : detail.imageUrl,
    alt : detail.altTxt

}
console.log(optionProduct);
})};