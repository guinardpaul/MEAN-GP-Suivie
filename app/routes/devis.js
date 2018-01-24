const Devis = require('../models/Devis');

module.exports = router => {
  /**
   * Get All Devis
   */
  router.get('/devis', (req, res, next) => {
    Devis.find((err, data) => {
      if (err) return next(err);
      return res.status(200).json(data);
    });
  });

  /**
   * GET ALL DEVIS BY CLIENT
   */
  router.get('/devis/client/:client', (req, res, next) => {
    if (!req.params.client) {
      return res.status(400).json({
        success: false,
        message: 'client._id not provided'
      });
    } else {
      // associe client to params
      // {} display all Devis informations
      Devis.find({ client: req.params.client }, {}, (err, data) => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(500).json({
            success: false,
            message: 'Devis not found',
            err: err
          });
        }
      });
    }
  });

  /**
   * GET ALL DEVIS BY CLIENT & artisan
   */
  router.get('/devis/client/:client/artisan/:artisan', (req, res, next) => {
    if (!req.params.client) {
      return res.status(400).json({
        success: false,
        message: 'client._id not provided'
      });
    } else if (!req.params.artisan) {
      return res.status(400).json({
        success: false,
        message: 'artisan._id not provided'
      });
    } else {
      // associe client to params
      // {} display all Devis informations
      Devis.find(
        { client: req.params.client, artisan: req.params.artisan },
        {},
        (err, data) => {
          if (data) {
            return res.status(200).json(data);
          } else {
            return res.status(500).json({
              success: false,
              message: 'Devis not found',
              err: err
            });
          }
        }
      );
    }
  });

  /**
   * GET ONE DEVIS
   */
  router.get('/devis/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Devis.findById(req.params.id, (err, data) => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(500).json({
            success: false,
            message: 'Devis not found',
            err: err
          });
        }
      });
    }
  });

  /**
   * Check unicité Ref_devis
   * GET ONE Devis BY REF_DEVIS
   * Check ensuite si le devis fait partie de la liste des devis du client
   */
  router.get('/devis/client/:client/ref/:ref_devis', (req, res, next) => {
    if (!req.params.ref_devis) {
      return res.status(400).json({
        success: false,
        message: 'Ref not provided'
      });
    } else if (!req.params.client) {
      return res.status(400).json({
        success: false,
        message: 'id client not provided'
      });
    } else {
      // associe ref to params
      // {} display all Devis informations
      Devis.find({ ref_devis: req.params.ref_devis }, {}, (err, devis) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Devis global not found',
            err: err
          });
        }
        if (devis) {
          let statusVerifRef = false;
          for (var dev in devis) {
            if (devis.hasOwnProperty(dev)) {
              if (devis[dev].client == req.params.client) {
                statusVerifRef = true;
              }
            }
          }
          if (statusVerifRef) {
            return res.status(200).json({
              success: true,
              message:
                'Devis with ref "' + req.params.ref_devis + '" already exists'
            });
          } else {
            return res.status(200).json({
              success: false,
              message: 'Devis Global not found'
            });
          }
        }
      });
    }
  });

  /**
   * SAVE DEVIS
   */
  router.post('/devis', (req, res, next) => {
    if (!req.body) {
      if (req.body.ref_devis === '') {
        return res.status(400).json({
          success: false,
          message: 'Ref Devis not provided'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'data not provided'
        });
      }
    } else {
      Devis.create(req.body, (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Erreur création devis',
            err: err
          });
        } else {
          return res.status(200).json({
            success: true,
            obj: data,
            message: 'Devis créé'
          });
        }
      });
    }
  });

  /**
   * UPDATE DEVIS
   */
  router.put('/devis/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Devis.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, data) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: 'Erreur modification devis',
              err: err
            });
          } else {
            return res.status(200).json({
              success: true,
              obj: data,
              message: 'Devis modifié'
            });
          }
        }
      );
    }
  });

  /**
   * REMOVE DEVIS
   */
  router.delete('/devis/:id', (req, res, next) => {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'id not provided'
      });
    } else {
      Devis.findByIdAndRemove(req.params.id, req.body, (err, data) => {
        if (data) {
          return res.status(200).json({
            success: true,
            message: 'Devis supprimé'
          });
        } else {
          return res.status(500).json({
            success: false,
            message: 'Erreur suppression devis',
            err: err
          });
        }
      });
    }
  });

  return router;
};
