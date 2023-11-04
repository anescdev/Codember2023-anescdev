// Mapa donde iremos guardando las palabras encontradas secuencialmente
// La clave será la palabra del fichero y el valor el número de veces que ha sido encontrado
const words = new Map();
// Obtengo los datos del mensaje y transformo su contenido para que pueda se procesado correctamente
const secretMessage = await fetch("https://codember.dev/data/message_01.txt")
    .then(val => val.text())
    .then(val => val.substring(0, val.length-1))
    .then(val=> val.toLowerCase())
    .then(val => val.split(" "));
// Recorremos las palabras
secretMessage.forEach(act=>{
    // Obtenemos el valor del mapa
    const sum = words.get(act);
    if(sum!=undefined){
        // Si es diferente a undefined quiere decir que se encontró ya un valor en el mapa por lo que se le sumará uno.
        words.set(act, sum+1);
    }  
    else{
        // En caso de que sea undefined se añadirá la palabra encontrada al mapa con el valor 1.
        words.set(act, 1)
    }
});
// Creamos un array a partir de las entradas del mapa que son devuelta como arrays de dos posiciones, la primera
// la clave y la segunda el valor. Se mapea a string con la clave(palabra) y el valor(veces repetida) y unimos
// el array sin separador.
console.log(new Array(words.entries()).map(([key, val]) => `${key}${val}`).join(""));