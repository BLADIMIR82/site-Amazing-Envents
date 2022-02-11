
var inputBuscador = document.querySelector("#searchInput");
var checkboxSelected = [];
var datos = [];
var elementosFiltrados = []
var select = document.querySelector("#select")

async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json =>{datos.push(...json.eventos)})
    console.log(datos)
    displayFicha(datos)
    
    let unica = datos.map(lista =>lista.category).sort();
    console
    const dataArray = new Set(unica);
    let fecha =[...dataArray];
    var inputCheckbox = "";
    fecha.forEach(date =>{

        inputCheckbox += `<label class="micheckbox" ><input type="checkbox" class="checkboxCont" value="${date}"> ${date}</label>`        
    })
    document.querySelector("#checkboxEvento").innerHTML = inputCheckbox;
    
   
    let checkBox = document.querySelectorAll(".checkboxCont");
    checkBox.forEach(check =>{
        check.addEventListener("change", function(){

            if(check.checked == true){
                checkboxSelected.push(check.value);
                dataCheck(checkboxSelected);
            }
            else{
                checkboxSelected = checkboxSelected.filter(checkValue => checkValue !== check.value)
                dataCheck(checkboxSelected);
            }

        })
    })
    console.log(checkboxSelected)
    console.log(datos);
}

getData()

    inputBuscador.addEventListener("keyup",buscador);


function buscador(event){
    let val = event.target.value;
    console.log(val);
    let data = datos.filter(lista => lista.name.toLowerCase().includes(val.toLowerCase()) || lista.date.includes(val)); 
    console.log(datos);
    displayFicha(data);
    console.log(data);
}

function displayFicha(data){ 
    let toDisplay = [];
    if(data && data.length > 0){
        toDisplay.push(...data);
    }else{
        toDisplay.push(...datos);
    }

    var html = "";

    toDisplay.map(lista =>{ 

      html += `    
      </div>
       <div class="contenedor1">
         <a href="cards.html?id=${lista.id}">${lista.name}</a>
         <div class="Design5">
           <img
             class="imgdiv"
             src="${lista.image}"
             alt="img"/>
           <div class="desing6">
             <p><b>Fecha:</b> ${lista.date}<br>
             <b>Descripcion</b>: ${lista.description}<br>
             <b>Categoria</b>: ${lista.category}<br>
              <b<lugar:</b> ${lista.place}</p>
             <div class="fecha">
               <p>Capacidad: ${lista.capacity}<br>
               Precio: $ ${lista.price}</p>
             </div>
           </div>
         </div>
       </div>
      
       `
    })


document.querySelector("#mainCards").innerHTML = html;

}


/* Checkbox */

function dataCheck(checkboxSelected){
    let data = [...datos];
    console.log(data)
    let filtroFechas = [];

    if(checkboxSelected.length > 0){
        checkboxSelected.forEach (fecha =>{

            let filtrado = data.filter(evento =>{

                return evento.category == fecha;
            })
            filtroFechas.push(...filtrado);
        })
    }
    displayFicha(filtroFechas);
} 



var datos2 = [];
var fechaActual = [];
var pasados = [];


async function getData2() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json =>{datos2.push(json)})
    console.log(datos2);
    console.log(datos2[0].fechaActual);
    fechaActual.push(datos2[0].fechaActual);
    pasados.push(...datos2[0].eventos.filter(item =>item.date < fechaActual));
    console.log(pasados);

}
getData2();


select.addEventListener("change",function(evento){

    console.log(evento)
            if (evento.target.value == "pasados"){
                elementosFiltrados = []
                elementosFiltrados.push(...datos2[0].eventos.filter(item =>item.date < fechaActual))
                console.log(elementosFiltrados)
            } 
                else if( evento.target.value == "proximos"){
                    elementosFiltrados = []
                    elementosFiltrados.push(...datos2[0].eventos.filter(item =>item.date > fechaActual))
                console.log(elementosFiltrados)
                }
                else {console.log("seleccione") 
                elementosFiltrados = []
                elementosFiltrados.push(...datos2[0].eventos)
            console.log(elementosFiltrados)
            }
            displayFicha(elementosFiltrados)
        }
    
        )