var data = [] 
var categoriasTotal = []
var eventoPasados=[]
var infoTotal=[]
var masCapacidadGlobal = []
var porcentajeAsistencia = []


async function capturaJSON(){ 
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then (response => response.json())
    .then (json => {
                    data.push(...json.eventos), 
                    fechaPresente = json.fechaActual
                    })
    tabla()
    mayCapacidad()
    maxAudiencia()
    
}

capturaJSON()

function tabla(){
    var categorias = data.map(evento => evento.category) //
    console.log(categorias)
    eventoPasados = data.filter(evento => (evento.date < fechaPresente) && typeof evento.assistance == "number")
    console.log(eventoPasados)
    categoriasTotal = new Set (categorias) 
    console.log(categoriasTotal)

    var eventoRepetido=[]
    
    var ingreso = 0
    var capacidad = 0
    var asistencia = 0
    var categorias = ""
    // categoriasTotal -> sin repetidos  7
    categoriasTotal.forEach(categoria => { // 1 2
        eventoRepetido = eventoPasados.filter(evento => evento.category == categoria)
        // console.log(eventoRepetido)
        
            eventoRepetido.forEach(eventoR => { // 1 2 3
            categorias = eventoR.category
            console.log(categoria)
            ingreso = ingreso + eventoR.price*eventoR.assistance
            capacidad = capacidad + eventoR.capacity
            asistencia = asistencia + eventoR.assistance
            console.log(ingreso)
            })
            infoTotal.push({category: categorias, ingresoTotal: ingreso, asistencia: Math.round((asistencia*100)/ capacidad)})
            eventoRepetido=[]
            ingreso = 0
            capacidad = 0
            asistencia = 0
            categorias = ""   
        console.log(ingreso)
    })


    console.log(infoTotal) 
    desplegarTablaOne(infoTotal)
    function desplegarTablaOne(objectoDe){        
        objectoDe.forEach(categoriaInfo=>{
            document.querySelector('#nombre-categorias').appendChild(document.createElement('td')).innerHTML 
            = categoriaInfo.category 
            document.querySelector('#ingresos').appendChild(document.createElement('td')).innerHTML 
            = "$" + (new Intl.NumberFormat().format( categoriaInfo.ingresoTotal))
            document.querySelector('#asistencia').appendChild(document.createElement('td')).innerHTML 
            =  "%" +categoriaInfo.asistencia
            
        })

    }
}


function mayCapacidad(){
   var maxCapacidad = "" 
   var capMas = []
   capMas.push(...data)
   capMas.sort((a,b) => b.capacity - a.capacity)
    
maxCapacidad = capMas[0]
console.log(maxCapacidad)

document.getElementById("mayorCapacidad").appendChild(document.createElement("td")).innerHTML = maxCapacidad.name + " " + maxCapacidad.capacity + " Asistentes";

    }

function maxAudiencia(){
        var maxAud = "" 
        var menAud = ""
        var capMas = []
        capMas.push(...data)
        capMas.map(evento =>{
            evento.portAsist = (evento.assistance * 100) / evento.capacity 
        })
        capMas.sort((a,b) => b.portAsist - a.portAsist)
         
     maxAud = capMas[0]
     menAud = capMas[capMas.length-1]
     console.log(maxAud)
     console.log(menAud)

    
     
     document.getElementById("mayorAudiencia").appendChild(document.createElement("td")).innerHTML = maxAud.name ;
     document.getElementById("menorAudiencia").appendChild(document.createElement("td")).innerHTML = menAud.name ;
     }
    