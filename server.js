// server.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config(); // .env ������ �о� ȯ�� ������ �ε�

const app = express();
const port = process.env.PORT || 3000;

// ��û ������ JSON���� ó��
app.use(express.json());

app.post("/get-recommendation", async (req, res) => {
    const prompt = req.body.prompt; // ������Ʈ�� Ŭ���̾�Ʈ�κ��� ���޹���
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        // GPT API ȣ��
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 200,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const recommendation = response.data.choices[0].message.content;
        res.json({ recommendation }); // Ŭ���̾�Ʈ�� ��õ ��� ����
    } catch (error) {
        console.error("GPT API ȣ�� ����:", error);
        res.status(500).send("��õ�� �����ϴ� �� ������ �߻��߽��ϴ�.");
    }
});

// ���� ����
app.listen(port, () => {
    console.log(`������ ${port}�� ��Ʈ���� ���� ���Դϴ�.`);
});
