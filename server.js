const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); // POST ��û�� ���� ���� �Ľ�

// /get-recommendation ��������Ʈ
app.post("/get-recommendation", async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const { prompt } = req.body; // Ŭ���̾�Ʈ�κ��� ���� prompt

    if (!prompt) {
        return res.status(400).send("Prompt�� �������� �ʾҽ��ϴ�.");
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 200,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        const recommendation = response.data.choices[0].message.content;
        res.json({ recommendation });
    } catch (error) {
        console.error("GPT API ȣ�� ����:", error.response ? error.response.data : error.message);
        res.status(500).send("��õ�� �����ϴ� �� ������ �߻��߽��ϴ�.");
    }
});

app.listen(port, () => {
    console.log(`������ http://localhost:${port}���� ���� ���Դϴ�.`);
});
