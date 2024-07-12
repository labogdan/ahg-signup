const { Pool } = require('pg');

const DB_URL = process.env.DATABASE_URL || 'postgres://uf9j5mhh1evb7n:p636a0dd20c429115d6ebc799836fdea3fb237eadff7b04aa871f24acf50e6fd9@c6sfjnr30ch74e.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/dchb51ifa09ie4';

const pool = new Pool({
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

exports.getUsers = (req, res, next) => {

    const getString = 'SELECT * FROM users ORDER BY id DESC';
    pool.query(getString)
        .then(results => {
            let users = results.rows;
            res.json({ users })
        })
        .catch(err => { return res.status(400).send({
            message: err
         })});

    /*res.status(200).json({
        users: [
            {
                first_name: 'Ella',
                last_name: 'Bogdan',
                age: '9',
                grade: '4'
            },
            {
                first_name: 'Anna',
                last_name: 'Lee',
                age: '10',
                grade: '5'
            }
        ]
    });*/
};

exports.createUser = (req, res, next) => {

    const user = [ req.body ]
    //const addString = 'INSERT INTO users (first_name, last_name, age, grade, church_denomination, currently_attending_church, church_name, church_phone, kroger_participate, kroger_enrolled, volunteer_positions, volunteer_other, leader_value, specified_other, parent_name, email_address, is_adult_leader, paypal_address, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)';
    const addString = 'INSERT INTO users (first_name, last_name) VALUES ($1, $2)';
    console.log('create user');
    console.log(addString);
    console.log(req.body)

    pool.query(addString, user[[0]])
        .then(result => res.json(result))
        .catch(err => { return res.status(400).send({
            message: err
        })});

};
