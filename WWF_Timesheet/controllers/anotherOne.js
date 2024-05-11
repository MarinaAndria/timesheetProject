/* eslint-disable camelcase */
// Import function from effectuer Model
import db from '../database/Database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = (req, res) => {
  db.query("SELECT * FROM Employe WHERE Email = '" + req.body.Email + "'", async (err, results) => {
    if (err) console.log(err)
    if (results.recordsets[0].length <= 0) {
      return res.status(500).send('User not found')
    }
    if (!await bcrypt.compare(req.body.Password, results.recordset[0].Password)) {
      return res.status(500).send('Invalide authentification')
    }
    const token = jwt.sign({
      Numero_matricule: results.recordset[0].Numero_matricule
    },
    'SECRETKEY', {
      expiresIn: '7d'
    })
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.send('Login succed')
  })
}

export const login_get_user = (req, res) => {
  try {
    const cookie = req.cookies.jwt
    const claims = jwt.verify(cookie,
      'SECRETKEY', {
        expiresIn: '7d'
      })
    if (!claims) {
      return res.status(401).send('unauthenticated')
    }
    db.query("SELECT Numero_matricule, Role, Nom_employe, Titre, Email FROM Employe WHERE Numero_matricule = '" + claims.Numero_matricule + "'", async (err, results) => {
      if (err) {
        console.log(err)
        res(err, null)
      } else {
        res.send(results.recordsets[0])
      }
    })
  } catch (error) {
    return res.status(401).send('unauthenticated')
  }
}
export const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 })
  res.send('Success logout')
}
