const CorpsMetiers = require('../models/CorpsMetiers');

module.exports = router => {
  /**
   * Get All Corps Metier
   */
  router.get('/corps-metier', (req, res, next) => {
    CorpsMetiers.find((err, data) => {
      if (err) return next(err);
      res.status(200).json(data);
    });
  });

  /**
   * Get One CorpsMetiers
   */
  router.get('/corps-metier/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      CorpsMetiers.findById(req.params.id, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(409).json({
            success: false,
            message: 'CorpsMetiers not found',
            err: err
          });
        }
      });
    }
  });

  /**
   * CREATE CorpsMetiers
   */
  router.post('/corps-metier', (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else {
      CorpsMetiers.create(req.body, (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'Erreur création CorpsMetiers',
            err: err
          });
        } else {
          res.status(201).json({
            success: true,
            obj: data,
            message: 'CorpsMetiers créé'
          });
        }
      });
    }
  });

  router.put('/corps-metier/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      CorpsMetiers.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, data) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: 'Erreur modification CorpsMetiers',
              err: err
            });
          } else {
            res.status(200).json({
              success: true,
              obj: data,
              message: 'CorpsMetiers modifié'
            });
          }
        }
      );
    }
  });

  /**
   * DELETE CorpsMetiers
   */
  router.delete('/corps-metier/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      CorpsMetiers.findByIdAndRemove(req.params.id, req.body, (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'Erreur suppresion CorpsMetiers',
            err: err
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'CorpsMetiers supprimé'
          });
        }
      });
    }
  });

  return router;
};
