const dataApi = fetch("http://localhost:3000/api/products");

    dataApi.then(async(resData)=>{

        console.log(resData);

        const response = await resData.json();

            console.table(response);

// Récupération des données Api dans une boucle "for" en triant chaque reponse de l'array sous forme d'objet
            try{

                for ( let i = 0 ; i < response.length ; i++ ){
                    const id = response[i]._id;
                    const name = response[i].name;
                    const image = response[i].imageUrl;
                    const description = response[i].description;
                    const alt = response[i].altTxt;
                
// Ajout des objets dans le DOM-------------------------------------------------------------------------------

                    //Déclaration des constantes pour l'emplacement des articles dans l'élément "#items"
                    const productItems = document.querySelector("#items");
                    const productArticle = document.createElement("article");
                    
                    //création des éléments d'ancrage et ajout des liens "produits"
                    const addProduct_id = document.createElement("a");
                        addProduct_id.href = id;
                        productItems.appendChild(addProduct_id);
                        addProduct_id.appendChild(productArticle);

                    //création des éléments <img> et ajout des images "produits"
                    const addProduct_image = document.createElement("img");
                        addProduct_image.src = image;
                        addProduct_image.alt = alt;
                        productArticle.appendChild(addProduct_image);

                    //création des éléments <h3> et ajout des noms "produits"
                    const addProduct_name = document.createElement("h3");
                        addProduct_name.innerHTML= name;
                        productArticle.appendChild(addProduct_name);

                    //création des éléments <p> et ajout des descriptions "produits"
                    const addProduct_description = document.createElement("p");
                        addProduct_description.innerHTML = description;
                        productArticle.appendChild(addProduct_description);
                }
            }
            catch(err){
                console.log(err);
            }
    })

    .catch((err)=>{
        console.log(err);
    })

//Récupération données API
// fetch("http://localhost:3000/api/products")
//     .then(function(res){
//         return res.json()})
//     .then(function(value){
//         console.table(value);

//     })

//     .catch((err)=>{
//         console.log('Error 404');
//     });

// // Fonction intégration des produits dans le DOM
// function addProduct(dataApi){
// const productItems = document.querySelector(".items");

// for (let product of dataApi){
//     productItems.innerHTML += `<a href="./product.html?id=${product._id}">
// <article>
// <img src="${product.imageUrl}" alt="${product.altTxt}">
// <h3 class="productName">${product.name}</h3>
// <p class="productDescription"${product.description}</p>
// </article>
// </a>`;
//  }
// }
// addProduct();