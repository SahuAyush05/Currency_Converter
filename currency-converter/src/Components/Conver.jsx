import React, { useState, useEffect } from "react";
import axios from "axios";
import SouthIcon from '@mui/icons-material/South';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import "./Convert.css";
const Convert = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [shouldFetchData, setShouldFetchData] = useState(true);

  useEffect(() => {
    if (shouldFetchData) {
      const fetchCurrencies = async () => {
        try {
          const response = await axios.get(
            "https://api.forexrateapi.com/v1/symbols?api_key=f9021f8c867b9a982a85bcf2159c2a7f"
          );
          const currencyCodes = Object.keys(response.data.symbols);
          // console.log(currencyCodes);
          setCurrencies([...currencyCodes]);
          setFromCurrency("USD");
          setToCurrency("EUR");
          setShouldFetchData(false);
        } catch (error) {
          console.error("Error fetching currencies:", error);
        }
      };

      fetchCurrencies();
    }
  }, [shouldFetchData]);

  useEffect(() => {
    const exchangeAmount = async () => {
      if (fromCurrency !== "" && toCurrency !== "") {
        try {
          const response = await axios.get(
            `https://api.forexrateapi.com/v1/convert?api_key=f9021f8c867b9a982a85bcf2159c2a7f&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
          );
          console.log(response);
          const convertedRate = response.data.result;
          const rate = response.data.info.quote;
          console.log(rate);
          console.log(convertedRate);
          setExchangeRate(rate);
          setConvertedAmount(convertedRate);
        } catch (error) {
          console.error("Error fetching exchange rate:", error);
        }
      }
    };
    exchangeAmount();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      amount,
      fromCurrency,
      toCurrency,
      exchangeRate,
      convertedAmount,
    });
  };

  return (
    <div class="max-w-2xl p-6 rounded m-auto overflow-hidden shadow-[0px_6px_20px_0px] shadow-[#F3F0CA] bg-[#11235A]">
      <h2 class=" bold pb-12 text-5xl text-[#FFBB5C]">Check Exchange Rate</h2>
      <form onSubmit={handleSubmit}>
        <div class="px-12 h-12 space-x-12 mb-4">
          <label class="text-3xl text-[#F5F5DC]" htmlFor="amount">
            Amount :
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            class=" bg-[#86B6F6] text-2xl rounded text-[#11235A] min-w-16 max-w-64"
          />
        </div>
        <div class="flex justify-center items-center">
        <div class="px-12 h-12 space-x-12 mb-4">
            <label  class="text-3xl text-[#F5F5DC]"  htmlFor="From">From:</label>
            <select
              id="from"
              class=" bg-[#86B6F6] text-2xl rounded text-[#11235A] min-w-16 max-w-64"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          
          <div class="px-12 h-12 space-x-12 mb-4">
            <label  class="text-3xl text-[#F5F5DC]"  htmlFor="To">To:</label>
            <select
              id="To"
              value={toCurrency}
              onChange={handleToCurrencyChange}
              class=" bg-[#86B6F6] text-2xl rounded text-[#11235A] min-w-16 max-w-64"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
          
          
          
        

        <button
          type="submit"
          class=" w-32 m-2 bg-[#1e104a] hover:shadow-[0px_6px_20px_0px] text-[#FFBB5C] font-semibold py-2 px-4 rounded"
        >
          GET
        </button>
      </form>
      {submittedData && (
        <div >
          <div class="text-3xl text-[#F5F5DC] p-4">Exchange Rate: {submittedData.exchangeRate}</div>
          <div class="text-3xl text-[#F5F5DC] p-4">Converted Rate: {submittedData.convertedAmount}</div>
        </div>
      )}
    </div>
  );
};

export default Convert;
