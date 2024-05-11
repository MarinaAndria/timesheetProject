/* eslint-disable camelcase */
// Import function from effectuer Model
import { get_effectuer, insert_effectuer, delete_effectuer_by_id, heur_accumule_model_id, heur_accumule_model_id2, get_effectuer_by_id_mois, update_effectuer_by_Id, heur_accumule_model, heur_accumule_mois_model, get_effectuer_by_id, heur_accumule_model_chart_recap, heur_accumule_model_chart_recap2, data_accueil } from '../models/effectuer_model.js'

// Get All effectuers
export const show_effectuers = (req, res) => {
  get_effectuer((err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
// Get effectuers by id
export const show_effectuer_by_id = (req, res) => {
  const Numero_matricule = req.params.Numero_matricule
  get_effectuer_by_id(Numero_matricule, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
// Get effectuers by id
export const show_effectuers_mois = (req, res) => {
  const Numero_matricule = req.params.Numero_matricule
  const Date = req.params.Date
  get_effectuer_by_id_mois(Numero_matricule, Date, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
// Create New effectuer
export const add_effectuer = (req, res) => {
  insert_effectuer(req.body, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}

// Delete  effectuer
export const delete_effectuer = (req, res) => {
  const Numero_effectuer = req.params.Numero_effectuer
  delete_effectuer_by_id(Numero_effectuer, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}

// Update effectuer
export const update_effectuer = (req, res) => {
  const data = req.body
  const Numero_effectuer = req.params.Numero_effectuer
  update_effectuer_by_Id(data, Numero_effectuer, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
// Heur accumelées
export const heur_accumule = (req, res) => {
  const Numero_matricule = req.params.Numero_matricule
  heur_accumule_model(Numero_matricule, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
// Heur accumelées
export const for_chart_recap_id = (req, res) => {
  const Numero_matricule = req.params.Numero_matricule
  heur_accumule_model_id(Numero_matricule, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
// Heur accumelées
export const for_chart_recap_id2 = (req, res) => {
  const Numero_matricule = req.params.Numero_matricule
  heur_accumule_model_id2(Numero_matricule, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
export const for_chart_recap = (req, res) => {
  heur_accumule_model_chart_recap((err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
export const for_chart_recap2 = (req, res) => {
  heur_accumule_model_chart_recap2((err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
// Heur accumelées
export const heur_accumule_mois = (req, res) => {
  const Numero_matricule = req.params.Numero_matricule
  const Date = req.params.Date
  heur_accumule_mois_model(Numero_matricule, Date, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
export const data_accueil_a = (req, res) => {
  data_accueil((err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
