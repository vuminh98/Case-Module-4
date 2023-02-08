// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------DISPLAY PRODUCT-----------------------------------------------------
function displayProduct(product) {
    let content = ``;
    for (let i = 0; i < product.length; i++) {
        content += `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-30px">
             <div class="product">
               <span class="badges">
                <span class="sale">-${product[i].discount}%</span>
                <span class="new">-${product[i].description}%</span>
                   </span>
                 <div class="thumb">
                     <button onclick="viewDetailProduct(${product[i].id})" class="image">
                         <img src="${product[i].image}" alt=""/>
                         <img class="hover-image" src="${product[i].image}" alt=""/>
                     </button>
                 </div>
                 <div class="content">
                     <span class="category"><a href="#">${product[i].category.name}</a></span>
                     <h5 class="title"><button onclick="viewDetailProduct(${product[i].id})">${product[i].name}
                     </button>
                     </h5>
                     <span class="price">
                     <span class="new">$${product[i].price}</span>
                      </span>
                 </div>
                 <div class="actions">
                     <button title="Add To Cart" class="action add-to-cart"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal-Cart"><i
                         class="pe-7s-shopbag"></i></button>
                     <button class="action wishlist" title="Wishlist"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal-Wishlist"><i
                         class="pe-7s-like"></i></button>
                     <button class="action quickview" data-link-action="quickview"
                             title="Quick view" data-bs-toggle="modal"
                             data-bs-target="#exampleModal" onclick="viewDetailProduct(${product[i].id})"><i
                         class="pe-7s-look"></i></button>
                     <button class="action compare" title="Compare"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal-Compare"><i
                         class="pe-7s-refresh-2"></i></button>
                 </div>
             </div>
         </div>`
    }
    content += ``
    document.getElementById('list_product').innerHTML = content;
}

function displayDetailProduct(id) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/" + id,
        success: function (data) {
            $("#nameDetail").val(data.name)
            $("#priceDetail").val(data.price)
            $("#descriptionDetail").val(data.description)
            $("#saleDetail").val(data.discount)
            $("#categoryDetail").val(data.category.name)
            $("#imageUpdate").val(data.image)
            findAllCategory(data)
        }
    });
}

function getAllProduct() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/product",
        success: function (data) {
            displayProduct(data)
        }
    });
}
// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------CREATE PRODUCT------------------------------------------------------

