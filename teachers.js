const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'paulbodner'
});

const cohort = process.argv[2];
//const limit = process.argv[3];

pool.query(`
SELECT teachers.name as teacher_name
FROM assistance_requests JOIN teachers
ON teachers.id = teacher_id
JOIN students 
ON students.id = student_id
JOIN cohorts
ON cohorts.id = students.cohort_id
WHERE cohorts.name = '${cohort}'
GROUP BY teachers.name;
`)
.then(res => {
  console.log('COHORT:   TEAHCER NAME')
  res.rows.forEach(user => {
    console.log(`${cohort}: ${user.teacher_name}`);
  })
})
.catch(err => console.error('query error', err.stack));