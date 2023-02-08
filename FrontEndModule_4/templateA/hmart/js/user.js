$(document).ready(function() {
    $(function() {
            jQuery.validator.addMethod("phoneVN", function(phone_number, element) {
                phone_number = phone_number.replace(/\s+/g, "");
                return this.optional(element) || phone_number.length > 9 &&
                    phone_number.match(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/);
            }, "Please specify a valid phone number");
    }
    )
    $("#register").validate({
        rules: {
            name: "required",
            username: "required",
            password: {
                required: true,
                minlength: 6
            },
            address: "required",
            phone: {
                required: true,
                phoneVN: true

                // matches: "(84|0[3|5|7|8|9])+([0-9]{8})\b"
            }
        },
        messages: {
            name: "**Please enter name!",
            username: "**Please enter username!",
            password: {
                required: "**Please enter password!",
                minlength: "**Minimum password length 6 characters!"},

            address: "**Please enter address!",
            phone: {
                required: "**Please enter phone!",
                phoneVN: "**Wrong format, please re-enter"
            }
        },

    });
});
function create() {
    let name = $("#name").val()
    let username = $("#username").val()
    let password = $("#password").val()
    let address = $("#address").val()
    let phone = $("#phone").val()
    let newUser = {
        name: name,
        username: username,
        password: password,
        address: address,
        phone: phone
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/users/register",
        data: JSON.stringify(newUser)
    })
}

function updateUser() {
    // sessionStorage.setItem("update", idUpdate)
    let idUpdate = sessionStorage.getItem("idUpdate")
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/users/" + idUpdate,
        success: function (data) {
            $("#id-update").val(data.id)
            $("#name-update").val(data.name)
            $("#username-update").val(data.username)
            $("#password-update").val(data.password)
            $("#user-address-update").val(data.address)
            $("#phone-update").val(data.phone)
            $("#wallet-update").val(data.wallet)
            $("#status-update").val(data.status)
            $("#roles-update").val(data.roles)
            if (data.status === 2) {
                document.getElementById("checkboxBecomeSeller").hidden = true
                let n = '<p style="color: red">Pending for becoming seller</p>'
                document.getElementById("pendingBecomeBuyerNotification").innerHTML = n
            }
            for (let i = 0; i < data.roles.length; i++) {
                if (data.roles[i].name === "BUYER") {
                    count += 1;
                    for (let j = i + 1; j < data.roles.length; j++) {
                        if (data.roles[j].name === "SELLER") {
                            count += 1;
                            document.getElementById("checkboxBecomeSeller").hidden = true
                            let n = '<p style="color: #816bf9">You are seller</p>'
                            document.getElementById("pendingBecomeBuyerNotification").innerHTML = n
                        }
                    }
                }
            }
        }
    })
    event.preventDefault();
}

function update() {
    Swal.fire({
        title: 'Updated',
        text: "Your update account detail will be saved!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Click here to change'
    }).then((result) => {
        if (result.isConfirmed || result.isCanceled) {
            let id = $("#id-update").val()
            let name = $("#name-update").val()
            let username = $("#username-update").val()
            let password = $("#password-update").val()
            let address = $("#user-address-update").val()
            let phone = $("#phone-update").val()
            let wallet = $("#wallet-update").val()
            let status = $("#status-update").val()
            if ($('#becomeSeller').prop('checked')) {
                status = 2
            }
            let role = $("#roles-update").val()
            let newUser = {
                id: id,
                name: name,
                username: username,
                password: password,
                address: address,
                phone: phone,
                wallet: wallet,
                status: status,
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                type: "PUT",
                url: "http://localhost:8080/users/" + id,
                data: JSON.stringify(newUser)
            })
            document.getElementById("updateAccountForm").submit()
        }
    })
}

let count = 0;
function login() {
    let username = $("#username_login").val()
    let password = $("#password_login").val()
    let newUser = {
        username: username,
        password: password,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/login",
        data: JSON.stringify(newUser),
        success: function (data) {
            // idUpdate = data.id
            sessionStorage.setItem("idUpdate", data.id)
            sessionStorage.setItem("token", data.accessToken)
            checkRoleAndStatusToLogin(data.id)
            getStoreIdToSession(data.id)
        },
        error: function () {
            let n
            let username = $("#username_login").val()
            let password = $("#password_login").val()
            if (username === "") {
                n = '<p style="color: red">**Please enter username!</p>'
                document.getElementById("usernameNotification").innerHTML = n
                document.getElementById("passwordNotification").innerHTML = ""
            } else if (password === "") {
                n = '<p style="color: red">**Please enter password!</p>'
                document.getElementById("usernameNotification").innerHTML = ""
                document.getElementById("passwordNotification").innerHTML = n
            } else {
                let n = '<p style="color: red">**Wrong account or password!</p>'
                document.getElementById("usernameNotification").innerHTML = n
                document.getElementById("passwordNotification").innerHTML = ""
            }
        }
    })
    event.preventDefault();
}

