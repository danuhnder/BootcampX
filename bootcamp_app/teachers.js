const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


pool.query(`
SELECT DISTINCT teachers.name 
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${process.argv[2]}' 
`)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${process.argv[2]}: ${teacher.name}`);
  })
}).catch(err => console.error('query error', err.stack));;

