const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Por favor, ingresa un ID.'],
        unique: [true, 'Ese ID ya está en uso.'],
        minlength: [6, 'El ID debe tener al menos 6 caracteres.'],
        lowercase: true
    },
    nombre: {
        type: String,
        required: [true, 'Por favor, ingresa un nombre.'],
        minlength: [6, 'El nombre debe tener al menos 6 caracteres.']
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor, ingresa una descripción.'],
        minlength: [10, 'La descripción debe tener al menos 10 caracteres.']
    },
    fechaCreacion: {
        type: Date,
        required: [true, 'Por favor, ingresa la fecha de creación.']
    },
    completada: {
        type: Boolean,
        required: false
    },
});

taskSchema.statics.getAllTasks = async function () {
    return await this.find();
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;