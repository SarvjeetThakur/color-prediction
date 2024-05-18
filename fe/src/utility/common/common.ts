import CryptoJS from 'crypto-js'


const generateRandomNumber: GenerateRandomNumber = (min = 0, max = 10) => {
    const range = max - min + 1;
    const randomBytes = CryptoJS.lib.WordArray.random(4);
    const randomNumber = randomBytes.words[0] % range + min;
    return randomNumber;
};

const currencyFormate: CurrencyFormate = (country = 'INR', price = 0) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: country.toUpperCase(),
    }).format(price ?? 0);
};

export {
    generateRandomNumber,
    currencyFormate,
}