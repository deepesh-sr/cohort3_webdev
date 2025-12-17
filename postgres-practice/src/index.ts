import {Client} from 'pg';
import dotenv from 'dotenv';

dotenv.config()

// const pgClient = new Client({
//     user : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     host : process.env.DB_HOST,
//     database : "neondb",
//     ssl:true,
// })

const pgClient = new Client(process.env.DB_URL);
async function main() {
    await pgClient.connect();
    const title = "Hello Hllo ";
    const author = "Deepesh";
    const price = 1; 
    const available = false;
    const queryInsert = `INSERT INTO books(title, author, price, available) VALUES ($1,$2,$3,$4)`
    // const response = await pgClient.query(queryInsert,[title,author,price,available]);

    const response =await pgClient.query("SELECT * FROM books");
    console.log(response.rows);
}
main()