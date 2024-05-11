/* eslint-disable camelcase */
// import express
import express from 'express'
// effectuer routes
// import function from controller
import { show_effectuers, add_effectuer, show_effectuers_mois, delete_effectuer, update_effectuer, heur_accumule, heur_accumule_mois, show_effectuer_by_id, for_chart_recap, for_chart_recap2, for_chart_recap_id, for_chart_recap_id2, data_accueil_a } from '../controllers/Effectuer.js'

// projet routes
// import function from controller
import { show_projets, show_projet_by_matricule, show_projet_Id, add_projet, update_projet, delete_projet } from '../controllers/Projet.js'

// init express router
// import function from controller
import { login, login_get_user, logout } from '../controllers/anotherOne.js'
import { login_admin, login_get_admin, logout_admin } from '../controllers/Admin_login.js'
// import function from controller
import { get_employe, add_employe, delete_employe, update_employe, update_employe_login } from '../controllers/Employe.js'
// import function from controller
import { show_attribuers, add_attribuer, delete_attribuer, update_attribuer } from '../controllers/Attribuer.js'
// import function from controller
import { add_etat, show_etat_by_id, show_etat, add_etat_validation_refus, add_etat_validation_accept, add_etat_insert_comment } from '../controllers/Etat.js'
import { add_annee_fiscale } from '../controllers/Annee_fiscale.js'
const router = express.Router()

// Get All effectuer
router.get('/data_accueil', data_accueil_a)
// Get All effectuer
router.get('/effectuer', show_effectuers)
// Get All effectuer
router.get('/effectuer_mois/:Numero_matricule/:Date', show_effectuers_mois)
// Get effectuer by id
router.get('/effectuer/:Numero_matricule', show_effectuer_by_id)
// Get All effectuer
router.post('/effectuer', add_effectuer)
// Delete effectuer
router.delete('/effectuer/:Numero_effectuer', delete_effectuer)
// Update effectuer
router.put('/effectuer/:Numero_effectuer', update_effectuer)
// Get All effectuer
router.get('/recap/:Numero_matricule', heur_accumule)
router.get('/chart', for_chart_recap)
router.get('/chart_user/:Numero_matricule', for_chart_recap_id)
router.get('/chart_user2/:Numero_matricule', for_chart_recap_id2)
router.get('/chart2', for_chart_recap2)

router.get('/recap_mois/:Numero_matricule/:Date', heur_accumule_mois)

// Get All project
router.get('/projet', show_projets)
// Get All project
router.get('/projet_by_mat/:Numero_matricule', show_projet_by_matricule)
// Get Single project
router.get('/projet/:Numero_projet', show_projet_Id)
// Post new project
router.post('/projet', add_projet)
// Update projet
router.put('/projet/:Numero_projet', update_projet)
// Delete projet
router.delete('/projet/:Numero_projet', delete_projet)
// Post singup
// router.post('/singup', singup);
// Get All projet
// Get All employe
router.get('/employe', get_employe)
router.post('/employe', add_employe)
// Delete employe
router.delete('/employe/:Numero_matricule', delete_employe)
// Update employe
router.put('/employe/:Numero_matricule', update_employe)
// Update employe login
router.put('/employeLogin/:Numero_matricule', update_employe_login)
// Get All attribuer
router.get('/attribuer', show_attribuers)
router.post('/attribuer', add_attribuer)
// Delete effectuer
router.delete('/attribuer/:Numero_attribuer', delete_attribuer)
// Update attribuer
router.put('/attribuer/:Numero_attribuer', update_attribuer)
// Get All login
router.post('/login', login)
router.get('/user_compte', login_get_user)
router.post('/logout', logout)
// Get  login Admin
router.post('/login_admin', login_admin)
router.get('/login_get_admin', login_get_admin)
router.post('/logout_admin', logout_admin)

// Etat timesheet
router.post('/etat', add_etat)
// Etat timesheet
router.post('/etat_validation_refus', add_etat_validation_refus)
// Etat timesheet
router.post('/etat_validation_accept', add_etat_validation_accept)
// Etat timesheet
router.post('/etat_comment', add_etat_insert_comment)
// Etat timesheet
router.get('/etat/:Numero_matricule', show_etat_by_id)
// Etat timesheet
router.get('/etat', show_etat)

// Etat timesheet
router.post('/annee_fiscale', add_annee_fiscale)
// export default router
export default router
