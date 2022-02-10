const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'paulbodner'
});

const cohort = process.argv[2];
const limit = process.argv[3];

pool.query(`
SELECT students.id as id , students.name as name, cohorts.name as cohort_name
FROM students JOIN cohorts
ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '${cohort}%'
LIMIT ${limit};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));