<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Crear Licencias</title>
<link href="../resources/assets/semantic/semantic.min.css" rel="stylesheet">
    <link href="../resources/assets/css/animate.css" rel="stylesheet">
    <script src="../resources/assets/js/alasql.js"></script>
    <script src="../resources/assets/js/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../resources/assets/semantic/semantic.min.js" type="text/javascript"></script>
    <script src="../resources/assets/js/table2csv.js" type="text/javascript"></script>

    <script src="../resources/assets/js/jspdf.min.js"></script>
    <script src="../resources/assets/js/jspdf.plugin.autotable.js"></script>
    <script src="../resources/assets/js/tableHTMLExport.js"></script>

    <!--
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>

    <script type="text/javascript" src="../resources/assets/js/tableExport/tableExport.js"></script>
    <script type="text/javascript" src="../resources/assets/js/tableExport/jquery.base64.js"></script>
    <script type="text/javascript" src="../resources/assets/js/tableExport/html2canvas.js"></script>
    <script type="text/javascript" src="../resources/assets/js/tableExport/jspdf/libs/base64.js"></script>-->



    <style type="text/css">
.main.container {
    margin-top: 2em;
}

</style>
</head>
<body>

<div class="ui modal">
    <div class="header">Resultados</div>
    <div class="scrolling content">
    <table class="ui celled table" id="tableLicenses">
    <thead>
    <tr>
    <th>Numero</th>
    <th>Username</th>
    <th>Password</th>
    <th class="acciones">Acciones</th>
    </tr>
    </thead>
    <tbody>
    <tr class="positive">
    <td>q</td>
    <td>s</td>
    <td>s</td>
    <td class="acciones">
    <button class="ui icon orange button" style="display:none;" onclick="tryCreate(this)" title="reenviar">
    <i class="redo icon"></i>
    </button>
    </td>
    </tr>
    <tr class="negative">
    <td>s</td>
    <td>df</td>
    <td>d</td>
    <td class="acciones">
    <button class="ui icon orange button" style="display:none;" onclick="tryCreate(this)" title="reenviar">
    <i class="redo icon"></i>
    </button>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <div class="actions">
    <button id="btnExportTable" class="ui right labeled icon orange button">
    Exportar
    <i class="share square icon"></i>
    </button>
    </div>
    </div>
    <div class="ui main text container">
    <div class="ui raised segment">
    <h4 class="ui header">Creador de licencias</h4>
<a class="ui orange right ribbon label"><?php echo $_SESSION['AUTH_AZURE'];?></a>
<form class="ui form">
    <div class="field">
    <label>Tipo de licencia</label>
<div class="ui selection dropdown">
    <input type="hidden" name="typeLincense" required>
<i class="dropdown icon"></i>
    <div class="default text"></div>
    <div class="menu">
<?php foreach($skus as $sku){?>
<div class="item" nlincenses="<?php echo ($sku['prepaidUnits']['enabled'] - $sku['consumedUnits']); ?>" data-value="<?php echo base64_encode(json_encode(array('skuId' => $sku['skuId'],'objectId' => $sku['objectId'], 'skuPartNumber' => $sku['skuPartNumber'])));?>"><?php echo $sku['skuPartNumber'];?></div>
    <?php	} ?>
</div>
</div>
</div>
<div class="field">
    <label>Cantidad</label>
    <input type="number" min="1" name="cant" placeholder="1"  required>
</div>
<div class="field">
    <label>Prefijo Usuarios</label>
<input type="text" name="prefixName" placeholder="username"  disabled>
</div>
<div class="field">
    <label>Password</label>
    <input type="text" name="password" placeholder="password"  disabled>
</div>
<button class="ui primary button">Enviar</button>
    </form>

    </div>
    </div>

    <template id="templateRowUser">
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td class="acciones">
    <button class="ui icon orange button" style="display:none;" onclick="tryCreate(this)" title="reenviar">
    <i class="redo icon"></i>
    </button>
    </td>
    </tr>
    </template>
    <script type="text/javascript">
//Armar el json de usuarios
var usersCreateModel = [];