//Index.html account login
if (sessionStorage.getItem("login") !== null) {
    document.getElementById("showAccount").innerHTML = sessionStorage.getItem("login")
}

//Authentication and authorization
function checkRoleAndStatusToLogin(id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/users/" + id,
        success: function (data) {
            let loginContent
            let loginContentOutside
            if (data.status === 0) {
                let s = '<p class="pt-4" style="color: red">You have been blocked. Please contact support!!!</p>'
                document.getElementById("checkStatus").innerHTML = s
            } else {
                for (let i = 0; i < data.roles.length; i++) {
                    if (data.roles[i].name === "ADMIN") {
                        loginContent = '<a href="../admin/admin.html"><i class="fa fa-user"></i>Welcome! Admin</a>'
                        // window.location.href = "admin/admin.html"
                    } else {
                        loginContent = '<a href="../my-account.html"><i class="fa fa-user"></i>Welcome! ' +
                            data.name +
                            '</a>';
                        loginContentOutside = '<a href="my-account.html"><i class="fa fa-user"></i>Welcome! ' +
                            data.name +
                            '</a>';
                        count += 1
                    }
                    sessionStorage.setItem("count", count)
                    sessionStorage.setItem("login", loginContent)
                    sessionStorage.setItem("loginOutside", loginContentOutside)
                    window.location.href = "store/home.html"
                }
            }
        }
    })
}

//Logout
function logout() {
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("loginOutside")
    sessionStorage.removeItem("idUpdate")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("count")
    sessionStorage.removeItem("idStore")
}


//Change Password
function changePassword() {
    if ($("#new-pw").val() !== $("#conf-new-pw").val()) {
        Swal.fire(
            'Wrong confirm password',
            'Confirm password is incorrect',
            'warning'
        )
    } else if ($("#new-pw").val() === "" || $("#conf-new-pw").val() == "") {
        Swal.fire(
            'Empty input',
            'Please enter password',
            'warning'
        )
    } else {
        Swal.fire({
            title: 'Change Password ?',
            text: "You will be log out after changing password",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#7c7c7c',
            confirmButtonText: 'Change'
        }).then((result) => {
            if (result.isConfirmed) {
                let idChange = sessionStorage.getItem("idUpdate")
                let password = $("#new-pw").val()
                let newUser = {
                    password: password
                }
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                    type: "PUT",
                    url: "http://localhost:8080/users/change/" + idChange,
                    data: JSON.stringify(newUser)
                    // success: function (data){
                    //     $("#message-password").val("Change success")
                    // }
                })
                event.preventDefault();
                logout()
                document.getElementById("changePasswordForm").submit()
                window.location.href = "login.html"
                // $.ajax({
                //     headers:{
                //         Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                //     },
                //     type: "GET",
                //     url: "http://localhost:8080/users/" + idChange,
                // success: function (data){
                //     let id = $("#id-change").val(data.id)
                //     let name = $("#name-change").val(data.name)
                //     let username = $("#username-change").val(data.username)
                //     let password = $("#password-change").val(data.password)
                //     let address = $("#address-change").val(data.address)
                //     let phone = $("#phone-change").val(data.phone)
                //     let wallet = $("#wallet-change").val(data.wallet)
                //     let status = $("#status-change").val(data.status)
                //     let role = $("#role-change").val(data.roles)
                // }
            }
        })
    }
}
function checkStore() {
    let check = sessionStorage.getItem("count")
    if (check == 1){
        Swal.fire("You need an account detail to register as a seller")
    }else{
        window.location.href="store/store.html"
    }
}

function checkPaymentStore() {
    let check = sessionStorage.getItem("count")
    if (check == 1){
        document.getElementById("paymentStore").hidden = true
        document.getElementById("pending").hidden = true
    }
}

function getStoreIdToSession(id) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/store/",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].user.id === id) {
                    sessionStorage.setItem("idStore", data[i].id)
                }
            }
        }
    });
}



