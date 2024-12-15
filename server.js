require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');  // CORS ��Ű�� �߰�

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());  // ��� ��ó������ ��û�� ���
app.use(express.static('public'));
app.use(express.json());

// Endpoint to handle the GPT API request
app.post('/gpt-api', async (req, res) => {
  const userInput = req.body.input;
  
  // �α׸� �� ��û�� ����� �������� Ȯ��
  console.log('Received request:', userInput);
  
  try {
      const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
              model: 'gpt-3.5-turbo',
              messages: [
                  { role: 'system', content: 'You are a helpful assistant.' },
                  { role: 'user', content: userInput }
              ],
              max_tokens: 100
          },
          {
              headers: {
                  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      console.log('Response from GPT:', response.data);  // GPT ���� �α� �߰�

      res.json({ output: response.data.choices[0].message.content.trim() });
  } catch (error) {
      console.error('Error:', error);  // ������ �߻��ϸ� �α� ���
      res.status(500).json({ output: "An error occurred while fetching data from GPT." });
  }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
