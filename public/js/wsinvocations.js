function getViaje(viajeId) {
    let myUrl = "/viajes/" + viajeId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function (data) {
            let resultHTML = "<h3>Detalles del Viaje</h3>";
            resultHTML += "<ul>";
            resultHTML += "<li>";
                resultHTML += "<strong>ID:</strong> " + data._id + "<br>";
                resultHTML += "<strong>Nombre:</strong> " + (data.nombre || "N/A") + "<br>";
                resultHTML += "<strong>Apellidos:</strong> " + (data.apellidos || "N/A") + "<br>";
                resultHTML += "<strong>Correo:</strong> " + (data.correo || "N/A") + "<br>";
                resultHTML += "<strong>Teléfono:</strong> " + (data.telefono || "N/A") + "<br>";
                resultHTML += "<strong>Fecha de Salida:</strong> " + (data.fechaini || "N/A") + "<br>";
                resultHTML += "<strong>Fecha de Llegada:</strong> " + (data.fechafin || "N/A") + "<br>";
                resultHTML += "<strong>Cantidad:</strong> " + (data.cantidad || "N/A") + "<br>";
                resultHTML += "<strong>Cohete:</strong> " + (data.cohete || "N/A") + "<br>";
                resultHTML += "<strong>Plan Seleccionado:</strong> " + (data.plan || "N/A");
                resultHTML += "</li><hr>";
            resultHTML += "</ul>";
            $("#resViaje").html(resultHTML);
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
            alert("ERReOR: " + res.statusText);
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
            if (!Array.isArray(data)) {
                console.error("La respuesta no es un array:", data);
                $("#resViaje").html("<p>Error: la respuesta del servidor no es válida.</p>");
                return;
            }

            let resultHTML = "<h3>Lista de Viajes</h3>";
            resultHTML += "<ul>";

            data.forEach(viaje => {
                resultHTML += "<li>";
                resultHTML += "<strong>ID:</strong> " + viaje._id + "<br>";
                resultHTML += "<strong>Nombre:</strong> " + (viaje.nombre || "N/A") + "<br>";
                resultHTML += "<strong>Apellidos:</strong> " + (viaje.apellidos || "N/A") + "<br>";
                resultHTML += "<strong>Correo:</strong> " + (viaje.correo || "N/A") + "<br>";
                resultHTML += "<strong>Teléfono:</strong> " + (viaje.telefono || "N/A") + "<br>";
                resultHTML += "<strong>Fecha de Salida:</strong> " + (viaje.fechaini || "N/A") + "<br>";
                resultHTML += "<strong>Fecha de Llegada:</strong> " + (viaje.fechafin || "N/A") + "<br>";
                resultHTML += "<strong>Cantidad:</strong> " + (viaje.cantidad || "N/A") + "<br>";
                resultHTML += "<strong>Cohete:</strong> " + (viaje.cohete || "N/A") + "<br>";
                resultHTML += "<strong>Plan Seleccionado:</strong> " + (viaje.plan || "N/A");
                resultHTML += "</li><hr>";
            });

            resultHTML += "</ul>";
            $("#resViaje").html(resultHTML);
        },
        error: function (res) {
            console.error("ERROR:", res.status, res.statusText);
            $("#resViaje").html("<p>Error al obtener los datos.</p>");
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