/* eslint-disable camelcase */
// Import function from effectuer Model
import {
  get_all_employe,
  add_new_employe,
  delete_employe_by_id,
  update_employe_by_Id,
  update_employe_login_by_Id,
} from "../models/Employe_model.js";

export const get_employe = (req, res) => {
  get_all_employe((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
export const add_employe = (req, res) => {
  add_new_employe(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
// Delete  employe
export const delete_employe = (req, res) => {
  const Numero_matricule = req.params.Numero_matricule;
  delete_employe_by_id(Numero_matricule, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update employe
export const update_employe = (req, res) => {
  const data = req.body;
  const Numero_matricule = req.params.Numero_matricule;
  update_employe_by_Id(data, Numero_matricule, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
