const request = require('request');
const scanf = require('scanf');

const options = {
    baseUrl: 'http://localhost:3000',
    url: '/',
    method: 'GET',
    json: true
};

const isUnique = (item, index, array) => {
    return index === array.lastIndexOf(item);
};

request(options, (error, response, body)=> {
    let chances = 6;
    const answer = body;

    console.log(answer);
    console.log('Welcome!\n');
    console.log(`Please input your number(${chances}):`);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (input)=> {
        const isRepeat = input.split('').every(isUnique);
        if (!isRepeat) {
            console.log('Cannot input duplicate numbers!');
            console.log(`Please input your number(${chances}):`);
        }
        // else if (answer === input.trim()) {
        //     console.log('3333')
        //     console.log('Congratulations!');
        //     process.exit();
        // }
        else {
            const options = {
                baseUrl: `http://localhost:3000`,
                url: '/Compare',
                method: 'POST',
                json: true,
                body: {
                    answer: answer,
                    value: input
                }
            };
            request(options, (error, response, body)=> {

                chances--;
                if (chances === 0) {
                    console.log('Game Over\n');
                    console.log(`Answer:${answer}`);
                    process.exit();
                }
                else if (body === '4A0B') {
                    console.log('Congratulations!');
                    process.exit();
                }
                else {
                    console.log(body);
                    console.log(`Please input your number(${chances}):`);
                }
            });
        }
    });
});