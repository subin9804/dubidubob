const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "pk_test_51Mj3gcHYCc7xvLimqxZOPpU0rCnTLBfyLe93uthyvaLgKNLxnbVrXyPT9jSCyXzhDMy0evCwlFM3l3R8Fra0wLO200aGwBzjQi"
);

const app = express();

app.use(cors({origin: "https://127.0.0.1:5001/clone-e343f/us-central1/api"})); // cors(url): url의 주소에서만 데이터에 접근이 가능하다.
app.use(express.json());



// 라우트부분 (url과 view를 매칭)
app.get("/", (req, res) => res.status(200).send("안녕"));

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;

    console.log("payment에서 가져온 total 곱하기 100은 이것입니다." + total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})


// onRequest: https요청을 처리하여 app에다 주입(https방식으로 구현)
exports.api = functions.https.onRequest(app);

/*
    http://localhost:5001/clone-e343f/us-central1/api
*/