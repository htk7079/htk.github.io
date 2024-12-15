// server.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config(); // .env 파일을 읽어 환경 변수로 로드

const app = express();
const port = process.env.PORT || 3000;

// 요청 본문을 JSON으로 처리
app.use(express.json());

app.post("/get-recommendation", async (req, res) => {
    const prompt = req.body.prompt; // 프롬프트는 클라이언트로부터 전달받음
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        // GPT API 호출
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
        res.json({ recommendation }); // 클라이언트에 추천 결과 전달
    } catch (error) {
        console.error("GPT API 호출 실패:", error);
        res.status(500).send("추천을 생성하는 중 오류가 발생했습니다.");
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
