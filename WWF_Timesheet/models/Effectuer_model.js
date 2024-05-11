/* eslint-disable camelcase */
// import connection
import db from '../database/Database.js'
// Get All effectuers
export const heur_accumule_model_chart_recap = (result) => {
  const donnees = []
  db.query('SELECT  SUM(Attribuer.Budget) AS Budget, Projet.Nom_projet FROM Attribuer, Projet WHERE Projet.Numero_projet=Attribuer.Numero_projet GROUP BY Projet.Nom_projet', (err, results) => {
    if (err) console.log(err)
    donnees.push(...results.recordsets[0])

    db.query('SELECT  SUM(Effectuer.Heure) AS Accumulated, Projet.Nom_projet FROM Effectuer, Projet WHERE Projet.Numero_projet=Effectuer.Numero_projet GROUP BY Projet.Nom_projet',
      (err, results) => {
        if (err) console.log(err)
        donnees.push(...results.recordsets[0])
        result(donnees)
      })
  })
}
export const heur_accumule_model_chart_recap2 = (result) => {
  db.query('SELECT Projet.Nom_projet, COUNT(DISTINCT  Attribuer.Numero_matricule) AS Employee FROM Projet, Attribuer WHERE Projet.Numero_projet= Attribuer.Numero_projet GROUP BY Projet.Nom_projet ', (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
export const heur_accumule_model_id = (Numero_matricule, result) => {
  const donnees = []
  db.query("SELECT  SUM(Attribuer.Budget) AS Budget, Projet.Nom_projet FROM Attribuer, Projet WHERE Projet.Numero_projet=Attribuer.Numero_projet AND Attribuer.Numero_matricule ='" + Numero_matricule + "' GROUP BY Projet.Nom_projet", (err, results) => {
    if (err) console.log(err)
    donnees.push(...results.recordsets[0])

    db.query("SELECT  SUM(Effectuer.Heure) AS Accumulated, Projet.Nom_projet FROM Effectuer, Projet WHERE Projet.Numero_projet=Effectuer.Numero_projet AND Effectuer.Numero_matricule ='" + Numero_matricule + "' GROUP BY Projet.Nom_projet",
      (err, results) => {
        if (err) console.log(err)
        donnees.push(...results.recordsets[0])
        result(donnees)
      })
  })
}
export const heur_accumule_model_id2 = (Numero_matricule, result) => {
  const donnees = []
  db.query("SELECT  SUM(Effectuer.Heure) AS Hour, Effectuer.Date, Projet.Nom_projet FROM Effectuer, Projet WHERE Projet.Numero_projet=Effectuer.Numero_projet AND Effectuer.Numero_matricule ='" + Numero_matricule + "' GROUP BY Projet.Nom_projet, Effectuer.Date, Effectuer.Heure", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
export const get_effectuer = (result) => {
  db.query('SELECT Effectuer.Numero_effectuer, Effectuer.Numero_matricule, Effectuer.Numero_projet, Effectuer.Date, Effectuer.Heure, Projet.Nom_projet, Projet.Description FROM Effectuer, Projet WHERE Effectuer.Numero_projet = Projet.Numero_projet', (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
// Get effectuers by id
export const get_effectuer_by_id = (Numero_matricule, result) => {
  db.query("SELECT Effectuer.Numero_effectuer, Effectuer.Numero_matricule, Effectuer.Numero_projet, Effectuer.Date, Effectuer.Heure, Projet.Nom_projet, Projet.Description FROM Effectuer, Projet WHERE Effectuer.Numero_projet = Projet.Numero_projet AND  Numero_matricule = '" + Numero_matricule + "'", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
export const for_chart_recap_id = (Numero_matricule, result) => {
  db.query("SELECT Effectuer.Numero_effectuer, Effectuer.Numero_matricule, Effectuer.Numero_projet, Effectuer.Date, Effectuer.Heure, Projet.Nom_projet, Projet.Description FROM Effectuer, Projet WHERE Effectuer.Numero_projet = Projet.Numero_projet AND  Numero_matricule = '" + Numero_matricule + "'", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
// Get effectuers by id
export const get_effectuer_by_id_mois = (Numero_matricule, Date, result) => {
  db.query("SELECT  SUM(Effectuer.Heure) AS Accumulated, Projet.Nom_projet FROM Effectuer, Projet WHERE Projet.Numero_projet=Effectuer.Numero_projet AND Effectuer.Date LIKE '" + Date + "' + '%' AND Effectuer.Numero_matricule = '" + Numero_matricule + "' GROUP BY Projet.Nom_projet ", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
// Insert effectuer to Database
export const insert_effectuer = (data, result) => {
  const donnees = []
  db.query("INSERT INTO Effectuer (Numero_matricule, Numero_projet, Date, Heure) VALUES ('" + data.Numero_matricule + "','" + data.Numero_projet + "', '" + data.Date + "', '" + data.Heure + "')", (err, results) => {
    if (err) console.log(err)
    donnees.push(results)
    result(donnees)
  })
}
// Delete effectuer to Database
export const delete_effectuer_by_id = (Numero_effectuer, result) => {
  db.query("DELETE FROM Effectuer WHERE Numero_effectuer = '" + Numero_effectuer + "'", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}

// Update effectuer to Database
export const update_effectuer_by_Id = (data, Numero_effectuer, result) => {
  db.query("UPDATE effectuer SET Heure = '" + data.Heure + "' WHERE Numero_effectuer = '" + Numero_effectuer + "'", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results)
    }
  })
}
// Get All effectuers
export const heur_accumule_model = (Numero_matricule, result) => {
  db.query("SELECT Effectuer.Numero_matricule, Effectuer.Numero_projet, SUM(Effectuer.Heure) AS Accumele, Attribuer.Budget, Attribuer.Budget-SUM(Effectuer.Heure) AS Reste, Projet.Nom_projet FROM Effectuer, Attribuer, Projet WHERE Projet.Numero_projet=Effectuer.Numero_projet AND Projet.Numero_projet=Effectuer.Numero_projet AND Effectuer.Numero_matricule = Attribuer.Numero_matricule AND Effectuer.Numero_projet = Attribuer.Numero_projet AND Effectuer.Numero_matricule = '" + Numero_matricule + "' GROUP BY Effectuer.Numero_projet, Projet.Nom_projet, Effectuer.Numero_matricule, Attribuer.Budget", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
// Get All effectuers
export const heur_accumule_mois_model = (Numero_matricule, Date, result) => {
  db.query("SELECT Effectuer.Numero_matricule,  Effectuer.Numero_projet, SUM(Effectuer.Heure) AS Accumele, Projet.Nom_projet FROM Effectuer, Projet WHERE Projet.Numero_projet=Effectuer.Numero_projet AND Effectuer.Numero_matricule = '" + Numero_matricule + "' AND Effectuer.Date LIKE '" + Date + "' + '%' GROUP BY Effectuer.Numero_projet, Projet.Nom_projet, Effectuer.Numero_matricule", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
// Get All effectuers
export const data_accueil = (result) => {
  db.query('SELECT COUNT(DISTINCT  Numero_matricule) AS Employees, COUNT (DISTINCT  Numero_projet) AS Projects FROM Projet, Employe ', (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
