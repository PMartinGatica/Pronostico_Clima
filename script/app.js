const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');

let url = 'https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo';

fetch(url)
    .then(response => response.json())
    .then(data => {
        mostrarDatos(data)});

mostrarDatos = (datos) => {
    climaActual(datos);

}
function climaActual(datos){
    const { hourly:{time,temperature_2m, apparent_temperature, precipitation, windspeed_10m} } = datos;
    for (let index = 0; index < 1; index++) {
        const fecha = time[index];
        formatoFechaActual(fecha);
        //temperatura maximas del dia  //
        
    }


        let fechaDate = time[0];

        let temperaturaMaxima = (Math.max(...temperature_2m.slice(0,24)));
        console.log(temperaturaMaxima);
        //temperatura minimas del dia
        let temperaturaMinima = (Math.min(...temperature_2m.slice(0,24)));
        console.log(temperaturaMinima);
        //sensacion termica maximas del dia
        let sensacionTermicaMaxima = (Math.max(...apparent_temperature.slice(0,24)));
        console.log(sensacionTermicaMaxima);
        //presipitacion total del dia
        let precipitacionTotal = (precipitation.slice(0,24).reduce((a,b) => a + b, 0));
        console.log(precipitacionTotal);
        //velocidad del viento maxima del dia
        let velocidadVientoMaxima = (Math.max(...windspeed_10m.slice(0,24)));
        console.log(velocidadVientoMaxima);    
        
        const fechaActual = document.createElement('p');
        fechaActual.innerHTML = `Fecha de Hoy: ${fechaDate}`;
        fechaActual.classList.add('text-xl')

        const tempMaxima = document.createElement('p');
        tempMaxima.innerHTML = `Temperatura Max: ${temperaturaMaxima}&#8451;`;
        tempMaxima.classList.add('text-xl')


        const tempMinima = document.createElement('p');
        tempMinima.innerHTML = `Temperatura Min: ${temperaturaMinima} &#8451;`;
        tempMinima.classList.add('text-xl')

        const sensacionTerm = document.createElement('p');
        sensacionTerm.innerHTML = `Sensacion Termica: ${sensacionTermicaMaxima} &#8451;`;
        sensacionTerm.classList.add('text-xl')

        const precipitacionTot = document.createElement('p');
        precipitacionTot.innerHTML = `Lluvia : ${precipitacionTotal} mm`;
        precipitacionTot.classList.add('text-xl')
        
        const vientoMax = document.createElement('p');
        vientoMax.innerHTML = `Viento: ${velocidadVientoMaxima} km/h;`;
        vientoMax.classList.add('text-xl')

        const resultadoDiv = document.createElement('div');
        resultadoDiv.classList.add('text-center', 'text-white')
        resultadoDiv.appendChild(fechaActual);
        resultadoDiv.appendChild(tempMaxima);
        resultadoDiv.appendChild(tempMinima);
        resultadoDiv.appendChild(sensacionTerm);
        resultadoDiv.appendChild(precipitacionTot);
        resultadoDiv.appendChild(vientoMax);
        resultado.appendChild(resultadoDiv)

}

function formatoFechaActual(fecha){
    const fechaFormateada = new Date(fecha);
    const dia = fechaFormateada.getDate();
    const mes = fechaFormateada.getMonth()+1;
    const anio = fechaFormateada.getFullYear();
    console.log(`${dia}/${mes}/${anio}`);
    return (`${dia}/${mes}/${anio}`);
}
