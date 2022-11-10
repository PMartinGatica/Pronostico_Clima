const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');

let url = 'https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo';

fetch(url)
    .then(response => response.json())
    .then(data => {
        mostrarDatos(data);
    });
        

mostrarDatos = (datos) => {
    climaActual(datos);
    climaExtendido(datos);
    iconoPrecipitaciones(datos)

}


function climaActual(datos){
    const { hourly:{time,temperature_2m, apparent_temperature, precipitation, windspeed_10m} } = datos;
        const fecha = time[0];
        var fechaDate = formatoFechaActual(fecha);
        //temperatura maximas del dia  //
        let temperaturaMaxima = (Math.max(...temperature_2m.slice(0,24)));
        // console.log(temperaturaMaxima);
        //temperatura minimas del dia
        let temperaturaMinima = (Math.min(...temperature_2m.slice(0,24)));
        // console.log(temperaturaMinima);
        //sensacion termica maximas del dia
        let sensacionTermicaMaxima = (Math.max(...apparent_temperature.slice(0,24)));
        // console.log(sensacionTermicaMaxima);
        //presipitacion total del dia
        let precipitacionTotal = (precipitation.slice(0,24).reduce((a,b) => a + b, 0));
        // console.log(precipitacionTotal);
        //velocidad del viento maxima del dia
        let velocidadVientoMaxima = (Math.max(...windspeed_10m.slice(0,24)));
        // console.log(velocidadVientoMaxima);    
        
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
    // console.log(`${dia}/${mes}/${anio}`);
    return (`${dia}/${mes}/${anio}`);
}

function formatoFechaSemanal(fecha){
    dateSem = [];
    const inicio = new Date(fecha[0]);
    const fin = new Date(fecha[167]);
    const UN_DIA_EN_MILISEGUNDOS = 1000 * 60 * 60 * 24;
    const formateadorFecha = new Intl.DateTimeFormat({ dateStyle: 'medium', })
    for (let i = inicio; i <= fin; i = new Date(i.getTime() + UN_DIA_EN_MILISEGUNDOS)) {
        dateSem.push(formateadorFecha.format(i));
    }
    return dateSem;
}



function climaExtendido (datos){
    const { hourly:{time,temperature_2m, apparent_temperature, precipitation, windspeed_10m} } = datos;

        var formatoSem = formatoFechaSemanal(time);
        for (let index = 0; index < formatoSem.length; index++) {
            const element = formatoSem[index];
            console.log(element);
            //temperatura maximas del dia  //
            let temperaturaMaxima = (Math.max(...temperature_2m.slice(index*24,(index+1)*24)));
            console.log(temperaturaMaxima);
            //temperatura minimas del dia
            let temperaturaMinima = (Math.min(...temperature_2m.slice(index*24,(index+1)*24)));
            console.log(temperaturaMinima);
            //sensacion termica maximas del dia
            let sensacionTermicaMaxima = (Math.max(...apparent_temperature.slice(index*24,(index+1)*24)));
            console.log(sensacionTermicaMaxima);
            //presipitacion total del dia
            let precipitacionTotal = (precipitation.slice(index*24,(index+1)*24).reduce((a,b) => a + b, 0));
            console.log(precipitacionTotal);
            //velocidad del viento maxima del dia
            let velocidadVientoMaxima = (Math.max(...windspeed_10m.slice(index*24,(index+1)*24)));
            console.log(velocidadVientoMaxima);
            let icono = iconoPrecipitaciones(precipitacionTotal);
            console.log(icono);
        }
    }

    function iconoPrecipitaciones(precipitations){
        if (precipitations === 0) 
        {return `src='./images/icons/animated/clear-day.svg' alt='soleado'`;}

        if (precipitations <= 2) {return `src='./images/icons/animated/rainy-1-day.svg' alt='Lluvias débiles'`;}
        if (precipitations <= 30) {return `src='./images/icons/animated/rainy-2-day.svg' alt='Lluvia'`;};
        if (precipitations <= 60) {return `src='./images/icons/animated/rainy-3-day.svg' alt='Lluvias muy fuertes'`}
        else {return `src='./images/icons/animated/rainy-3-day.svg' alt='Lluvias muy fuertes'`;}
    }


