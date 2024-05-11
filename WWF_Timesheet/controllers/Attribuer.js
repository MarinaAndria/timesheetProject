/* eslint-disable camelcase */
// Import function from attribuer Model
import { get_attribuer, insert_attribuer, delete_attribuer_by_id, update_attribuer_by_Id } from '../models/Attribuer_model.js'

// Get All attribuers
export const show_attribuers = (req, res) => {
  get_attribuer((err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}

// Create New attribuer
export const add_attribuer = (req, res) => {
  insert_attribuer(req.body, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}

// Delete  attribuer
export const delete_attribuer = (req, res) => {
  const Numero_attribuer = req.params.Numero_attribuer
  delete_attribuer_by_id(Numero_attribuer, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}

// Update attribuer
export const update_attribuer = (req, res) => {
  const data = req.body
  const Numero_attribuer = req.params.Numero_attribuer
  update_attribuer_by_Id(data, Numero_attribuer, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
