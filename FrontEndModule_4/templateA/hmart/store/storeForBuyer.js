if (sessionStorage.getItem("login") !== null) {
    document.getElementById("showAccount").innerHTML = sessionStorage.getItem("login")
}
function displayStore(store) {
    let content = ``;
    for (let i = 0; i < store.length; i++) {
        content += `<table border = "1" style=" border:solid; margin-top: 50px">
             <tr>
            <td style="width: 250px; height: 250px"><img src="${store[i].logo}"  style="width: 200px; height: 200px;background-color: white" ></td>
            <td style="padding-top: 0"><i class="fa-solid fa-comment-pen"></i><b style="margin-left: 10px">Description<b>: ${store[i].description}</td>
            <td><b>Rating:</b>
<span class="fa fa-star checked" style="color: gold"></span>
<span class="fa fa-star checked" style="color: gold"></span>
<span class="fa fa-star checked" style="color: gold"></span>
<span class="fa fa-star" style="color: gold"></span>
<span class="fa fa-star"></span></td>
            <td style="padding-bottom: 0; margin-left: 10px"><i class="fa-sharp fa-solid fa-eye"></i><b>Joined: 21 followers</b></td>
         </tr>
         <tr>
            <td style="width: 50px; height: 50px"><i class="fa-solid fa-shop"></i><b style="margin-left: 10px" ">Name Store: ${store[i].nameStore}</b></td>
          </tr>
          <tr>
        <td style="margin-left: 10px"><i class="fa-sharp fa-solid fa-phone"></i>Tel: ${store[i].phoneStore}</td>
        <td><i class="fa-solid fa-house"></i><a href="#" style="color: deepskyblue; margin-left: 10px">Home</td>
        <td><i class="fa-solid fa-cart-shopping"></i><button onclick="displayProductShop(${store[i].id})" style="color: deepskyblue; margin-left: 10px"/>All Product</td>
        <td><i class="fa-solid fa-location-dot"></i><a href="#" style="color: deepskyblue; margin-left: 10px">Address: ${store[i].addressStore} </td>
        </tr>
         </tr>`
        content += `</table>`
    }
    content += `</br>`
    document.getElementById('list_store').innerHTML = content;
}

function getAllStore() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/store",
        success: function (data) {
            displayStore(data)
        }
    });
}

function createStore() {
    let name = $("#nameStore").val()
    let phone = $("#phoneStore").val()
    let address = $("#addressStore").val()
    let description = $("#descriptionStore").val()
    let userId = sessionStorage.getItem("idUpdate")
    let newStore = {
        nameStore: name,
        phoneStore: phone,
        addressStore: address,
        description: description,
        user: {
            id: userId
        },
        logo : ""
    }
    let formData = new FormData();
    formData.append("fileStore", $("#logo")[0].files[0])
    formData.append("store", new Blob([JSON.stringify(newStore)], {type:'application/json'}))
    $.ajax({
        contentType: false,
        processData: false,
        type: "POST",
        url: "http://localhost:8080/store/uploadStore",
        data: formData,
        success: function (data) {
            getAllStore()
            if (data.name != null) {
                Swal.fire(
                    'Good job!',
                    'You clicked the button!',
                    'success'
                )
            }
        }
    })
    event.preventDefault();
}

function displayProductShop(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/store/" + id,
        success: function (data) {
            sessionStorage.setItem("idStore",id)
            transferPage(data)

        }
    })
}

function transferPage(data) {
    window.location.href = "ProductInStore.html"
    displayProductStore(data)
}



function displayProductStore(productStore) {
    let content = ``;
    for (let i = 0; i < productStore.length; i++) {
        content += `<div class="col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-30px">
                                                    <!-- Single Prodect -->
                                                    <div class="product">
                                                        <span class="badges">
                                                        <span class="new">-${productStore[i].discount}</span>
                                                        </span>
                                                        <div class="thumb">
                                                            <a href="single-product.html" class="image">
                                                                <img src="${productStore[i].image}" alt="Product" />
                                                                <img class="hover-image" src="${productStore[i].image}" alt="Product" />
                                                            </a>
                                                        </div>
                                                        <div class="content">
                                                            <span class="category"><a href="#">${productStore[i].category.name}</a></span>
                                                            <h5 class="title"><a href="single-product.html">${productStore[i].name}
                                                                </a>
                                                            </h5>
                                                            <span class="price">
                                                            <span class="new">$${productStore[i].price}</span>
                                                            </span>
                                                        </div>
                                                        <div class="actions">
                                                            <button title="Add To Cart" class="action add-to-cart" data-bs-toggle="modal" data-bs-target="#exampleModal-Cart"><i
                                                                class="pe-7s-shopbag"></i></button>
                                                            <button class="action wishlist" title="Wishlist" data-bs-toggle="modal" data-bs-target="#exampleModal-Wishlist"><i
                                                                    class="pe-7s-like"></i></button>
                                                            <button class="action quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="pe-7s-look"></i></button>
                                                            <button class="action compare" title="Compare" data-bs-toggle="modal" data-bs-target="#exampleModal-Compare"><i
                                                                    class="pe-7s-refresh-2"></i></button>
                                                        </div>
                                                    </div>
                                                </div>`
    }
    content += ``
    document.getElementById("list_product_store").innerHTML = content
}