function createProduct() {
    let name = $("#name").val()
    let price = $("#price").val()
    let quantity = $("#quantity").val()
    let description = $("#description").val()
    let discount = $("#discount").val()
    let category = $("#category").val()
    let newProduct = {
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        discount: discount,
        category: {
            id: category
        },
        image: ""
    }

    let formData = new FormData();
    formData.append("file", $("#image")[0].files[0])
    formData.append("product", new Blob([JSON.stringify(newProduct)], {type: 'application/json'}))
    $.ajax({
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        contentType: false,
        processData: false,
        type: "POST",
        url: "http://localhost:8080/uploadProduct",
        data: formData,
        success: function (data) {
            getAllProduct()
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
// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------DISPLAY CATEGORY------------------------------------------------------
function displayCategory(category) {
    return `<option value="${category.id}">${category.name}</option>`
}

function findAllCategory(product) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/category",
        success: function (data) {
            let content = `<select id="category">`
            if (product != null) {
                content += `<option value="${product.category.id}">${product.category.name}</option>`
                for (let i = 0; i < data.length; i++) {
                    if (product.category.id !== data[i].id) {
                        content += displayCategory(data[i])
                    }
                }
                content += `<select>`
                document.getElementById("categoryUpdate").innerHTML = content;
            } else {
                for (let i = 0; i < data.length; i++) {
                    content += displayCategory(data[i])
                }
                content += `<select>`
                document.getElementById("categoryForm").innerHTML = content;
            }
        }
    });
}
// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------DISPLAY PRODUCT ON A STORE------------------------------------------
function displayOneProduct(product) {
    let content = ``;
    for (let i = 0; i < product.length; i++) {
        content += `<div class="col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-30px">
             <div class="product">
               <span class="badges">
                <span class="new" style="color: darkgray">-${product[i].discount}%</span>
                
                   </span>
                 <div class="thumb">
                     <button onclick="viewDetailProduct(${product[i].id})" class="image">
                         <img src="${product[i].image}" alt=""/>
                         <img class="hover-image" src="${product[i].image}" alt=""/>
                     </button>
                 </div>
                 <div class="content">
                     <span class="category"><a href="#">${product[i].category.name}</a></span>
                     <h5 class="title"><button onclick="viewDetailProduct(${product[i].id})">${product[i].name}
                     </button>
                     </h5>
                     <span class="price">
                   
                     <span class="old">$${product[i].price}</span>
                     <span class="new">$${((product[i].price) * (100 - product[i].discount)) / 100}</span>
                      </span>
                 </div>
                 <div class="actions">
                     <button title="Add To Cart" class="action add-to-cart"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal-Cart"><i
                         class="pe-7s-shopbag"></i></button>
                     <button class="action wishlist" title="Wishlist"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal-Wishlist"><i
                         class="pe-7s-like"></i></button>
                     <button class="action quickview" data-link-action="quickview"
                             title="Quick view" data-bs-toggle="modal"
                             data-bs-target="#exampleModal"><i
                         class="pe-7s-look"></i></button>
                     <button class="action compare" title="Update" data-bs-target="#exampleModal4" data-bs-whatever="@mdo" data-bs-toggle="modal"
                             onclick="updateForm(${product[i].id})"><i
                         class="pe-7s-refresh-2"></i></button>
                         <button class="action compare" title="Delete"                             
                             onclick="deleteProduct(${product[i].id})">
                             <i class="fa-light fa-trash"></i>
                         </button>
                 </div>
             </div>
         </div>`
    }

    document.getElementById('list_product_store').innerHTML = content;
}

function getOneProduct() {
    let idStore = sessionStorage.getItem("idStore")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/product/" + idStore,
        success: function (data) {
            displayOneProduct(data)
        }
    });
}

function displayProductShop(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/store/" + id,
        success: function (data) {
            transferPage(data)
            sessionStorage.setItem("idStore", id)
        }
    })
}
// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------CREATE A PRODUCT ON STORE------------------------------------------------------
function createOneProduct() {
    let idStoreProducts = sessionStorage.getItem("idStore")
    let name = $("#name").val()
    let price = $("#price").val()
    let quantity = $("#quantity").val()
    let description = $("#description").val()
    let discount = $("#discount").val()
    let category = $("#category").val()
    let newProduct = {
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        discount: discount,
        category: {
            id: category
        },
        store: {
            id: idStoreProducts
        },
        image: ""
    }

    let formData = new FormData();
    formData.append("file", $("#image")[0].files[0])
    formData.append("product", new Blob([JSON.stringify(newProduct)], {type: 'application/json'}))
    $.ajax({
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        contentType: false,
        processData: false,
        type: "POST",
        url: "http://localhost:8080/uploadProduct",
        data: formData,
        success: function (data) {
            displayProductShop(data)
            getOneProduct(data)
        }
    })
    event.preventDefault();
}

// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------UPDATE PRODUCT ON STORE------------------------------------------------------
function updateForm(id) {
    sessionStorage.setItem("update", id)
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/" + id,
        success: function (data) {
            $("#nameUpdate").val(data.name)
            $("#priceUpdate").val(data.price)
            $("#quantityUpdate").val(data.quantity)
            $("#descriptionUpdate").val(data.description)
            $("#discountUpdate").val(data.discount)
            $("#categoryUpdate").val(data.category.id)
            findAllCategory(data)
            displayNameStoreUpdate(data)
        }
    });
}

function displayNameStoreUpdate(data) {
    document.getElementById("storeUpdate").innerHTML = data.store.nameStore
}

