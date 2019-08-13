# TableHTMLExport V2.0.0
Plugin de *Jquery* que exporta una tabla HTML a JSON, CSV, TXT, o PDF y forzar al navegador a descargar el archivo generado.

*Jquery* plugin that exports an HTML table to JSON, CSV, TXT, or PDF and force the browser to download the generated file.

## Requsitos | Requirements
 - [Jquery](https://jquery.com/) 
   
 
 
## Instalacion | Install

Puede descargar el archivo *tableHTMLExport.js* que esta en la carpeta *src* de este repositorioo o utilizar el CDN

You can download the *tableHTMLExport.js* file that is in the *src* folder of this repository or use the CDN

### CDN
```html
<script src="https://rawcdn.githack.com/FuriosoJack/TableHTMLExport/v2.0.0/src/tableHTMLExport.js"></script>
```

## Opciones 

- type: Opcion(string) para especificar el tipo de exportacion (csv,txt,json,pdf)
- separator: Opcion(string) que sera util solo cuando se exportar a *csv* en donde se especifica el caracter que servira como separador entre columnas *default: ,*
- newline: Opcion(string) que sera util solo cuando se exportar a *csv* en donde se especifica los caracteres para una nueva linea *default: \r\n*
- ignoreColumns: Opcion(string) para especificar el con los selectores de css de las columnas que se ignoraran *default: ''*
- ignoreRows: Opcion(string) para especificar los selectores de css de las columnas que se ignoraran *default: ''*
- htmlContent: Opcion(bool) para indicar si el contenido de la tabla a exportar tiene codigo HTML *default: false*
- consoleLog: Opcion(bool) para indicar si se quiere que se vean los logs del proceso de exportacion *default: false*
- trimContent: Opcion(bool) que sera util solo cuando se exporta a *csv* y la cual recorta el contenido de las etiquetas individuales *\<th>*, *\<td>*  de los espacios en blanco. Esto producirá una salida válida incluso si la tabla está sangrada *default: true*
- quoteFields Opcion(bool) que sera util solo cuando se exporta a *csv* y la cual cita campos *default: true*.
- filename: Opcion(string) nombre con el que el archivo se va a guardar *default: tableHTMLExport.csv*

## Options
- type: Option (string) to specify the type of export (csv, txt, json, pdf)
- separator: Option (string) that will be useful only when exporting to *csv* where the character that will serve as separator between columns is specified *default: ,*
- newline: Option (string) that will be useful only when exporting to *csv* where the characters are specified for a new line *default: \r\n*
- ignoreColumns: Option (string) to specify the with the css selectors of the columns that will be ignored *default: ''*
- ignoreRows: Option (string) to specify the css selectors of the columns to be ignored *default:''*
- htmlContent: Option (bool) to indicate if the content of the table to be exported has HTML code *default:false*
- consoleLog: Option (bool) to indicate if you want to see the logs of the export process *default: false*
- trimContent: Option (bool) that will be useful only when exported to * csv * and which trims the contents of the individual tags *\<th>*, *\<td>* of the blanks. This will produce a valid output even if the table is indented. *default: true*
- quoteFields Option (bool) that will be useful only when exported to * csv * and which cites fields *default: true*.
- filename: Option (string) name with which the file is to be saved *default: tableHTMLExport.csv*

# Ejemplos | Examples


```html
<table id="tableCompany">
  <thead>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th class='acciones'>Country</th>
  </tr>    
  </thead>
  <tbody>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td id="primero">Maria Anders</td>
      <td class="acciones">Germany</td>
    </tr>
    <tr>
      <td>Ernst Handel</td>
      <td>Roland Mendel</td>
      <td class="acciones">Austria</td>
    </tr>
    <tr>
      <td>Island Trading</td>
      <td>Helen Bennett</td>
      <td>UK</td>
    </tr>
    <tr id="ultimo">
      <td>Magazzini Alimentari Riuniti</td>
      <td>Giovanni Rovelli</td>
      <td>Italy</td>
    </tr>
  </tbody>  
</table>
```


## Exportar a JSON | Export To JSON

[Ejemplo Funcional | Functional Example](https://codepen.io/furiosojack/pen/JmyExX?editors=1111)

```javascript
$("#tableCompany").tableHTMLExport({type:'json',filename:'tablaLicencias.json',ignoreColumns:'.acciones,#primero',ignoreRows: '#ultimo'});
```

Resultado: tablaLicencias.json
```json
{
  "header": [
    "Company",
    "Contact"
  ],
  "data": [
    [
      "Alfreds Futterkiste"
    ],
    [
      "Ernst Handel",
      "Roland Mendel"
    ],
    [
      "Island Trading",
      "Helen Bennett",
      "UK"
    ]
  ]
}

```
## Exportar a CSV | Export To CSV

```javascript
$("#tableCompany").tableHTMLExport({type:'csv',filename:'tablaLicencias.csv',ignoreColumns:'.acciones,#primero',ignoreRows: '#ultimo'});
```
Resultado: 
```csv
"Company","Contact"
"Alfreds Futterkiste","Ernst Handel","Roland Mendel"
"Island Trading","Helen Bennett"
"UK",
```

## Exportar a PDF | Export To PDF
[Ejemplo Funcional | Functional Example ](https://codepen.io/furiosojack/pen/gBxmvQ?editors=1111) 

Para exportar a PDF es requerido la libreria [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)
To export to PDF the library is required [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)

```javascript
$("#tableCompany").tableHTMLExport({type:'pdf',filename:'tablaLicencias.pdf',ignoreColumns:'.acciones,#primero',ignoreRows: '#ultimo'});
```

Resultado | Result:  
![alt text][exporPDF]

[exporPDF]: https://image.ibb.co/kZvgB9/Captura.png "Como ser ve la exportacion PDF"



