const Artisans = require('../models/Artisans');

module.exports = router => {
  /**
   * Get All Corps Metier
   */
  router.get('/artisans', (req, res, next) => {
    Artisans.find((err, data) => {
      if (err) return next(err);
      res.status(200).json(data);
    });
  });

  /**
   * Get One Artisans
   */
  router.get('/artisans/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Artisans.findById(req.params.id, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(409).json({
            success: false,
            message: 'Artisans not found',
            err: err
          });
        }
      });
    }
  });

  /**
   * CREATE Artisans
   */
  router.post('/artisans', (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: 'body not provided'
      });
    } else {
      Artisans.create(req.body, (err, data) => {
        if (err) {
          if (err.code === 11000) {
            return res.status(409).json({
              success: false,
              message: 'Nom Société déjà utilisé'
            });
          } else if (err.errors.email) {
            return res.status(409).json({
              success: false,
              message: err.errors.email.message
            });
          } else if (err.errors.nom) {
            return res.status(409).json({
              success: false,
              message: err.errors.nom.message
            });
          } else if (err.errors.prenom) {
            return res.status(409).json({
              success: false,
              message: err.errors.prenom.message
            });
          } else {
            return res.status(500).json({
              success: false,
              message: 'Erreur création client',
              err: err
            });
          }
        }

        return res.status(201).json({
          success: true,
          obj: data,
          message: 'Artisans créé'
        });
      });
    }
  });

  router.put('/artisans/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Artisans.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, data) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: 'Erreur modification Artisans',
              err: err
            });
          } else {
            res.status(200).json({
              success: true,
              obj: data,
              message: 'Artisans modifié'
            });
          }
        }
      );
    }
  });

  /**
   * DELETE Artisans
   */
  router.delete('/artisans/:id', (req, res, next) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Artisans.findByIdAndRemove(req.params.id, req.body, (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'Erreur suppresion Artisans',
            err: err
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Artisans supprimé'
          });
        }
      });
    }
  });

  return router;
};
