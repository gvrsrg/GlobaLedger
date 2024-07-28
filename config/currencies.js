require("dotenv").config();

const { API_KEY } = process.env;

const currencies = [
    { name: "New Israeli Shekel", code: "ILS" },
    { name: "Russian Ruble", code: "RUB" },
    { name: "Ukrainian Hryvnia", code: "UAH" },
    { name: "US Dollar", code: "USD" },
    { name: "Euro", code: "EUR" },
    { name: "Ethiopian Birr", code: "ETB" },
    { name: "Argentine Peso", code: "ARS" },
    { name: "Brazilian Real", code: "BRL" },
    { name: "Canadian Dollar", code: "CAD" },
    { name: "British Pound", code: "GBP" },
    { name: "South African Rand", code: "ZAR" }
];

async function fetchAPI(url) {
    try{
        let result = await fetch(url)

        if(!result.ok) {
            throw new Error(`Error - ${result.status}`);
        }
        let data = await result.json()
        return data;
    }catch(error){
        console.log(error)
        throw new Error(`Error - ${error}`);
    }
}

const getRate = async (currFrom, currTo, amount) =>{
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currFrom}/${currTo}/${amount}`;
    console.log(url);
    try{
        let data = await fetchAPI(url)
        // rate = data.conversion_rate
        // if (amount === 0){
        //     return 0
        // }else if(data == undefined) {
        //     return 0
        // }else {
        //     resultElement.innerHTML = `${data.conversion_result}`
        // }
        return data
    }catch(error){
        console.log(error)
        throw new Error(`Error - ${error}`);
    }
}


module.exports = {currencies, getRate};