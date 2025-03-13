const express = require('express');

module.exports = (Subject, Activity) => {
  const router = express.Router();

  router.get('/:subjectId', async (req, res) => {
    const subject = await Subject.findByPk(req.params.subjectId, {
      include: Activity
    });
    res.render('activities/index', { subject });
  });

  router.get('/:subjectId/new', async (req, res) => {
    const subject = await Subject.findByPk(req.params.subjectId);
    res.render('activities/new', { subject: subject });
  });

  router.post('/:subjectId', async (req, res) => {
    await Activity.create({
      ...req.body,
      SubjectId: req.params.subjectId
    });
    res.redirect(`/activities/${req.params.subjectId}`);
  });

  router.get('/:id/edit', async (req, res) => {
    const activity = await Activity.findByPk(req.params.id, {
      include: Subject
    });
    res.render('activities/edit', { activity });
  });

  router.put('/:id', async (req, res) => {
    await Activity.update(req.body, { where: { id: req.params.id } });
    res.redirect(`/activities/${req.body.SubjectId}`);
  });

  router.delete('/:id', async (req, res) => {
    const activity = await Activity.findByPk(req.params.id);
    await activity.destroy();
    res.redirect(`/activities/${activity.SubjectId}`);
  });

  return router;
};