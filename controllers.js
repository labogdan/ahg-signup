//const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const { Pool } = require('pg'); // import node-postgres

const DB_URL = process.env.DATABASE_URL || 'postgres://yhaldrjyvtauiy:cfe98df02a0874281a267a3b58d669959fd1aaf96e31b4580aa42bc9d5618f9b@ec2-18-214-35-70.compute-1.amazonaws.com:5432/d882a6s32l45oe';

const pool = new Pool({ // create connection to database
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false // don't check for SSL cert
    }
});

exports.getUsers = (req, res, next) => {

    const getString = 'SELECT * FROM users';
    pool.query(getString) // send query to select all rows from the 'my_activities' table
        .then(results => {
            let users = results.rows;
            res.json({ users })
        })
        .catch(err => console.log(err));

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
    const addString = 'INSERT INTO users (first_name, last_name, age, grade, kroger, volunteer_positions) VALUES ($1, $2, $3, $4, $5, $6)';

    console.log(user);

    pool.query(addString, user[[0]])
        .then(result => res.json(result))
        .catch(err => console.log(err));

    // Create post in db
    /*const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Post created successfully!',
        post: { id: new Date().toISOString(), title: title, content: content }
    });*/
};
