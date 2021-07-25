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
    
    const {main:{temp, temp_max, temp_min}} = datos;
    const centigrados = kelvinCentigrados(temp);
    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center');
    resultadoDiv.appendChild(actual);

    resultado.appendChild(resultadoDiv);
}

const kelvinCentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}