//Evento cuando se da click en el boton exportar
$("#btnExportTable").click(function(e){


    //Se clona la tabla
    var newTable = $(".scrolling.content").clone();

    //Todos los tr
    var trs = newTable.find('tr');

    //El perimero es del los titulo añado un td del estado
    $(trs[0]).append("<th>Resultado</th>");

    //Rcorrido para insertar nuevo td
    for(i = 1; i < trs.length; i++){
        var tr = $(trs[i]);
        var newtd = "<td>" + (tr.hasClass('positive') ? "Creada" : "Fallida")+ "</td>";
        tr.append(newtd);
    }
    console.log(newTable.html());
    //Hace la exportacion
    newTable.find('table').first().table2csv({separator: ',',newline: '\r\n', quoteFields: true,excludeColumns: '.acciones', excludeRows: '',filename:'licencias.csv'});

});

/**
 * Hace la peticion para crear el usuario
 * @param userModel Json del modelo del usuario
 */
function requestStore(userModel)
{
    //busco el tr que tenga el id del modelo
    var rowUser = $("tr[idModel='"+ userModel.idModel +"']");

    var firstTD =  rowUser.find('td').first();

    $.ajax({
        'url': 'store.php',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(userModel),
        success: function(data,textStatus, jqXHR){ //http://api.jquery.com/jquery.ajax/


            //Se le añade clase de satisfactorio
            rowUser.addClass('positive');
            //Se quita el loading
            firstTD.html(userModel.idModel + ' <i class="icon checkmark"></i>');
        },
        error: function(jqXHR, textStatus, errorThrown){



            //Se le añade la clase error
            rowUser.addClass('error');

            var popupHtmlIcon = "data-html=\"<div class='header'>Detalle de error</div><div class='content'><p><b>Titulo: </b>" + jqXHR.responseJSON.title +"</p><p><b>Detalle: </b>" + jqXHR.responseJSON.description +"</p></div></div>\"";
            //Se quita el loading
            firstTD.html(userModel.idModel + '  <i class="icon close pulse animated infinite" ' + popupHtmlIcon+'></i>');
            //Efectos en los iciones con popup
            $('.icon').popup();

            if(jqXHR.status != 403){
                //El error es por que se acavaron las lisencias asi que no se permite reintentar
                // No se Mostrar el boton de reintentar
                rowUser.find("button").attr('style','display:block;');
            }


        }
    });

}


/**
 * Vuelve A realizar la peticion de la creacion del usuario cuando falla
 *
 * */
function tryCreate(buttomElement)
{
    console.log(buttomElement);
    //Sacar el idModel del  TR
    var idModel = $(buttomElement).closest('tr').attr('idModel');
    //Se busca el modelo del usuario
    var userModel = alasql('SELECT * FROM ? WHERE idModel = ' + idModel ,[usersCreateModel])[0];

    //busco el tr que tenga el id del modelo
    var rowUser = $("tr[idModel='"+ idModel +"']");

    //Ocultar el boton el boton de reintentar
    rowUser.find("button").attr('style','display:none;');

    //Remueve la clase de error al tr
    rowUser.removeClass('error');

    //Poner el icono de cargando
    rowUser.find('td').first().html(i +  ' <i class="cog loading icon"></i>');

    //Hacer la peticion de creacion
    requestStore(userModel);
}

/**
 * Hace esperar un promento el flujo de trabajo
 * @param ms
 * @returns {boolean}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


$('.ui.dropdown').dropdown({
    clearable: false,
    onChange: function(value, text, $selectedItem){//Cuando se cambia el valor del drodown
        //Activa input cantidad
        $("input[name='cant']").prop('disabled',false);
        //Activa inpuit prefijo
        $("input[name='prefixName']").prop('disabled',false);
        //Activa input del password
        $("input[name='password']").prop('disabled',false);
        //Se le asiga el maximo de licencias que se pueden ingresar
        $("input[name='cant']").attr('max',$selectedItem.attr('nlincenses'));
    }
});

//Efecto de quitar para mensajes de error
$('.message .close')
    .on('click', function() {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });

/**
 * Hace el marmado del nombre del cliente y envia las peticiones de creacion
 */
