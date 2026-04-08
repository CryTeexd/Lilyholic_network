const express = require('express');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 1980;

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Dear Blue Cat, talk to me. Tell me about Lily. Or about the Ether.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});