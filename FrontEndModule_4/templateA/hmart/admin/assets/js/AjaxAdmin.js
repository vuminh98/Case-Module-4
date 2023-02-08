// Show Active Users
function getAllActiveUsers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin",
        success: function (user) {
            let content = ""
            for (let i = 0; i < user.length; i++) {
                content += '<tr>'
                content += displayActiveUsers(user[i]);
                content += '</tr>'
            }
            document.getElementById("activeUsersList").innerHTML = content;
        }
    })
}

function displayActiveUsers(user) {
    let a = ""
        if (user.status === 1) {
            a += `<td>${user.id}</td>` +
                `<td>${user.username}</td>` +
                `<td>${user.name}</td>` +
                `<td>${user.address}</td>` +
                `<td>${user.phone}</td>`
            a += '<td>'
            for (let i = 0; i < user.roles.length; i++) {
                a += `<p>${user.roles[i].name}</p>`
            }
            a += '</td>' +
                `<td><a href="#" class="view" onclick="blockUser(${user.id})">Block</a></td>`;
        }
        return a
    }

// Show Blocked Users

function getAllBlockedUsers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin",
        success: function (user) {
            let content = ""
            for (let i = 0; i < user.length; i++) {
                content += '<tr>'
                content += displayBlockedUsers(user[i]);
                content += '</tr>'
            }
            document.getElementById("blockedUsersList").innerHTML = content;
        }
    })
}
function displayBlockedUsers(user) {
    let b = ""
    if (user.status === 0) {
        b += `<td>${user.id}</td>` +
            `<td>${user.username}</td>` +
            `<td>${user.name}</td>` +
            `<td>${user.address}</td>` +
            `<td>${user.phone}</td>`
        b += '<td>'
        for (let i = 0; i < user.roles.length; i++) {
            b += `<p>${user.roles[i].name}</p>`
        }
        b += '</td>' +
        `<td><a href="#" class="view" onclick="activeUser(${user.id})">Active</a></td>`;
    }
    return b
}
//Show Pending Users
function getAllPendingUsers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin",
        success: function (user) {
            let content = ""
            for (let i = 0; i < user.length; i++) {
                content += '<tr>'
                content += displayPendingUsers(user[i]);
                content += '</tr>'
            }
            document.getElementById("pendingUsersList").innerHTML = content;
        }
    })
}

function displayPendingUsers(user) {
    let p = ""
    if (user.status === 2) {
        p += `<td>${user.id}</td>` +
            `<td>${user.username}</td>` +
            `<td>${user.name}</td>` +
            `<td>${user.address}</td>` +
            `<td>${user.phone}</td>`
        p += '<td>'
        for (let i = 0; i < user.roles.length; i++) {
            p += `<p>${user.roles[i].name}</p>`
        }
        p += '</td>' +
            `<td><a href="#" class="view" onclick="becomeSellerButton(${user.id})">Become Seller</a></td>`;
    }
    return p
}

//Block Button
function blockUser(id) {
    Swal.fire({
        title: 'Block User',
        text: "Are you sure to want to block this user ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#7c7c7c',
        confirmButtonText: 'Block'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Blocked!',
                'User is blocked.',
                'success'
            )
            let newStatus = 0;
            let newUserStatus = {
                id: id,
                status: newStatus
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "PUT",
                url: "http://localhost:8080/admin/id=" + id + "&status=" + newStatus,
                data: JSON.stringify(newUserStatus),
                success: function () {
                    getAllActiveUsers()
                    getAllBlockedUsers()
                    getAllPendingUsers()
                }
            })
            event.preventDefault();
        }
    })
}

// Active Button
function activeUser(id) {
    Swal.fire({
        title: 'Activate User',
        text: "Are you sure to want to activate this user ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7c7c7c',
        confirmButtonText: 'Activate'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Activated!',
                'User is activated.',
                'success'
            )
            let newStatus = 1;
            let newUserStatus = {
                id: id,
                status: newStatus
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "PUT",
                url: "http://localhost:8080/admin/id=" + id + "&status=" + newStatus,
                data: JSON.stringify(newUserStatus),
                success: function () {
                    getAllActiveUsers()
                    getAllBlockedUsers()
                    getAllPendingUsers()
                }
            })
            event.preventDefault();
        }
    })
}

//Become buyer button
function becomeSellerButton(id) {
    Swal.fire({
        title: 'Become Seller',
        text: "Are you sure to want to change this user ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7c7c7c',
        confirmButtonText: 'Change'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Changed!',
                'User becomes seller now.',
                'success'
            )
            let newUserRole = {
                id: id,
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "PUT",
                url: "http://localhost:8080/admin/id=" + id + "&add_role_seller",
                data: JSON.stringify(newUserRole),
                success: function () {
                    getAllActiveUsers()
                    getAllBlockedUsers()
                    getAllPendingUsers()
                }
            })
            event.preventDefault();
        }
    })
}

//Logout
function logout() {
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("idUpdate")
    sessionStorage.removeItem("token")
}