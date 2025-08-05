import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.use((req, res) => {
    res.status(404).send('404 : Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 : Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
