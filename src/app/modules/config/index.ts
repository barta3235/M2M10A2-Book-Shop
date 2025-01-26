import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
console.log(path.join(process.cwd() + '.env'));

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  db_name: process.env.DB_NAME,
  db_password: process.env.DB_PASSWORD,
};
