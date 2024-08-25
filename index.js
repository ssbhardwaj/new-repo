const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// POST /bfhl - Handles JSON input and returns processed data
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && isNaN(parseFloat(item)));
    const lowercaseAlphabets = alphabets.filter(item => item >= 'a' && item <= 'z');
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
        ? [lowercaseAlphabets.sort().reverse()[0]] 
        : [];

    res.json({
        is_success: true,
        user_id: "your_fullname_ddmmyyyy",
        email: "your_email@college.com",
        roll_number: "your_roll_number",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// GET /bfhl - Returns a hardcoded operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
