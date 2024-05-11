/* eslint-disable camelcase */
// Import function from attribuer Model
import { insert_annee_fiscale } from '../models/Annee_fiscale_model.js'

// Create New attribuer
export const add_annee_fiscale = (req, res) => {
  const data = req.body
  insert_annee_fiscale(data, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.json(results)
    }
  })
}
