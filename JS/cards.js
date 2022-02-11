var datos = []

async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json => {datos.push(...json.eventos)})
console.log(datos)
    var id = datos.map(date => date.id)

    console.log(id)
    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    console.log(selectedId)
    var lista = datos.find(function(lista){
        return lista.id == selectedId
    })


    var html = 
                    `    
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
    
    document.querySelector("#mainCards").innerHTML = html;
}
getData()
