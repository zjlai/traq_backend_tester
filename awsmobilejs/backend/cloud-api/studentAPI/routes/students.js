// Router for student calls

const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const {connectDB, queryDB} = require('./common')

router.get('/', asyncHandler(async (req, res) => {
  const id = req.apiGateway.event.requestContext.identity.cognitoIdentityId
  const query = `SELECT * FROM public.students WHERE student_id='${id}'`
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


/** POST CALLS **/

router.post('/', asyncHandler(async (req, res) => {
  const queryData = req.body
  const student = {
    student_id: req.apiGateway.event.requestContext.identity.cognitoIdentityId,
    email : queryData.email,
    date_registered: new Date(),
    ethnicity: queryData.ethnicity,
    nationality: queryData.nationality,
    dob: queryData.dob,
    contact_num: queryData.contact_num,
    english_proficiency: queryData.proficiency
  }

  const query = {
    text: `INSERT INTO public.students(
          student_id, email, date_registered, ethnicity, nationality, dob, contact_num, english_proficiency)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: Object.values(student)
  }

  console.log(query)
  const conn = await connectDB()
  const result = await queryDB(conn, query)
  res.json(result)
}));

//
//
// /** PUT CALLS **/
// router.put('/*', asyncHandler(async (req, res) => {
//   console.log(req.apiGateway.event)
//   res.json({success: 'post call succeed!', url: req.url})
// }));
//
// /** DELETE CALLS **/
// router.delete('/*', asyncHandler(async (req, res) => {
//   console.log(req.apiGateway.event)
//   res.json({success: 'post call succeed!', url: req.url})
// }));


module.exports = router
