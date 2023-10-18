const Task = require('../models/task');

// Función para manejar errores
const handleError = (err) => {
    const errors = {};

    if (err.message === 'Ingresa un ID válido.') {
        errors.id = 'ID inválido. Por favor, ingresa un ID válido.';
    }

    if (err.message === 'Ingresa un nombre.') {
        errors.nombre = 'Nombre requerido. Por favor, ingresa un nombre válido.';
    }

    if (err.message === 'Ingresa una descripción.') {
        errors.descripcion = 'Descripción requerida. Por favor, ingresa una descripción válida.';
    }

    if (err.message === 'El nombre debe contener al menos 6 caracteres.') {
        errors.nombre = 'El nombre debe tener al menos 6 caracteres.';
    }

    if (err.code === 11000) {
        errors.id = 'El ID ya está en uso.';
        return errors;
    }

    if (err.message.includes('validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

module.exports.createTask = async (req, res) => {
    const { id, nombre, descripcion, completada } = req.body;

    if (!nombre) {
        const err = { message: 'Ingresa un nombre.' };
        const errors = handleError(err);
        return res.status(400).json({ errors });
    }

    if (!descripcion) {
        const err = { message: 'Ingresa una descripción.' };
        const errors = handleError(err);
        return res.status(400).json({ errors });
    }

    const fechaCreacion = new Date();

    try {
        const newTask = await Task.create({ id, nombre, descripcion, fechaCreacion, completada });
        return res.status(201).json(newTask);
    } catch (error) {
        const errors = handleError(error);
        return res.status(400).json({ errors });
    }
};

module.exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (tasks.length > 0) {
            return res.status(200).json(tasks);
        } else {
            return res.status(404).json('No se encontraron tareas.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor.');
    }
};

module.exports.getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({ id });

        if (!task) {
            return res.status(404).json('No se encontró la tarea con ese ID.');
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor.');
    }
};

module.exports.updateTaskById = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fechaCreacion, completada } = req.body;

    try {
        const task = await Task.findOne({ id });

        if (!task) {
            return res.status(404).json('No se encontró la tarea con ese ID.');
        }

        if (nombre) {
            task.nombre = nombre;
        }

        if (descripcion) {
            task.descripcion = descripcion;
        }

        if (fechaCreacion) {
            task.fechaCreacion = fechaCreacion;
        }

        if (completada !== undefined) {
            task.completada = completada;
        }

        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor.');
    }
};

module.exports.deleteTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Task.deleteOne({ id });

        if (result.deletedCount === 0) {
            return res.status(404).json('No se encontró la tarea con ese ID.');
        }

        return res.status(204).end();
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor.');
    }
};

module.exports.completeTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({ id });

        if (!task) {
            return res.status(404).json('No se encontró la tarea con ese ID.');
        }

        task.completada = true;
        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor.');
    }
};
