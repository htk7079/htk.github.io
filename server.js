const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.get('/get-recommendation', async (req, res) => {
    const apiKey = process.env.API_KEY;
    
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: '��õ Ȱ���� �˷���' },
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );
        
        res.json(response.data);
    } catch (error) {
        res.status(500).send('API ��û ����');
    }
});

app.listen(port, () => {
    console.log(`������ http://localhost:${port}���� ���� ���Դϴ�.`);
});
