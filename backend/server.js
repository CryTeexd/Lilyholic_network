const express = require('express');

const app = express();
const PORT = 1980;

app.get('/', (req, res) => {
    res.send('Dear Blue Cat, talk to me. Tell me about Lily. Or about the Ether.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});