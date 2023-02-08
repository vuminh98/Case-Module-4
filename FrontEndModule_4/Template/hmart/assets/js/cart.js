let idUser = 1;

function displayItemCart() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cart/"+idUser,
        success: function (data) {
            let contentForm = ""
            let contentList = ""
            let contentListItem = ""
            let total =0;
            for (let i = 0; i < data.length; i++) {
                contentForm += getFromItemCart(data[i])
                contentList += getListItemCart(data[i])
                contentListItem += getListItem(data[i])
                total += parseFloat(getTotalCart(data[i])) ;
            }
            document.getElementById("form-item-cart").innerHTML = contentForm;
            document.getElementById("list-item-cart").innerHTML = contentList;
            document.getElementById("list-item").innerHTML = contentListItem;
            document.getElementById("total-cart").innerText = total + " $";
        }
    });
}
function getTotalCart(cart) {
    return `${cart.price}`
}
function getFromItemCart(cart) {
    return `<li><a href="single-product.html" class="image"><img src="assets/images/product-image/1.webp"
                            alt="Cart product Image"></a>
                            <div class="content">
                                <a href="single-product.html" class="title">${cart.product.name}</a>
                                <span class="quantity-price">${cart.quantity} x <span class="amount">
                                ${cart.product.price*(1-cart.product.discount/100)} $</span></span>
                                <a href="#" onclick="deleteItemCart(${cart.product.id})" class="remove">×</a>
                            </div></li>`
}
function getListItemCart(cart) {
    return `                    <tr>
                                    <td class="product-thumbnail">
                                        <a href="#"><img class="img-responsive ml-15px"
                                                         src="assets/images/product-image/143.webp" alt=""/></a>
                                    </td>
                                    <td class="product-name"><a href="#">${cart.product.name}</a></td>
                                    <td class="product-price-cart"><span class="amount">
                                        ${cart.product.price*(1-cart.product.discount/100)} $</span></td>
                                    <td class="product-quantity"><button onclick="updateQuantity(${cart.product.id},decrease)"
                                        >-</button><span>${cart.quantity}</span>
                                        <button onclick="updateQuantity(${cart.product.id},increase)">+</button></td>
                                    <td class="product-subtotal">${cart.price} $</td>
                                    <td class="product-remove">
                                        <button onclick="deleteItemCart(${cart.product.id})"><i class="fa fa-times"></i></a>
                                    </td>
                                </tr>`
}
function getListItem(cart) {
    return ` <li><span class="order-middle-left">- ${cart.product.name} X ${cart.quantity}</span> <span
                                                class="order-price">${cart.product.price*(1-cart.product.discount/100)} $</span></li>`
}
let increase =1;
let decrease =-1;
function updateQuantity(productId,quantityUpdate) {
    let newCart = {
        id:0,
        quantity:quantityUpdate,
        price:0,
        user: {
            id: 1
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
        success: function (data) {
            displayItemCart()
        }
    });
    event.preventDefault();
}
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
        success: function (data) {
            displayItemCart()
        }
    });
    event.preventDefault();
}
function deleteItemCart(productId) {
    let newCart = {
        id:0,
        quantity:0,
        price:0,
        user: {
            id: 1
        },
        product: {
            id: productId
        }
    }
    swal({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "DELETE",
                    url: "http://localhost:8080/cart/delete",
                    data:JSON.stringify(newCart),
                    success: function (data) {
                        displayItemCart()
                    }
                });
                swal("Poof! Your product has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your product is safe!!", {
                    icon: "error",
                });
            }
        });

    event.preventDefault();
}
function detailUser() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/"+idUser,
        success: function (data) {
            $("#fullName").val(data.name)
            $("#address").val(data.address)
            $("#phone").val(data.phone)
        }
    });
}
function paymentButton() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/cart/payment/"+idUser,
        success: function (data) {
            if (data !== undefined){
                swal({
                    title: "Good job!",
                    text: "You have successfully paid!!!!",
                    icon: "success",
                    button: "Aww yiss!",
                });
            }else {
                swal({
                    title: "Good job!",
                    text: "You have failed to pay!!!!",
                    icon: "warning",
                    button: "Aww yiss!",
                });
            }
            displayItemCart()
        }
    });
    event.preventDefault();
}
function displayPayment() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/payment/"+idUser,
        success: function (data) {
            let content = ""
            for (let i = 0; i < data.length; i++) {
               content += getListPayment(data[i])
            }
            document.getElementById("list-payment").innerHTML = content;
        }
    });

}
function getListPayment(payment) {
    let count = 0;
    count++;
    let content =""
    if (`${payment.status}`==="true") {
        content =`                            <tr>
                                                <td>${count}</td>
                                                <td>${payment.dateCreated}</td>
                                                <td><span class="success" class="status-payment-Completed">Completed</span></td>
                                                <td>${payment.totalPrice} $</td>
                                                <td data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                    class="not-reviews" onclick="reviewsProduct(${payment.id})">
                                                    <i class="fa-solid fa-comment-dots"></i></td>
                                               </tr>`
    }else {
        content =`                            <tr>
                                                <td>${count}</td>
                                                <td>${payment.dateCreated}</td>
                                                <td><span class="success" class="status-payment-Processing">Processing</span></td>
                                                <td>${payment.totalPrice} $</td>
<!--                                                <td><a href="cart.html" class="view">view</a></td>-->
                                               </tr>\``
    }
    return content;
}
function deleteAllCart() {
    swal({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:8080/cart/delete_all/"+idUser,
                    success: function (data) {
                        displayItemCart()
                    }
                });
                swal("Poof! Your product has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your product is safe!!", {
                    icon: "error",
                });
            }
        });

    event.preventDefault();
}
function reviewsProduct(paymentId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/payment/payment_details/"+paymentId,
        success: function (data) {
            let content = ""
            for (let i = 0; i < data.length ; i++) {
                content +=getFormReviews(data[i])
            }
            document.getElementById("table-form-reviews").innerHTML = content
        }
    });
    event.preventDefault()
}
function getFormReviews(historyBuy) {
    return`            <tr>
                            <th><img src="assets/images/Avatar.jpg" alt="loaddingg......" height="200" width="200"/></th>
                            <td style="padding:20px">
                                <label for="comment-review-product">Comment :</label><br>
                                <textarea id="comment-review-product-${historyBuy.product.id}" rows="20" cols="50"
                                          style="width: 600px;height: 75px"></textarea><br>
                                <label for="rate-review-product">Rate :</label><br>
                                <select id="rate-review-product-${historyBuy.product.id}">
                                    <option value="very good">VERY GOOD</option>
                                    <option value="good">GOOD</option>
                                    <option value="not good">NOT GOOD</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>${historyBuy.product.name} X ${historyBuy.quantity} = 
                                ${historyBuy.product.price*historyBuy.quantity*(1-historyBuy.product.discount/100)} $</th>
                            <td style="text-align: right"><button type="button" class="btn-success"
                             onclick="saveReviews(${historyBuy.product.id})" style="border-radius: 20%">Save </button>
                            </td>
                        </tr>`
}function saveReviews(productId) {
    let commentId = "#comment-review-product-"+productId;
    let rateId = "#rate-review-product-"+productId;
    let comment = $(commentId).val()
    let rate = $(rateId).val()
    let review = {
        id:0,
        content:comment,
        rate:rate,
        product:{
            id:productId
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/payment/reviews",
        data:JSON.stringify(review),
        success: function (data) {
            if(data !== undefined){
                swal({
                    title: "Good job!",
                    text: "Thank you for rating the product!",
                    icon: "success",
                    button: "Aww yiss!",
                });
            }else {
                swal({
                    title: "Good job!",
                    text: "Product review failed!",
                    icon: "error",
                    button: "Aww yiss!",
                });
            }
        }
    });
    event.preventDefault()
}