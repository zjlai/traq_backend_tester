// Router for student calls

const router = require('express').Router()
const { Client } = require('pg')
const asyncHandler = require('express-async-handler')

const postgresdb = process.env.RDS_DB_NAME
const postgresuser = process.env.RDS_USERNAME
const postgrespw = process.env.RDS_PASSWORD
const postgreshost = process.env.RDS_HOST
const postgresport = process.env.RDS_PORT

const connectionString = `postgresql://${postgresuser}:${postgrespw}@${postgreshost}:${postgresport}/${postgresdb}`

const connectDB = async () => {
  const conn = new Client({
    connectionString: connectionString
  })
  await conn.connect()
  return conn
}

const queryDB = async (conn, query) => {
  try {
    const data = await conn.query(query)
    return data.rows
  } catch(err) {
    console.log(err.stack)
    return err
  } finally {
    conn.end()
  }
}
router.get('/', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const query = `SELECT * FROM public.students WHERE student_id='${id}'`
  console.log(query)
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

router.get('/all', asyncHandler(async (req, res) => {
  const query = "SELECT * FROM public.students"
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

router.get('/*', function(req, res) {
  // console.log(req.apiGateway.event.queryStringParameters)
  console.log(req.apiGateway.event.pathParameters.proxy)
  res.json({success: 'get call succeed!', url: req.url});
});


module.exports = router
