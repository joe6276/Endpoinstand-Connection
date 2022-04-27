import dotenv from 'dotenv'
dotenv.config()

const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server:process.env.SERVER_NAME as string
,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
  ,
  options: {
    encrypt: true,
    trustServerCertificate: true 
  }
}

export default sqlConfig