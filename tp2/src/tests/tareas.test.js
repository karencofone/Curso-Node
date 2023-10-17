const request = require('supertest');
const app = require('../../app');
const db = require('../models');

describe('Pruebas de rutas y controladores de tareas', () => {
  let tareaExistenteId;

  beforeAll(async () => {
    const nuevaTarea = await db.Tarea.create({
      nombre: 'Tarea de prueba existente',
      descripcion: 'Esta es una tarea existente de prueba.',
      fechaCreacion: '2023-10-17',
      completada: false,
    });

    tareaExistenteId = nuevaTarea.id;
  });

  it('Debería crear una nueva tarea', async () => {
    const res = await request(app)
      .post('/tareas/crear')
      .send({
        nombre: 'Nueva tarea de prueba',
        descripcion: 'Esta es una nueva tarea de prueba.',
        fechaCreacion: '2023-10-18',
        completada: false,
      });
    expect(res.statusCode).toBe(201);
  });

  it('Debería obtener todas las tareas', async () => {
    const res = await request(app).get('/tareas/obtener');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Debería actualizar una tarea existente', async () => {
    const res = await request(app)
      .put(`/tareas/actualizar/${tareaExistenteId}`)
      .send({
        nombre: 'Tarea actualizada',
        descripcion: 'Esta es la descripción actualizada.',
        fechaCreacion: '2023-10-18',
        completada: true,
      });

    expect(res.statusCode).toBe(200);
  });

  it('Debería eliminar una tarea', async () => {
    const res = await request(app).delete(`/tareas/eliminar/${tareaExistenteId}`);
    expect(res.statusCode).toBe(204);
  });
});
