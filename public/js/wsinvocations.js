function getMovie(movieId) {
    let myUrl = "/movies/" + movieId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function (data) {
            $("#resPelicula").html(JSON.stringify(data));
        },
        error: function (res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function postMovie() {
    $.ajax({
        type: "POST",
        url: "/movies",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "title": "Dunkirk",
            "director": "Christopher Nolan",
            "year": 2017
        }),
        success: function (data) {
            $("#resPelicula").html(data);
        },
        error: function (res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function getAllMovies() {
    let myUrl = "/movies";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function (data) {
            $("#resPelicula").html(JSON.stringify(data));
        },
        error: function (res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}

function getHello() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/",
        success: function (data) {
            $("#resGetHello").html(data);
        },
        error: function (res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function getHelloAndGoodbye() {
    $.when(
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/hello"
        }),
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/goodbye"
        })
    ).done(function (helloRes, goodbyeRes) {
        $("#resGetHello").html(helloRes[0]);
        $("#resGetGoodbye").html(goodbyeRes[0]);
    }
    ).fail(function (res) {
        alert("ERROR: " + res.statusText);
    });
}


function getViaje(viajeId) {
    let myUrl = "/viajes/" + viajeId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function (data) {
            $("#resViaje").html(JSON.stringify(data));
        },
        error: function (res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}

function postViaje() {
    $.ajax({
        type: "POST",
        url: "/viajes",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            "title": "Dunkirk",
            "director": "Christopher Nolan",
            "year": 2017
        }),
        success: function (data) {
            $("#resViaje").html(data);
        },
        error: function (res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function getAllViajes() {
    let myUrl = "/viajes";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function (data) {
            $("#resViaje").html(JSON.stringify(data));
        },
        error: function (res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}

function deleteViaje(viajeId) {  
    $.ajax({
        type: "DELETE",
        url: "/viajes/" + viajeId,
        success: function(data) {
            $("#resViaje").html(data.msg);
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}

function putViaje(viajeId, viajeData) {
    $.ajax({    
        type: "PUT",
        url: "/viajes/" + viajeId,
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify(viajeData),
        success: function(data) {
            data = JSON.parse(data);
            $("#resViaje").html(data.msg);
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    });
}