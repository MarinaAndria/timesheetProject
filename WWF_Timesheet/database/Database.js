/* eslint-disable quotes */
import sql from "mssql"

const db = await sql.connect({
  user: 'sa',
  password: 'SQLDATABASE',
  database: 'Timesheet', // Database name
  server: 'RS\\SQLEXPRESS',
  driver: 'msnodesqlv8',
  synchronize: true,
  trustServerCertificate: true,
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: 'SQLEXPRESS' // SQL Server instance name
  },
  port: 0
})

// export default Database
export default db
