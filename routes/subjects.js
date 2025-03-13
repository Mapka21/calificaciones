const express = require('express');

module.exports = (Subject) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const subjects = await Subject.findAll();
    res.render('subjects/index', { subjects });
  });

  router.get('/new', (req, res) => {
    res.render('subjects/new');
  });

  router.post('/', async (req, res) => {
    await Subject.create(req.body);
    res.redirect('/subjects');
  });

  router.get('/:id/edit', async (req, res) => {
    const subject = await Subject.findByPk(req.params.id);
    res.render('subjects/edit', { subject });
  });

  router.put('/:id', async (req, res) => {
    await Subject.update(req.body, { where: { id: req.params.id } });
    res.redirect('/subjects');
  });

  router.delete('/:id', async (req, res) => {
    await Subject.destroy({ where: { id: req.params.id } });
    res.redirect('/subjects');
  });

  return router;
};