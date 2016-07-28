const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];
    for (let i = 0; i < 4; i++) {
        const randomNumber = parseInt(Math.random() * digits.length);
        result.push(digits.splice(randomNumber, 1)[0]);
    }
    res.send(result.join(''));
});

const compareNumber=(originNumber, guessNumber)=> {
    const originnumber = originNumber.toString().split('');
    const guessnumber = guessNumber.split('');
    const rightDegitCount = guessnumber.filter(a=>originnumber.includes(a)).length;
    const a = guessnumber.filter(a=>guessnumber.indexOf(a) === originnumber.indexOf(a)).length;
    const b = rightDegitCount-a;
    return `${a}A${b}B`;
}

app.post('/Compare',(req,res)=>{

    const Answer = req.body.answer;
    const Input = req.body.value;
    const result = compareNumber(Answer,Input);
    console.log(result);
    res.send(result);
});

app.listen('3000', ()=> {
    console.log('服务器启动。。');
});