function getAllProductStore() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/product",
        success: function (data) {
            displayProductStore(data)
        }
    });
}

function displayNameStore(store) {
    return `<option value="${store.id}">${store.nameStore}</option>`
}

function findAllIdStore() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/store",
        success: function (data) {
            let content = `<select id="store">`
            for (let i = 0; i < data.length; i++) {
                content += displayNameStore(data[i])
            }
            content += `<select>`
            document.getElementById("storeForm").innerHTML = content;
        }
    });
}

// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------SEARCH STORE--------------------------------------------------------
function searchStore(page) {
    let text = $("#search").val()
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/store/searchStore?search=" + text + "&page=" + page + "&size=3",
        success: function (data) {
            displayStorePage(data.content)
            displayPageStore(data)
            //điều kiện bỏ nút previous
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup1").hidden = true
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next1").hidden = true
            }
        }
    })
    event.preventDefault()
}

function getStore(store) {
    return `<table border = "1" style=" border:solid; margin-top: 50px">
             <tr>
            <td style="width: 250px; height: 250px"><img src="${store.logo}"  style="width: 200px; height: 200px;background-color: white" ></td>
            <td style="padding-top: 0"><i class="fa-solid fa-comment-pen"></i><b style="margin-left: 10px">Description<b>: ${store.description}</td>
            <td><b>Rating:</b>
<span class="fa fa-star checked" style="color: gold"></span>
<span class="fa fa-star checked" style="color: gold"></span>
<span class="fa fa-star checked" style="color: gold"></span>
<span class="fa fa-star" style="color: gold"></span>
<span class="fa fa-star"></span></td>
            <td style="padding-bottom: 0; margin-left: 10px"><i class="fa-sharp fa-solid fa-eye"></i><b>Joined: 21 followers</b></td>
         </tr>
         <tr>
            <td style="width: 50px; height: 50px"><i class="fa-solid fa-shop"></i><b style="margin-left: 10px" ">Name Store: ${store.nameStore}</b></td>
          </tr>
          <tr>
        <td style="margin-left: 10px"><i class="fa-sharp fa-solid fa-phone"></i>Tel: ${store.phoneStore}</td>
        <td><i class="fa-solid fa-house"></i><a href="#" style="color: deepskyblue; margin-left: 10px">Home</td>
        <td><i class="fa-solid fa-cart-shopping"></i><button onclick="displayProductShop(${store.id})" style="color: deepskyblue; margin-left: 10px"/>All Product</td>
        <td><i class="fa-solid fa-location-dot"></i><a href="#" style="color: deepskyblue; margin-left: 10px">Address: ${store.addressStore} </td>
        </tr>
         </tr>
    </table>`
}

function displayStorePage(data) {
    let content = ``;
    for (let i = 0; i < data.length; i++) {
        content += getStore(data[i])
    }
    content += `</br>`
    document.getElementById('list_store').innerHTML = content;
}

function displayPageStore(data) {
    document.getElementById('pageStore').innerHTML = `<ul>
                                        <li class="li"><a class="page-link" id="backup1" onclick="isPreviousStore(${data.pageable.pageNumber})"><i class="fa fa-angle-left"></i></a>
                                        </li>
                                        <li class="li"><span>${data.pageable.pageNumber + 1} | ${data.totalPages}</span></a>
                                        </li>
                                        <li class="li"><a class="page-link" id="next1" onclick="isNextStore(${data.pageable.pageNumber})"><i class="fa fa-angle-right"></i></a>
                                        </li>
                                    </ul>`
}

function isPreviousStore(pageNumber) {
    searchStore(pageNumber - 1)
}

//hàm tiến page
function isNextStore(pageNumber) {
    searchStore(pageNumber + 1)
}

// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------SEARCH STORE--------------------------------------------------------


