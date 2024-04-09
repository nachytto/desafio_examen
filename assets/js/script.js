let data;
async function getApi() {
    try {
        const resultado = await fetch("https://mindicador.cl/api/");
        data = await resultado.json();
        const contenedorMonedas = document.getElementById("contenedor-moneda");
        for (let moneda in data) {
            if (data[moneda].codigo && data[moneda].nombre && data[moneda].unidad_medida && data[moneda].valor) {
                const getOpcion = document.createElement("option");
                getOpcion.text = `${data[moneda].nombre}`;
                getOpcion.value = moneda;
                contenedorMonedas.add(getOpcion);
            }
        }
    } catch (error) {
        alert("Error al obtener datos de la API",error);
    }
}
function calcularValor() {
    // Obtener valor ingresado en el input
    const cantidad = parseFloat(document.getElementById("Pesos").value);
    // Obtener valor de la moneda seleccionada mediante lo que se ingresa en el input
    const monedaSeleccionada = document.getElementById("contenedor-moneda").value;
    // Obtener la tasa de cambio de la moneda seleccionada
    const tasaCambio = data[monedaSeleccionada].valor;
    // Calcular valor convertido 
    const valorConvertido = cantidad / tasaCambio;
    if(valorConvertido<1){
        //Mostrar mas decimales si el numero es muy pequeño
        document.getElementById("resultado").innerHTML = `Resultado : $ ${valorConvertido.toFixed(4)}`;
    }else{
        //Mostrar 2 decimales cuando ya es un numero un poco mas grande
        document.getElementById("resultado").innerHTML = `Resultado : $ ${valorConvertido.toFixed(2)}`;
    }
}
// Asignar la función de calcularValor al evento onclick del botón
document.getElementById("calcular").onclick = calcularValor;
document.addEventListener("keydown", (tecla)=>{
    if(tecla.key.toLocaleLowerCase()==="enter"){
        tecla.preventDefault();
        const getResultado = document.getElementById("resultado")
        if(getResultado){
            calcularValor();
        }else{
            //Capturar el contenedor donde se agregara el elemento creado
            const contenedor = document.getElementById("resultado-conversion");
            //Crear el elemento div
            const getDiv = document.createElement("div");
            //Darle un id que sea resultado, ya que asi esta asignado para el valor convertido
            getDiv.id = "resultado";
            //Agregar el elemento creado al contenedor, asi se aplican los cambios
            contenedor.appendChild(getDiv)
            //Llamar a la funcion de calcular valor
            calcularValor();
        }
    }
})
getApi();
