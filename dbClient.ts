import { config } from './config';
import {Pool} from 'pg';

const client = new Pool({
    host:config.host,
    database:(config.ENV == "dev")? config.database:config.databaseTest,
    user:config.user,
    password:config.password
});

export default client;