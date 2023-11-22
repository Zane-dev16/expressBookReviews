const axios = require('axios').default;
let url = "https://itsirellzane-5000.theiadocker-3-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai";
async function getBooks() {
    const result = await axios.get(url);
    console.log(result.data);
}

function getBooksByISBN(isbn) {
    axios.get(url + `/isbn/${isbn}`).then(
        (result) => {
            console.log(result.data);
        }
    );
}

function getBooksByAuthor(author) {
    axios.get(url + `/author/${author}`).then(
        (result) => {
            console.log(result.data);
        }
    );
}

function getBooksByTitle(title) {
    axios.get(url + `/title/${title}`).then(
        (result) => {
            console.log(result.data);
        }
    );
}

