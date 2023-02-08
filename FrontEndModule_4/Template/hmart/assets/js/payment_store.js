let storeId=1;
let userId=1;
function getListPaymentStore(payment) {
    if (`${payment.status}` === "true") {
        return `
                                        <tr>
                                            <th style="text-align: center;" data-bs-toggle="modal" 
                                                data-bs-target="#staticBackdrop" onclick="detailPaymentUser()"
                                                >${payment.user.name}</th>
                                            <th style="text-align: center">${payment.user.phone}</th>
                                            <th style="text-align: center">${payment.dateCreated}</th>
                                            <th style="text-align: center">${payment.totalPrice} $</th>
                                        </tr>`
    }else {
        return ``;
    }
}
function getListPaymentStoreStatus(payment) {
    if (`${payment.status}` === "false") {
    return `
                                        <tr>
                                            <th style="text-align: center">${payment.user.name}</th>
                                            <th style="text-align: center">${payment.dateCreated}</th>
                                            <th style="text-align: center">${payment.totalPrice} $</th>
                                            <th style="text-align: center">
                                                <button class="btn-info" onclick="acceptPayment(${payment.id})"
                                                 style="border-radius: 15%">Accept</button>
                                                 <button class="btn-warning" onclick="deletePayment(${payment.id})"
                                                 style="border-radius: 15%">Delete</button>
                                            </th>
                                        </tr>`
    }else {
        return ``;
    }
}
function displayPaymentStore() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/store/"+storeId,
        success: function (data) {
            let contentStatusTrue=""
            let contentStatusFalse=""
            let total =0;
            for (let i = 0; i < data.length ; i++) {
                contentStatusTrue+= getListPaymentStore(data[i])
                contentStatusFalse+= getListPaymentStoreStatus(data[i])
                if (`${data[i].status}` === "true"){
                    total += parseFloat(`${data[i].totalPrice}`)
                }
            }
            document.getElementById("list-payment-store").innerHTML="";
            document.getElementById("list-payment-store").innerHTML=contentStatusTrue
            document.getElementById("list-payment-store-status").innerHTML=contentStatusFalse
            document.getElementById("total-store").innerText= total
        }
    });

    event.preventDefault();
}
function acceptPayment(paymentId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cart/assent/"+paymentId,
        success: function (data) {
            if (data !== undefined){
                swal({
                    title: "Good job!",
                    text: "You have approved the order successfully!",
                    icon: "success",
                    button: "Aww yiss!",
                });
            }
            displayPaymentStore()
        }
    });
    event.preventDefault();
}
function deletePayment(paymentId) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cart/delete/"+paymentId,
        success: function (data) {
            if (data !== undefined){
                swal({
                    title: "Good job!",
                    text: "You have approved the order successfully!",
                    icon: "success",
                    button: "Aww yiss!",
                });
            }
            displayPaymentStore()
        }
    });
    event.preventDefault();
}
function detailPaymentUser() {
    document.getElementById("table-payment-detail-user").innerHTML = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/store/one_user?user="+userId+"&store="+storeId,
        success: function (data) {
            let count = 0;
            let totalPrice = 0;
            let content = " <thead>\n" +
                "                        <tr>\n" +
                "                            <th>STT</th>\n" +
                "                            <th>Date</th>\n" +
                "                            <th>Total</th>\n" +
                "                            <th>Views </th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody >"
            let detail = detailUser(data[0])
            for (let i = 0; i < data.length; i++) {
                count++;
                content +=getListPaymentDetailUser(data[i],count)
                totalPrice += data[i].totalPrice
            }
            content += `<tr><th colspan="4">Total Price  :  ${totalPrice} $</th></tr></tbody>`
            document.getElementById("detail-user").innerHTML=detail
            document.getElementById("back-detail-user").hidden=true
            document.getElementById("head-payment-detail").innerText="List Payment"
            document.getElementById("table-payment-detail-user").innerHTML = content;
        }
    });
    event.preventDefault();
}
function getListPaymentDetailUser(payment,count) {
    if (`${payment.status}` === "true") {
        return `<th>${count}</th><th>${payment.dateCreated}</th><th>${payment.totalPrice} $</th>
            <th><a href="#" onclick="detailPayment(${payment.id})" class="btn-outline-hover-dark">
            <i class="fa-sharp fa-solid fa-eye"></i></a></th>`
    }else {
        return ``;
    }
}
function detailUser(payment) {
    return `<h3>${payment.user.name}</h3>
   <h4>${payment.user.phone}</h4>
   <h4>${payment.user.address}</h4>`

}
function detailPayment(paymentId) {
    document.getElementById("table-payment-detail-user").innerHTML = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/store/detail_payment/"+paymentId,
        success: function (data) {
            let count = 0;
            let totalPrice = 0;
            let content = "<thead>\n" +
                "                        <tr>\n" +
                "                            <th>STT</th>\n" +
                "                            <th>Name</th>\n" +
                "                            <th>Quantity</th>\n" +
                "                        </tr>\n" +
                "                        </thead>\n" +
                "                        <tbody >"
            for (let i = 0; i < data.length; i++) {
                count++
                content += getHistoryBuy(data[i],count)
                totalPrice += data[i].payment.totalPrice
            }
            content+= `<tr><th colspan="3">Total Price  :  ${totalPrice} $</th></tr>`
            document.getElementById("back-detail-user").hidden=false
            document.getElementById("head-payment-detail").innerText="Payment Detail"
            document.getElementById("table-payment-detail-user").innerHTML = content;
        }
    });
    event.preventDefault();
}
function getHistoryBuy(historyBuy,count) {
    return `<tr><td>${count}</td><td>${historyBuy.product.name}</td><td>X ${historyBuy.quantity}</td></tr>`
}
function displayFieldDate() {
    let value = $("#select-fields-payment").val()
    if (value === "dateCreated"){
        document.getElementById("search-date-payment").hidden=false
        document.getElementById("search-field-payment").hidden=true
    }else {
        document.getElementById("search-date-payment").hidden=true
        document.getElementById("search-field-payment").hidden=false
    }
}
function informationSearchPayment() {
    let key = $("#select-fields-payment").val()
    let value = $("#search-field-payment").val()
    let formData = new FormData()
    formData.append("value",value)
    formData.append("key",key)
    formData.append("storeId",storeId)
    $.ajax({
        contentType: false,
        processData: false,
        type: "POST",
        url: "http://localhost:8080/store/search_payments",
        data:formData,
        success: function (data) {
            let contentStatusTrue=""
            for (let i = 0; i < data.length ; i++) {
                contentStatusTrue+= getListPaymentStore(data[i])
            }
            document.getElementById("list-payment-store").innerHTML=""
            document.getElementById("list-payment-store").innerHTML=contentStatusTrue
        }
    });
    event.preventDefault();
}
