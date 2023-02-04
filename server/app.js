import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema.js';
import cors from 'cors';

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://ql-db:123@cluster0.lv2osfg.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.once('open', () => console.log('connected to database'));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {

});
