require("dotenv").config();
const bcrypt = require("bcrypt");
const knex = require("../db").handle;
const jwt = require("jsonwebtoken");

async function authenticate({ username, password }, res) {
  const jwtSecret = process.env.JWT_SECRET;

  if (
    !username ||
    !password ||
    username?.length === 0 ||
    password?.length === 0
  ) {
    res.status(401).send();
  }

  // Check database for username
  knex()("users")
    .select("*")
    .where("username", username)
    .then((rows) => {
      if (rows?.length === 1 && rows[0]?.username === username) {
        // Username is in database, check password hash
        bcrypt.compare(password, rows[0]?.hash, (err, result) => {
          if (err) {
            console.log(`bcrypt compare error for username ${username}`);
            res.status(401).send();
          }

          if (result === true) {
            // Username and password match, create JWT token valid for 1 day
            const token = jwt.sign({ sub: rows[0]?.id }, jwtSecret, {
              expiresIn: "1d",
            });

            res.json({ token });
          } else {
            // Password doesn't match
            console.log(`Passwords don't match for username ${username}`);
            res.status(401).send();
          }
        });
      } else {
        // Username doesn't match
        console.log(`Username not in database: ${username}`);
        res.status(401).send();
      }
    })
    .catch((err) => {
      console.error("User service authenticate catch knex error:");
      console.error(err);
      res.status(401).send();
    });
}

module.exports = { authenticate };
