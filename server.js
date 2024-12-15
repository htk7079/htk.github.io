const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); // POST 요청에 대한 본문 파싱

// /get-recommendation 엔드포인트
app.post("/get-recommendation", async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const { prompt } = req.body; // 클라이언트로부터 받은 prompt

    if (!prompt) {
        return res.status(400).send("Prompt가 제공되지 않았습니다.");
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
        console.error("GPT API 호출 실패:", error.response ? error.response.data : error.message);
        res.status(500).send("추천을 생성하는 중 오류가 발생했습니다.");
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
