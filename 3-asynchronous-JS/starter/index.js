const fs = require('fs');
const superagent = require('superagent');

function readFilePro(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('I could not find that file');
            resolve(data);
        });
    });
}

function writeFilePro(file, message) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, message, err => {
            if (err) reject('I could not write that file');
            resolve('Success');
        })
    });
}

async function getDogPic() {
    try {
        const result = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${result}`);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log("Random dog image saved file");
    } catch (err) {
        console.log(err);
        throw err;
    }
    return '2: READY 🐶';
}

console.log('1: Will get dog pics');
(
    async () => {
        try {
            const x = await getDogPic();
            console.log(x);
            console.log('3: Done getting dog pics');
        } catch (err) {
            console.log('ERROR');
        }
    }
)();


/*
readFilePro(`${__dirname}/dog.txt`)
    .then(result => {
        console.log(`Breed: ${result}`);
        return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log("Random dog image saved file");
    })
    .catch(err => {
        console.log(err);
    });
 */