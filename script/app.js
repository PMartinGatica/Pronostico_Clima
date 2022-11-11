const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const extendido = document.querySelector('#extendido');

let url = 'https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo';

fetch(url)
    .then(response => response.json())
    .then(data => {
        mostrarDatos(data);
    });
        

mostrarDatos = (datos) => {
    climaActual(datos);
    climaExtendido(datos);
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
        let icono = iconoPrecipitaciones(precipitacionTotal);

        temperaturaActual.innerHTML += TemperaturaActual(icono ,temperaturaMaxima,velocidadVientoMaxima);
        
        // const row = document.createElement('div')
        // row.classList.add("row mt-3")
        // const divCol = document.createElement('div')
        // divCol.classList.add('col');
        // divCol.classList.add('d-flex');
        // divCol.classList.add('justify-content-center');
        // divCol.classList.add('align-items-center');
        // const divCard = document.createElement('div');
        // divCard.classList.add('card')
        // const iconoClima = document.createElement('div');
        // iconoClima.innerHTML = `${icono}`;
        // const divCardBody = document.createElement('div');
        // divCardBody.classList.add('card-body')


        // // const fechaActual = document.createElement('p');
        // // fechaActual.innerHTML = `Fecha de Hoy: ${fechaDate}`;
        // // fechaActual.classList.add('text-xl')

        // const tempMaxima = document.createElement('h5');
        // tempMaxima.innerHTML = `${temperaturaMaxima}&#8451;`;
        // tempMaxima.classList.add('card-title')


        // // const tempMinima = document.createElement('p');
        // // tempMinima.innerHTML = `Temperatura Min: ${temperaturaMinima} &#8451;`;
        // // tempMinima.classList.add('text-xl')

        // // const sensacionTerm = document.createElement('p');
        // // sensacionTerm.innerHTML = `Sensacion Termica: ${sensacionTermicaMaxima} &#8451;`;
        // // sensacionTerm.classList.add('text-xl')

        // // const precipitacionTot = document.createElement('p');
        // // precipitacionTot.innerHTML = ` : ${precipitacionTotal} mm`;
        // // precipitacionTot.classList.add('text-xl')
        
        // const vientoMax = document.createElement('h6');
        // vientoMax.innerHTML = `Viento: ${velocidadVientoMaxima} km/h;`;
        // vientoMax.classList.add('card-subtitle')
        // vientoMax.classList.add('text-muted')
        // vientoMax.classList.add('mb-2')

        // const resultadoDiv = document.createElement('div')
        // resultadoDiv.classList.add("row")
        // resultadoDiv.classList.add("mt-3")
        // resultadoDiv.appendChild(divCol);
        // resultadoDiv.appendChild(divCard);
        // resultadoDiv.appendChild(iconoClima);
        // resultadoDiv.appendChild(divCardBody);
        // resultadoDiv.appendChild(tempMaxima);
        // // resultadoDiv.appendChild(tempMinima);
        // // resultadoDiv.appendChild(sensacionTerm);
        // // resultadoDiv.appendChild(precipitacionTot);
        // resultadoDiv.appendChild(vientoMax);
        // resultado.appendChild(resultadoDiv)

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
            const fechaDate = formatoSem[index];
            console.log(fechaDate);
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

            const iconoClima = document.createElement('div');
            iconoClima.innerHTML = `${icono}`;

            const fecha = document.createElement('p');
            fecha.innerHTML = `Fecha de Hoy: ${fechaDate}`;
            fecha.classList.add('text-xl')

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
            vientoMax.innerHTML = `Viento: ${velocidadVientoMaxima } km/h;`;
            vientoMax.classList.add('text-xl')

            const extendidoDiv = document.createElement('div');
            extendidoDiv.classList.add('text-center', 'text-white')
            extendidoDiv.appendChild(iconoClima);
            extendidoDiv.appendChild(fecha);
            extendidoDiv.appendChild(tempMaxima);
            extendidoDiv.appendChild(tempMinima);
            extendidoDiv.appendChild(sensacionTerm);
            extendidoDiv.appendChild(precipitacionTot);
            extendidoDiv.appendChild(vientoMax);
            extendido.appendChild(extendidoDiv)
        }
    }

    function iconoPrecipitaciones(precipitations){
        if (precipitations === 0) 
        {return `<img src="./img/animated/clear-day.svg" alt="Soleado">`;}

        if (precipitations <= 2) {return `<img class="card-img-top" src='./img/animated/rainy-1-day.svg' alt='Lluvias débiles'>`;}
        if (precipitations <= 30) {return `<img class="card-img-top" src='./img/animated/rainy-2-day.svg' alt='Lluvia'>`;};
        if (precipitations <= 60) {return `<img class="card-img-top" src='./img/animated/rainy-3-day.svg' alt='Lluvias muy fuertes'>`}
        else {return `<img class="card-img-top" src='./img/animated/scattered-thunderstorms-day.svg' alt='Lluvias muy fuertes'>`;}
    }

    const TemperaturaActual = (
        icono,
        temperaturaMaxima,
        velocidadVientoMaxima
      ) => {
        let result = "" 
        return (result += `
        <div class="container temperaturaActual">
        <div class="row mt-3">
            <div class="col d-flex justify-content-center align-items-center">
                <div class="card tarjetaActual">
                    ${icono}
                    <div class="card-body"><h5 class="card-title mb-3">Temperatura</h5>
                        <h5 class="card-title mb-3 fw-bold text-uppercase text-align-center">${
                            temperaturaMaxima
                           } °C </h5>
                        <h6 class="card-subtitle text-muted mb-2">Viento : ${velocidadVientoMaxima} km/h </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
              `);
      };


