let entryModel;
let actualView;

function preloadModule(viewName) {
    return $.get('Views/Modules/' + viewName + '.html').then(html => $(html)[0]);
}

preloadModule("entry_element")
    .done(function (data) {
        entryModel = data;
    })
    .fail(function (xhr, status, error) {
        console.error('Error al cargar módulo skills_data: ', error);
    });

function loadPartialView(viewName, divClass = null, isAppend = null) {
        $.ajax({
            url: 'Views/' + viewName + '.html',
            method: 'GET',
            success: function (data) {
                divClass === null ? console.error(`Elemento contenedor (${divClass}) no definido`) : (isAppend ? $(divClass).append(data) : $(divClass).html(data));
            },
            error: function (xhr, status, error) {
                console.error('Error al cargar la vista parcial: ', error)
            }
        });
}

function showAlert(type, text){
    var textAlert = text;

    Swal.fire({
        title: type == "error" ? "Error" : (type == "warning" ? "Warning" : "Success"),
        text: textAlert,
        icon: type,
        confirmButtonText: "Aceptar"
    });
}