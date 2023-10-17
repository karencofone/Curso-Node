const db = require('../models');
const Tarea = db.Tarea;

const crearTarea = async (req, res) => {
  try {
    const { nombre, descripcion, fechaCreacion, completada } = req.body;

    const nuevaTarea = await Tarea.create({
      nombre,
      descripcion,
      fechaCreacion,
      completada,
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

const obtenerTodasLasTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

const obtenerTareaPorId = async (req, res) => {
  try {
    const tareaId = req.params.id;
    const tarea = await Tarea.findByPk(tareaId);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea' });
  }
  
};

const actualizarTarea = async (req, res) => {
  try {
    const tareaId = req.params.id;
    const { nombre, descripcion, fechaCreacion, completada } = req.body;

    const tarea = await Tarea.findByPk(tareaId);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    tarea.nombre = nombre;
    tarea.descripcion = descripcion;
    tarea.fechaCreacion = fechaCreacion;
    tarea.completada = completada;

    await tarea.save();

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

const eliminarTarea = async (req, res) => {
  try {
    const tareaId = req.params.id;
    const tarea = await Tarea.findByPk(tareaId);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await tarea.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};

module.exports = {
  crearTarea,
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
};
