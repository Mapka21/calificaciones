const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { sequelize, Subject, Activity } = require('./models');

const app = express();

// Configuración básica
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rutas
const subjectsRouter = require('./routes/subjects')(Subject);
const activitiesRouter = require('./routes/activities')(Subject, Activity);
app.use('/subjects', subjectsRouter);
app.use('/activities', activitiesRouter);

// Ruta raíz
app.get('/', (req, res) => res.redirect('/subjects'));

// Manejo de errores simplificado
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`
        <div class="alert alert-danger m-4">
            <h2>Error</h2>
            <p>${err.message}</p>
            <a href="/subjects" class="btn btn-primary">Volver al inicio</a>
        </div>
    `);
});

// Iniciar servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor funcionando en http://localhost:3000');
    });
});