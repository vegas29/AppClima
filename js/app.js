const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e){
    e.preventDefault();
    console.log('Buscando el clima...');

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;



    // console.log(ciudad);
    // console.log(pais);

    if(ciudad === '' || pais === ''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    //Consultar la API

    consultarAPI(ciudad, pais);

}

function mostrarError(mensaje){
    const alerta = document.querySelector('bg-red-100');

    if(!alerta){
        const alerta = document.createElement('DIV');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
        'max-w-md', 'mx-auto' , 'mt-6', 'text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold"Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(()=>{
            alerta.remove();
        }, 3000);
    }
   
}

function consultarAPI(ciudad,pais){
    const appId = '568fc38779400334e340eee345300d0c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
    Spinner();

    fetch(url)
    .then(resp => resp.json())
    .then(respo => {
        limpiarHTML();
        console.log(respo);
        if(respo.cod === "404"){
            mostrarError('Ciudad no encontrada');
            return;
        }

        //Imprimir el html
        mostrarClima(respo);
    });
}

function mostrarClima(datos){
    
    const {name, main:{temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinCentigrados(temp);
    const max = kelvinCentigrados(temp_max);
    const min = kelvinCentigrados(temp_min);

    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');


    const tempMax = document.createElement('P');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('P');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    

    resultado.appendChild(resultadoDiv);
}

const kelvinCentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){
    limpiarHTML();
    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}