const app = require('./app');
const request = require('supertest');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function main() {
  rl.question('Ingresa un comando (list, add, complete, exit): ', (command) => {
    if (command === 'list') {
      listarTareas();
    } else if (command === 'add') {
      rl.question('Ingresa los datos separados por "," id, nombre,descripción: ', (input) => {
        const datos = input.split(",").map(item => item.trim());
        const body = {
          id: datos[0],
          nombre: datos[1],
          descripcion: datos[2]
        };
        agregarTarea(body);
      });
    } else if (command === 'complete') {
      rl.question('Ingresa el id de la tarea: ', (id) => {
        completarTarea(id);
      });
    } else if (command === 'exit') {
      console.log('Exit...');
      rl.close();
    } else {
      console.log('ERROR. Comando no reconocido. Comandos válidos: list, add, complete, exit.');
    }

    main();
  });
}

async function listarTareas() {
  const response = await request(app).get('/tasks');
  const tareas = response.body.map(task => ({
    id: task.id,
    nombre: task.nombre,
    descripcion: task.descripcion,
    completada: task.completada
  }));
  console.log(tareas);
}

async function agregarTarea(body) {
  const response = await request(app).post('/tasks').send(body);
  console.log(response.body);
}

async function completarTarea(id) {
  const response = await request(app).put(`/tasks/complete/${id}`);
  console.log(response.body);
}

main();