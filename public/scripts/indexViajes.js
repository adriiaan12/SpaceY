document.getElementById("BotonActualizare").addEventListener("click", function (event) {
    event.preventDefault();
    let formGroups = document.querySelectorAll(".form-group");
    let btnConfirmar = document.getElementById("BotonActualizar");
    formGroups.forEach(group => {
        group.style.display = "block"; // Mostrar los inputs
    });
    btnConfirmar.style.display = "block"; // Mostrar el botón de confirmar
});
document.getElementById("updateForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let actionUrl = "";
    let method = "";
    let viajeId = document.getElementById("viajeId").value.trim();

    if (event.submitter && event.submitter.id === "BotonBorrarTodo") {
        actionUrl = "/viajes";
        method = "DELETE";
    } else if (event.submitter && event.submitter.id === "BotonVerTodo") {
        getAllViajes();
        return;
    } else if (event.submitter && (event.submitter.id === "BotonBorrar" || event.submitter.id === "BotonActualizar" || event.submitter.id === "BotonVer")) {
        if (!viajeId) {
            alert("Por favor, ingresa un ID válido.");
            return;
        }

        if (event.submitter.id === "BotonActualizar") {
            actionUrl = "/viajes/" + viajeId;
            method = "PUT";
        } else if (event.submitter.id === "BotonBorrar") {
            actionUrl = "/viajes/" + viajeId;
            method = "DELETE";
        }
        else if (event.submitter.id === "BotonVer") {
            getViaje(viajeId);
            return;
        }
    } else {
        alert("Acción no reconocida.");
        return;
    }

    let formData = new FormData(this);
    let jsonData = {};
    formData.forEach((value, key) => jsonData[key] = value);

    fetch(actionUrl, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: method !== "DELETE" ? JSON.stringify(jsonData) : null
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            alert("Operación realizada con éxito");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un problema con la solicitud");
        });
});