async function succesForm(event, fields)
{
    event.preventDefault();
    //Obtiene los datos de la licencia que estan en base 64 y en json String
    var licenseResource = JSON.parse(atob(fields.typeLincense));
    /*
            //Obtiene el template del tr para insertar en la tabla
            var templateRowUser = document.querySelector("#templateRowUser");

            //Se arma la url para hacer la peticion de numero desde el cual comenzar
            var urlLastNumer = "lastNumberLicense.php?prefixUsername=" + fields.prefixName + "&skuPartNumber=" + licenseResource.skuPartNumber;

            //Obtiene el numero del cual tiene que comenzar el conteo
            $.ajax({
                'url': urlLastNumer,
                type: 'GET',
                success: function (data, textStatus, jqXHR) { //http://api.jquery.com/jquery.ajax/
                    //Se recorre desde el numero que se recibe hasta un numero menor a la suma del numero recibido y la cantidad de usuariosç
                    var numerEnd = Number(data.number) + Number(fields.cant);
                    for(i = data.number; i < numerEnd; i++){

                        //Se crea el objeto Json del usuario
                        var userModel = {
                            idModel: i,
                            license: licenseResource,
                            nameUser: fields.prefixName + i,
                            password: fields.password
                        };
                        //Se añade al array de modelos
                        usersCreateModel.push(userModel);
                        //Se obtiene todos los tds del templete
                        tds = templateRowUser.content.querySelectorAll("td");

                        //Se asigna el numero del row que esl mismo idModel y el icono de loading
                        $(tds[0]).html(i +  ' <i class="cog loading icon"></i>');


                        //Se le asigna un id al td para luego si falla usarlo para buscarlo en usersCreateModel
                        tr = templateRowUser.content.querySelector("tr");

                        $(tr).attr('idModel',i);

                        //Se inserta el username
                        tds[1].textContent = userModel.nameUser + "@<?php echo $_SESSION['AUTH_AZURE'];?>";

                        //Se inserta el password
                        tds[2].textContent = userModel.password;

                        // Clone se clona y se inserta en la tabla
                        var tbody = document.querySelector("tbody");
                        var cloneRow = document.importNode(templateRowUser.content, true);
                        tbody.appendChild(cloneRow);
                    }

                    //Se pinta el modal
                    $('.ui.modal').modal({
                        closable: false
                    }).modal('show');

                    //Rcorriedo para envio de las peticiones
                    for(i = 0; i < fields.cant; i++){
                        //Se haga la peticion de creacion pasandole el modelo
                        requestStore(usersCreateModel[i]);

                        //Esperamos 3 segundos entre cada envio para evitar creacion de usuario cuando no existe licencia
                        /* console.log("Esperando... Siguiente");
                         await sleep(3000);
                         console.log("Siguiente :)");*
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });*/

    //Evitar que se haga rel submit del formulario
    //Se pinta el modal
    $('.ui.modal').modal({
        closable: false
    }).modal('show');
    return false;
}
$('.ui.form').form({
    on: 'blur',
    inline:true,
    fields: {
        typeLincense: {
            identifier  : 'typeLincense',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Ingrese el tipo de licencia'
                }
            ]
        },
        cant: {
            identifier  : 'cant',
            rules: [
                {
                    type   : 'empty',
                    prompt : 'Ingrese la cantidad de licencias.'
                }
            ]
        },
        prefixName: {
            identifier  : 'prefixName',
            rules: [
                {
                    type   : 'regExp[^[0-9a-zA-Z]+$]',
                    prompt : 'No cumple el formato: mayusculas o minusculas o numeros.'
                }
            ]
        },
        password: {
            identifier  : 'password',
            rules: [
                {
                    type   : 'regExp[^(?=.*[a-z])(?=.*[A-Z])(?=.*[#$^+=!*()@%&\\d]).{8,16}$]',
                    prompt : 'No cumple el formato: min:6 - max:16 caracteres, mayusculas y minusculas y almenos un numero o caractater especial como #$^+=!*()@%&'
                }
            ]
        }
    },
    onSuccess: succesForm
});
</script>
</body>
</html>
