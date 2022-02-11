var datos = [];
var fechaActual = [];
var pasados = [];


async function getData2() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json =>{datos.push(json)});
    console.log(datos[0].fechaActual);
    fechaActual.push(datos[0].fechaActual);
    pasados.push(...datos[0].eventos.filter(item =>item.date < fechaActual));
    console.log(pasados)

    displayFicha(pasados)

}
getData2();

function displayFicha(data){
    let toDisplay = [];
    if(data && data.length > 0){
        toDisplay.push(...data);
    }else{
        toDisplay.push(datos);
    }
console.log(toDisplay)
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