function updateProduct() {
    let idUpdate = sessionStorage.getItem("update");
    let idStore = sessionStorage.getItem("idStore")
    let name = $("#nameUpdate").val()
    let price = $("#priceUpdate").val()
    let quantity = $("#quantityUpdate").val()
    let description = $("#descriptionUpdate").val()
    let discount = $("#discountUpdate").val()
    let categoryId = $("#category").val()
    let ProductUpdate = {
        id: idUpdate,
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        discount: discount,
        image: "",
        category: {
            id: categoryId
        },
        store : {
            id: idStore
        }
    }
    let formData = new FormData()
    formData.append("fileUpdate", $("#imageUpdate")[0].files[0])
    formData.append("product", new Blob([JSON.stringify(ProductUpdate)],
        {type: 'application/json'}))
    $.ajax({
        contentType: false,
        processData: false,
        type: "PUT",
        url: "http://localhost:8080/" + idUpdate,
        data: formData,
        success: function (data) {
            getOneProduct(data)
        }
    });
    event.preventDefault();
}

function findAllStore() {
    let IdStore = sessionStorage.getItem("IdStore")
    let NameStore = sessionStorage.getItem("NameStore")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/store",
        success: function (data) {
            let content = `<select id="store">`
            if (IdStore != null) {
                content += `<option value="${IdStore}">${NameStore}</option>`
                for (let i = 0; i < data.length; i++) {
                    if (IdStore !== data[i].id) {
                        content += displayStore(data[i])
                    }
                }
                content += `<select>`
                document.getElementById("storeUpdate").innerHTML = content;
            } else {
                for (let i = 0; i < data.length; i++) {
                    content += displayStore(data[i])
                }
                content += `<select>`
                document.getElementById("storeForm").innerHTML = content;
            }
        }
    });
}

function displayStore(store) {
    return `<option value="${store.id}">${store.nameStore}</option>`
}
// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------DELETE PRODUCT------------------------------------------------------
function deleteProduct(id) {
    if (confirm("ARE YOU SURE WANNA DELETE THIS PRODUCT?")) {
        $.ajax({
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            type: "DELETE",
            url: "http://localhost:8080/" + id,
            success: function (data) {
                getOneProduct()
                if (data !== "") {
                    alert("Delete successfully!")
                }
            }
        });
    }
}

// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------SEARCH PRODUCT------------------------------------------------------
function searchProduct(page) {
    let text = $("#search").val()
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/searchProduct?search=" + text + "&page=" + page + "&size=8",
        success: function (data) {
            displayProductPage(data.content)
            displayPage(data)
            //điều kiện bỏ nút previous
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
            }
        }
    })
    event.preventDefault()
}

function getProduct(product) {
    return `<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-30px">
             <div class="product">
               <span class="badges">
                <span class="sale">-${product.discount}%</span>
                   </span>
                 <div class="thumb">
                     <button onclick="viewDetailProduct(${product.id})" class="image">
                         <img src="${product.image}" alt=""/>
                         <img class="hover-image" src="${product.image}" alt=""/>
                     </button>
                 </div>
                 <div class="content">
                     <span class="category"><a href="#">${product.category.name}</a></span>
                     <h5 class="title"><button onclick="viewDetailProduct(${product.id})">${product.name}
                     </a>
                     </h5>
                     <span class="price">
                     <span class="old">$${product.price}</span>
                     <span class="new">$${((product.price) * (100 - product.discount)) / 100}</span>
                    
                      </span>
                 </div>
                 <div class="actions">
                     <button title="Add To Cart" class="action add-to-cart"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal-Cart"><i
                         class="pe-7s-shopbag"></i></button>
                     <button class="action wishlist" title="Wishlist"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal-Wishlist"><i
                         class="pe-7s-like"></i></button>
                     <button class="action quickview" data-link-action="quickview"
                             title="Quick view" data-bs-toggle="modal"
                             data-bs-target="#exampleModal" onclick="displayDetailProduct(${product.id})"><i
                         class="pe-7s-look"></i></button>
                     <button class="action compare" title="Compare"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal-Compare"><i
                         class="pe-7s-refresh-2"></i></button>
                 </div>
             </div>
         </div>`
}

function displayProductPage(data) {
    let content = ``;
    for (let i = 0; i < data.length; i++) {
        content += getProduct(data[i])
    }
    document.getElementById('list_product').innerHTML = content;
}

function displayPage(data) {
    document.getElementById('pageForm').innerHTML = `<ul>
                                        <li class="li"><a class="page-link" id="backup" onclick="isPrevious(${data.pageable.pageNumber})"><i class="fa fa-angle-left"></i></a>
                                        </li>
                                        <li class="li"><span>${data.pageable.pageNumber + 1} | ${data.totalPages}</span></a>
                                        </li>
                                        <li class="li"><a class="page-link" id="next" onclick="isNext(${data.pageable.pageNumber})"><i class="fa fa-angle-right"></i></a>
                                        </li>
                                    </ul>`
}

