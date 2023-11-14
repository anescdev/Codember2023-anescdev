/**
* Clase para almacenar el manejador y de que tipo es
*/
class CharacterHandler {
	/**
	* El manejador es algo especial puede ser de dos tipos: 
	* - Uno consumidor al que se le pasará dos parámetros, uno con el valor actual 
	* 	de la cadena de texto y otro con el valor numérico compilado en ese momento
	* - El otro tipo se le puede llamar como "no consumidor" y se le pasará
	* 	como parámetro el valor numérico que tenga el compilador al momento de llamar
	* 	la función y devolverá otro número que será el nuevo valor
	* 	que se le asignará al compilador.
	* @type {(decoded: number)=>number | (decoded: string, actual: number)=>string}
	*/
	handler;
	/**
	* @type {boolean} Indica si es consumidor o no.
	*/
	isConsumer;
}
/**
* Clase compiladora de cadenas de texto
*/
class Compiler {
	/**
	* @type {Map<string,CharacterHandler>}
	*/
	#handlers;
	constructor(handlers){
		this.#handlers = handlers;
	}
	
	/**
	* Compila la cadena codificada y realiza las operaciones necesarias según el carácter
	* @param {String} encodedString
	* @returns void
	*/
	compile(encodedString) {
		const cleanString = encodedString.trim();
		if (cleanString.match(`^[${Array.from(this.#handlers.keys()).join("")}]+$`) === null) {
			throw new Error("La cadena no es válida para compilar");
		}
		const length = encodedString.length;
		let actualNum = 0;
		let decoded = "";
		for (let index = 0; index < length; index++) {
			const char = cleanString.charAt(index);
			const res = this.#handlers.get(char);
			if(res.isConsumer){
				decoded = res.handler(decoded, actualNum);
				continue;
			}
			actualNum = res.handler(actualNum);
		}
		console.log(decoded);
	}
}
/**
* Objeto que implementa el patrón Builder, con el objetivo de crear 
* objetos {@link Compiler}
*/
export class CompilerBuilder {
	/**
	* @type {Map<string,CharacterHandler>}
	*/
	#handlers = new Map();
	/**
	* @function charHandler
	* @param {string} inputChar
	* @returns {void | number}
	*/
	/**
	*
	* @param {!string} char - El carácter que quieres compilar. Tiene que tener un carácter de longitud sí o sí
	* @param {CharacterHandler} handler - Objeto que contendrá el manejador de cada carácter del mapa. Podrá ser consumidor(no actualiza el valor sino que lo usa) o no.
	*/
	addCharHandler(char, handler) {
		if (typeof char !== "string" && char.length !== 1) {
			throw new Error("No has pasado un carácter.");
		}
		if (this.#handlers.has(char)) {
			throw new Error(`El carácter ${char} ya tiene un manejador`);
		}
		this.#handlers.set(char, handler);
		return this;
	}
	/**
	*
	* @returns Una instancia de {@link Compiler} con los manejadores asignados.
	*/
	build() {
		if (this.#handlers.size < 1) {
			throw new Error(
				"No puedes crear un objeto Compiler sin añadir ningún manejador"
				);
			}
			return new Compiler(this.#handlers);
		}
	}
// Se añaden los manejadores a sus respectivos carácteres.
const defaultCompiler = new CompilerBuilder()
	.addCharHandler("#", {
		handler: (actual) => actual + 1,
		isConsumer: false,
	})
	.addCharHandler("@", {
		handler: (actual) => actual - 1,
		isConsumer: false,
	})
	.addCharHandler("*", {
		handler: (actual) => actual * actual,
		isConsumer: false,
	})
	.addCharHandler("&", {
		handler: (decoded, actual) => decoded + actual,
		isConsumer: true,
	})
	.build();
export default defaultCompiler;
