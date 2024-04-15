import { Client } from 'pg';

// Async function to insert data into a tableasync function insertData(username: string, email: string, password: string) {
  const client = new Client({
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

async function insertData(username:String, email:String, password:String) {
    try {
        await client.connect();
        const query = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [username, email, password];
        const result = await client.query(query, values);
        
        console.log('Inserted data:', result.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await client.end();
    }
}

insertData('username5', 'user5@example.com', 'user_password');
// Example usageinsertData('username5', 'user5@example.com', 'user_password').catch(console.error);