function isPrevious(pageNumber) {
    searchProduct(pageNumber - 1)
}

//hàm tiến page
function isNext(pageNumber) {
    searchProduct(pageNumber + 1)
}

// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------SORT PRODUCT------------------------------------------------------
function sortProductByPrice() {
    let text1 = $("#sortPrice").val()
    let text = (text1.split(","))
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/sortProductByPrice?price1=" + text[0] + "&price2=" + text[1],
        success: function (data) {
            displayProductStore(data.content)
        }
    })
    event.preventDefault()
}

function sortProductByCategory(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/sortProductByCategory?id=" + id,
        success: function (data) {
            displayProductStore(data.content)
        }
    })
    event.preventDefault()
}
// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------DETAIL PRODUCT---------------------------------------------------
function viewDetailProduct(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/" + id,
        success: function (data) {
            sessionStorage.setItem("ProductId",id)
            window.location.href = "single-product.html"
        }
    });
    event.preventDefault()
}


function getProductDetail() {
    let id = sessionStorage.getItem("ProductId")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/" + id,
        success: function (data) {
            displayDetailsProduct(data)
        }
    })
}

function displayDetailsProduct(data) {
    let content = ``
    content = `<div class="col-lg-6 col-sm-12 col-xs-12 mb-lm-30px mb-md-30px mb-sm-30px">
                        <!-- Swiper -->
                        <div class="swiper-container zoom-top">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <img class="img-responsive m-auto" src="${data.image}" alt="">
                                    <a class="venobox full-preview" data-gall="myGallery" href="../assets/images/product-image/zoom-image/1.webp">
                                        <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <img class="img-responsive m-auto" src="image/zenbook.jpg" alt="">
                                    <a class="venobox full-preview" data-gall="myGallery" href="../assets/images/product-image/zoom-image/2.webp">
                                        <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <img class="img-responsive m-auto" src="image/zflip4.jpg" alt="">
                                    <a class="venobox full-preview" data-gall="myGallery" href="../assets/images/product-image/zoom-image/3.webp">
                                        <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <img class="img-responsive m-auto" src="image/zfold4.jpg" alt="">
                                    <a class="venobox full-preview" data-gall="myGallery" href="../assets/images/product-image/zoom-image/4.webp">
                                        <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="swiper-slide">
                                    <img class="img-responsive m-auto" src="image/ip11.jpg" alt="" >
<a class="venobox full-preview" data-gall="myGallery" href="../assets/images/product-image/zoom-image/5.webp">
                                        <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
<div class="col-lg-6 col-sm-12 col-xs-12" data-aos="fade-up" data-aos-delay="200">
                        <div class="product-details-content quickview-content ml-25px">
                            <h2>${data.name}</h2>
                            <div class="pricing-meta">
                                <ul class="d-flex">
                                    <li class="old-price">$${((data.price)*(100-data.discount))/100}</li>
                                   
                                </ul>
                            </div>
                            <div class="pro-details-rating-wrap">
                                <div class="rating-product">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <span class="read-review"><a class="reviews" href="#">(5 Customer Review)</a></span>
                            </div>
                            <p class="mt-30px">${data.description}</p>
                            <div class="pro-details-categories-info pro-details-same-style d-flex m-0">
                                <span>SKU:</span>
                                <ul class="d-flex">
                                    <li>
                                        <a href="#">${data.store.description}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="pro-details-categories-info pro-details-same-style d-flex m-0">
                                <span>Categories: </span>
                                <ul class="d-flex">
                                    <li>
                                        <a href="#">${data.category.name}</a>
                                    </li>                            
                                </ul>
                            </div>
                            <div class="pro-details-categories-info pro-details-same-style d-flex m-0">
                                <span>Tags: </span>
                                <ul class="d-flex">
                                    <li>
                                        <a href="#">${data.store.nameStore}</a>
                                    </li>
</ul>
                            </div>
                            <div class="pro-details-quality">
                                <div class="cart-plus-minus">
                                    <input class="cart-plus-minus-box" type="text" name="qtybutton" value="1" />
                                </div>
                                <div class="pro-details-cart">
                                    <button class="add-cart" onclick="addCartButton(${data.id})"> Add To
                                        Cart</button>
                                </div>
                                <div class="pro-details-compare-wishlist pro-details-wishlist ">
                                    <a href="../wishlist.html"><i class="pe-7s-like"></i></a>
                                </div>
                                <div class="pro-details-compare-wishlist pro-details-wishlist ">
                                    <a href="../compare.html"><i class="pe-7s-refresh-2"></i></a>
                                </div>
                            </div>
                        </div>
                        <!-- product details description area start -->
                        <div class="description-review-wrapper">
                            <div class="description-review-topbar nav">
                                <button data-bs-toggle="tab" data-bs-target="#des-details2">Information</button>
                                <button class="active" data-bs-toggle="tab" data-bs-target="#des-details1">Description</button>
                                <button data-bs-toggle="tab" data-bs-target="#des-details3">Reviews (02)</button>
                            </div>
                            <div class="tab-content description-review-bottom">
                                <div id="des-details2" class="tab-pane">
                                    <div class="product-anotherinfo-wrapper text-start">
                                        <ul>
                                            <li><span>Weight</span> 400 g</li>
                                            <li><span>Dimensions</span>10 x 10 x 15 cm</li>
                                            <li><span>Materials</span> 60% cotton, 40% polyester</li>
                                            <li><span>Other Info</span> American heirloom jean shorts pug seitan letterpress</li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="des-details1" class="tab-pane active">
                                    <div class="product-description-wrapper">
                                        <p> IPhone is very expensive!! Don't buy
                                        </p>
                                    </div>
                                </div>
                                <div id="des-details3" class="tab-pane">
                                    <div class="row" id="commment">
</div>
                                        <div class="col-lg-12">
                                            <div class="ratting-form-wrapper pl-50">
                                                <h3>Add a Review</h3>
                                                <div class="ratting-form">
                                                    <form action="#">
                                                        <div class="star-box">
                                                            <span>Your rating:</span>
                                                            <div class="rating-product">
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                                <i class="fa fa-star"></i>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="rating-form-style">
                                                                    <input placeholder="Name" type="text" value="${data.store.user.name}" disabled/>
                                                                </div>
                                                            </div>
                                                           
                                                            <div class="col-md-12">
                                                                <div class="rating-form-style form-submit">
                                                                    <textarea name="Your Review" placeholder="Message" id="message" ></textarea>
                                                                    <button class="btn btn-primary btn-hover-color-primary " type="submit" value="Submit" onclick="getComment(${data.store.user.id})">Submit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- product details description area end -->
</div>`
    document.getElementById("productDetail").innerHTML = content
}

