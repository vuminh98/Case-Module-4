let userId = sessionStorage.getItem("idUpdate");
function displayItemCart() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cart/"+userId,
        success: function (data) {
            let contentForm = ""
            for (let i = 0; i < data.length; i++) {
                contentForm += getFromItemCart(data[i])
            }
            document.getElementById("form-item-cart").innerHTML = contentForm;
        }
    });
}
function getFromItemCart(cart) {
    return `<li><a href="single-product.html" class="image"><img src="${cart.product.image}"
                            alt="Cart product Image"></a>
                            <div class="content">
                                <a href="single-product.html" class="title">${cart.product.name}</a>
                                <span class="quantity-price">${cart.quantity} x <span class="amount">
                                ${Math.ceil(cart.product.price*(1-cart.product.discount/100)*100)/100} $</span></span>
                                <a href="#" onclick="deleteItemCart(${cart.product.id})" class="remove">×</a>
                            </div></li>`
}
function deleteItemCart(productId) {
    let newCart = {
        id:0,
        quantity:0,
        price:0,
        user: {
            id: idUser
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