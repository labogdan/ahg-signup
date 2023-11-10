const { Pool } = require('pg');

const DB_URL = process.env.DATABASE_URL || 'postgres://ovxcyjrfxzphmf:5e52ec1388243c42bc38f0d5d819da35b7d8fe461b8b347efe6f291d07e0e691@ec2-3-212-70-5.compute-1.amazonaws.com:5432/dbi6ittt9svgdi';

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
    const addString = 'INSERT INTO users (first_name, last_name, age, grade, church_denomination, currently_attending_church, church_name, church_phone, kroger_participate, kroger_enrolled, volunteer_positions, volunteer_other, parent_name, email_address, is_adult_leader, paypal_address, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)';
    console.log('create user');

    pool.query(addString, user[[0]])
        .then(result => res.json(result))
        .catch(err => { return res.status(400).send({
            message: err
        })});

};