function getComment(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/" + id,
        success: function (data) {
            comment(data)
        }
    })
}

function comment(data) {
    let content = ``
    content =  ` <div class="col-lg-12">
        <div class="review-wrapper">
            <div class="single-review">
                <div class="review-img">
                    <img src="image/user.jpg" alt=""/>
                </div>
                <div class="review-content">
                    <div class="review-top-wrap">
                        <div class="review-left">
                            <div class="review-name">
                                <h4>${data.store.user.name}</h4>
                            </div>
                            <div class="rating-product">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>

                    </div>
                    <div class="review-bottom">
                        <p>
                          ${data.content}
                        </p>
                    </div>
                </div>
            </div>

            <div class="review-content">
                <div class="review-top-wrap">
                    <div class="review-left"></div>
                </div>
            </div>
        </div>
    </div>`
    document.getElementById("comment").innerHTML = content
}
// ---------------------------------------------o0o-----o0o--------------------------------------------------------
//---------------------------------------------BUY PRODUCT---------------------------------------------------
let idUser = sessionStorage.getItem("idUpdate")
function addCartButton(productId) {
    let newCart = {
        id:0,
        quantity:1,
        price:0,
        user: {
            id: idUser
        },
        product: {
            id: productId
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/cart/save",
        data:JSON.stringify(newCart),
        success: function () {
            displayItemCart()
        }
    });
    event.preventDefault();
}
