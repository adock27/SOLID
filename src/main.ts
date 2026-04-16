import readline from 'readline';
import { Heroe } from './core/entities/Heroe.js';
import { HeroeFactory } from './core/factories/HeroeFactory.js';
import { HabilidadFactory } from './core/factories/HabilidadFactory.js';
import { ContadorLogros } from './shared/ContadorLogros.js';
import { initRegistry } from './core/bootstrapper.js';

// Inicializar el registro de fábricas
initRegistry();

const sistemaLogros = new ContadorLogros();

// // 2. Creamos al héroe inyectando una habilidad inicial (Inversión de Dependencias)
// const geralt = new Heroe("Geralt");
// const ander = new Heroe("Ander");
// const breitner = new Heroe("Breitner");

// geralt.agregarObservador(sistemaLogros);
// ander.agregarObservador(sistemaLogros);
// breitner.agregarObservador(sistemaLogros);

// console.log("--- INICIO DEL COMBATE ---");
// // 3. Ejecución
// // geralt.init();
// ander.init();
// breitner.init();


// breitner.mostrarEstado();
// ander.mostrarEstado();

// ander.setHabilidadPasiva(HabilidadFactory.crearPasiva('ROBLE'));
// ander.mostrarEstado();

// breitner.setHabilidadActiva(HabilidadFactory.crearActiva('RAYO'));
// breitner.actuar(ander)

// breitner.setHabilidadPasiva(HabilidadFactory.crearPasiva('CASCO_DIAMANTE'));
// breitner.mostrarEstado();
// breitner.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
// breitner.actuar(ander)

// ander.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
// ander.actuar(breitner);
// ander.setHabilidadActiva(HabilidadFactory.crearActiva('RAYO'));
// ander.actuar(breitner);
// ander.setHabilidadActiva(HabilidadFactory.crearActiva('FUEGO'));
// ander.actuar(breitner);




// // geralt.setHabilidadActiva(HabilidadFactory.crearActiva('ESPADA'));
// // geralt.actuar(ander);
// // ander.setHabilidadActiva(HabilidadFactory.crearActiva('CURACION'));
// // ander.actuar(geralt);
// // geralt.actuar(ander);

// // ander.setHabilidadActiva(HabilidadFactory.crearActiva('RAYO'));
// // ander.setHabilidadPasiva(HabilidadFactory.crearPasiva('ROBLE'));
// // ander.actuar(geralt);
// // ander.actuar(geralt);

// breitner.mostrarEstado();
// ander.mostrarEstado();


// console.log("--- FIN DEL COMBATE ---");

// Instancias iniciales usando Factory
const ander = HeroeFactory.crearHeroe('GUERRERO', "Ander");
const breitner = HeroeFactory.crearHeroe('TANQUE', "Breitner");
const joseph = HeroeFactory.crearHeroe('MAGO', "Joseph");

const heroes = [ander, breitner, joseph];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta: string): Promise<string> {
  return new Promise(resolve => rl.question(pregunta, resolve));
}

async function seleccionarHeroe(): Promise<Heroe> {
  console.log("\nSelecciona un héroe:");
  heroes.forEach((h, i) => console.log(`${i + 1}. ${h.nombre}`));

  const opcion = parseInt(await preguntar("> "));
  return heroes[opcion - 1];
}

async function seleccionarHabilidadActiva() {
  console.log("\nHabilidades activas:");
  console.log("1. ESPADA");
  console.log("2. RAYO");
  console.log("3. FUEGO");
  console.log("4. CURACION");

  const opcion = await preguntar("> ");

  const mapa: any = {
    "1": "ESPADA",
    "2": "RAYO",
    "3": "FUEGO",
    "4": "CURACION"
  };

  return HabilidadFactory.crearActiva(mapa[opcion]);
}

async function seleccionarHabilidadPasiva() {
  console.log("\nHabilidades pasivas:");
  console.log("1. ROBLE");
  console.log("2. CASCO_DIAMANTE");

  const opcion = await preguntar("> ");

  const mapa: any = {
    "1": "ROBLE",
    "2": "CASCO_DIAMANTE"
  };

  return HabilidadFactory.crearPasiva(mapa[opcion]);
}

async function menu() {
  let salir = false;

  console.log("\n--- INICIO DEL COMBATE ---");

  while (!salir) {
    console.log(`
1. Ver estado
2. Equipar habilidad activa
3. Equipar habilidad pasiva
4. Atacar
5. Salir
    `);

    const opcion = await preguntar("> ");

    switch (opcion) {
      case "1": {
        heroes.forEach(h => h.mostrarEstado());
        break;
      }

      case "2": {
        const heroe = await seleccionarHeroe();
        const habilidad = await seleccionarHabilidadActiva();
        heroe.setHabilidadActiva(habilidad);
        break;
      }

      case "3": {
        const heroe = await seleccionarHeroe();
        const habilidad = await seleccionarHabilidadPasiva();
        heroe.setHabilidadPasiva(habilidad);
        break;
      }

      case "4": {
        console.log("\n--- ATACANTE ---");
        const atacante = await seleccionarHeroe();

        console.log("\n--- OBJETIVO ---");
        const objetivo = await seleccionarHeroe();

        if (atacante === objetivo) {
          console.log("❌ No puedes atacarte a ti mismo");
          break;
        }

        atacante.actuar(objetivo);
        break;
      }

      case "5":
        salir = true;
        break;

      default:
        console.log("❌ Opción inválida");
    }
  }

  console.log("\n--- FIN DEL COMBATE ---");
  rl.close();
}

// Inicializar
ander.init();
breitner.init();

menu();