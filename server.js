require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');  // CORS 패키지 추가

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());  // 모든 출처에서의 요청을 허용
app.use(express.static('public'));
app.use(express.json());

// Endpoint to handle the GPT API request
app.post('/gpt-api', async (req, res) => {
    const userInput = req.body.input;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: userInput }
                ],
                max_tokens: 200
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({ output: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ output: "An error occurred while fetching data from GPT." });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
