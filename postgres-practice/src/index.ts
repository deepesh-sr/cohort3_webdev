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

const pgClient = new Client(process.env.DS_URL);
async function main() {
    await pgClient.connect();
    const response =await pgClient.query("SELECT * FROM books");
    console.log(response.rows);
}
main()