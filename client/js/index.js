// global variable
const resultBox = document.getElementsByClassName('result')[0];
const resultBoxPassword = document.getElementsByClassName('result__password')[0];
const resultBoxUsername = document.getElementsByClassName('result__username')[0];
const generateButton = document.getElementById('generate');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const number = document.getElementById('number');
const special = document.getElementById('special');
const passwordLength = document.getElementById('passwordLength');

// to store password and username options
let usernameOption = [];
let passwordOption = [];
let passwordlengthOption = [];

/**
 * This function will hides the resultbox when dom load
 */
function hideResultBoxOnDomLoad() {
    window.addEventListener('DOMContentLoaded', (event) => {
        resultBox.style.visibility = 'hidden';
        // resultBox.innerHTML = '‏‎ ';
    });
}

/**
 * This function will spit out geneated text into result box
 * @param {String} input, username
 */
function showResultBox(password, username) {
    resultBox.style.visibility = 'visible';
    resultBoxPassword.innerHTML = `<b>Password</b>: ${password}`;
    resultBoxUsername.innerHTML = `<b>Username</b>: ${username}`;
}

/**
 * This function will spit out geneated err text into result box
 * @param {String} input
 */
function showErrBox(input) {
    resultBox.style.background = '#ECB0B0';
    resultBox.style.color = '#ffffff';
    resultBox.innerHTML = input;
}

/**
 * This function will get value when user have checked the password
 * options and push it into an array above
 * @param {Object} option
 */
function getPasswordCheckboxValue(option) {
    if (option.checked == true) {
        passwordOption.push(option.value);
    } else {
        const pass = passwordOption.filter((pass) => pass != option.value);
        passwordOption = pass;
    }
}

/**
 * This function will get value when user have checked
 * the username options and push it into an array above
 * @param {Object} option
 */
function getUsernameCheckboxValue(option) {
    if (option.checked == true) {
        usernameOption.push(option.value);
    } else {
        const pass = usernameOption.filter((pass) => pass != option.value);
        usernameOption = pass;
    }
}

/**
 * This function returns the lenght of an password
 * @returns {Number}
 */
function getPasswordLengthValue() {
    const length = Number.parseInt(passwordLength.value); // convert
    passwordlengthOption.push(length);
    passwordlengthOption = passwordlengthOption.slice(passwordlengthOption.length - 1);
    return passwordlengthOption[passwordlengthOption.length - 1];
}

/**
 * This function will returns user input options into api url
 * @returns {String} Example: http://localhost:3000/20/uppercase
 */
function getUserInputIntoAPIURL() {
    const length = parseInt(getPasswordLengthValue()) || 14;
    const passwordParams = passwordOption.join('/');
    const usernameParams = usernameOption.join('/');

    console.log(
        `${window.location.href}password/${length}/${passwordParams}`,
        `${window.location.href}username/${usernameParams}`
    );

    return {
        passwordAPI: `${window.location.href}password/${length}/${passwordParams}`,
        usernameAPI: `${window.location.href}username/${usernameParams}`,
    };

    // return {
    //     passwordAPI: `http://localhost:6968/password/${length}/${passwordParams}`,
    //     usernameAPI: `http://localhost:6968/username/${usernameParams}`,
    // };
}

/**
 * This function will fetch data and returing passord and username
 * @returns {Object}
 */
async function fetchData() {
    try {
        const { passwordAPI, usernameAPI } = getUserInputIntoAPIURL();

        let [password, username] = await Promise.all([
            fetch(passwordAPI).then((res) => res.json()),
            fetch(usernameAPI).then((res) => res.json()),
        ]);

        return {
            password: password.password,
            username: username.username,
        };
    } catch (err) {
        showErrBox(err.message);
    }
}

/**
 * This function will request api generated by user into an actualy api
 * and spit ot the text into text
 */
function generate() {
    // btn 'generate' click
    generateButton.addEventListener('click', () => {
        fetchData().then((res) => {
            console.log('generate()', res);
            console.log('test');

            const { password, username } = res;

            showResultBox(password, username);
        });
    });
}

// -------------------- main -------------------
(function main() {
    hideResultBoxOnDomLoad();
    generate();
})();
