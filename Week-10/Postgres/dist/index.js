"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// Async function to insert data into a tableasync function insertData(username: string, email: string, password: string) {
const client = new pg_1.Client({
    connectionString: 'postgresql://postgres:mysecretpassword@localhost:5432/test'
});
/*  async function createUsersTable() {
    try {
        await client.connect();
        const result = await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log(result);
    } catch (error) {
        console.error('Error creating users table:', error);
    } finally {
        await client.end();
    }
}

createUsersTable();
*/
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
            const values = [username, email, password];
            const result = yield client.query(query, values);
            console.log('Inserted data:', result.rows[0]);
        }
        catch (error) {
            console.error('Error inserting data:', error);
        }
        finally {
            yield client.end();
        }
    });
}
insertData('username5', 'user5@example.com', 'user_password');
// Example usageinsertData('username5', 'user5@example.com', 'user_password').catch(console.error);
