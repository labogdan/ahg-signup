const { Pool } = require('pg');

const DB_URL = process.env.DATABASE_URL || 'postgres://uf9j5mhh1evb7n:p636a0dd20c429115d6ebc799836fdea3fb237eadff7b04aa871f24acf50e6fd9@c6sfjnr30ch74e.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/dchb51ifa09ie4';

const pool = new Pool({
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

exports.getUsers = (req, res, next) => {

    const getString = 'SELECT * FROM users';
    console.log('getting users')
    console.log(getString)
    pool.query(getString)
        .then(results => {
            let users = results.rows;
            res.json({ users })
        })
        .catch(err => { 
            console.log(err)
            return res.status(400).send({
            message: err
            })
        });

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


/*

exports.createUser = (req, res, next) => {
    const user = req.body;  // Assuming req.body is already the array sent from front-end
    const addString = 'INSERT INTO users (first_name, last_name, age, grade, church_denomination, currently_attending_church, church_name, church_phone, kroger_participate, kroger_enrolled, volunteer_positions, volunteer_other, leader_value, specified_other, parent_name, email_address, is_adult_leader, paypal_address, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)';
    
    console.log('create user');
    console.log(addString);
    console.log(user);

    // Prepare values array based on the order in your INSERT statement
    const values = [
        user[0],  // first_name
        user[1],  // last_name
        parseInt(user[2]),  // age (assuming it should be an integer)
        parseInt(user[3]),  // grade (assuming it should be an integer)
        user[4],  // church_denomination
        user[5],  // currently_attending_church (boolean)
        user[6],  // church_name
        user[7],  // church_phone
        user[8],  // kroger_participate (boolean)
        user[9],  // kroger_enrolled (boolean)
        user[10][0],  // volunteer_positions (assuming it's an array with one element)
        user[11],  // volunteer_other
        user[12],  // leader_value
        user[13],  // specified_other
        user[14],  // parent_name
        user[15],  // email_address
        user[16],  // is_adult_leader (boolean)
        user[17],  // paypal_address
        parseInt(user[18])  // total_cost (assuming it should be an integer)
    ];

    console.log(values);

    pool.query(addString, values)
        .then(result => res.json(result))
        .catch(err => {
            console.error('Error executing query:', err);
            return res.status(400).send({
                message: err.message
            });
        });
};*/

exports.createUser = (req, res, next) => {

    const user = [ req.body ]
    const addString = 'INSERT INTO users (first_name, last_name, age, grade, church_denomination, currently_attending_church, church_name, church_phone, kroger_participate, kroger_enrolled, volunteer_positions, volunteer_other, leader_value, specified_other, parent_name, email_address, is_adult_leader, paypal_address, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)';
    console.log('create user');
    console.log(addString);
    console.log(req.body)

    pool.query(addString, user[0])
        .then(result => res.json(result))
        .catch(err => { return res.status(400).send({
            message: err
        })});

};
