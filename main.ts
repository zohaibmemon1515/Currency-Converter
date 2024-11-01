const countryList = {
  USD: "US", 
  EUR: "FR", 
  JPY: "JP", 
  GBP: "GB", 
  PKR: "PK",
};

const conversionRates = {
  USD: { PKR: 280.0, EUR: 0.94, JPY: 150.0, GBP: 0.75 },
  PKR: { USD: 0.0036, EUR: 0.0034, JPY: 0.54, GBP: 0.0027 },
  EUR: { USD: 1.06, PKR: 295.0, JPY: 159.0, GBP: 0.80 },
  JPY: { USD: 0.0067, PKR: 1.83, EUR: 0.0063, GBP: 0.0050 },
  GBP: { USD: 1.33, PKR: 370.0, EUR: 1.25, JPY: 200.0 },
};

const fromSelect = document.querySelector("#fromSelect") as HTMLSelectElement;
const toSelect = document.querySelector("#toSelect") as HTMLSelectElement;
const fromFlag = document.querySelector("#fromFlag") as HTMLImageElement;
const toFlag = document.querySelector("#toFlag") as HTMLImageElement;
const amountInput = document.querySelector(".amountInput input") as HTMLInputElement;
const resultDisplay = document.querySelector(".resultDisplay") as HTMLElement;
const convertBtn = document.querySelector(".convertButton") as HTMLButtonElement;

resultDisplay.innerText = "";


for (let currCode in countryList) {
  let fromOption = document.createElement("option");
  fromOption.value = currCode;
  fromOption.innerText = currCode;
  fromSelect.append(fromOption);

  let toOption = document.createElement("option");
  toOption.value = currCode;
  toOption.innerText = currCode;
  toSelect.append(toOption);
}

fromSelect.value = "USD"; 
toSelect.value = "PKR";  
const updateFlag = () => {
  fromFlag.src = `https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`;
  toFlag.src = `https://flagsapi.com/${countryList[toSelect.value]}/flat/64.png`;
};

const convertCurrency = () => {
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;
  const amountStr = amountInput.value.trim();
  const amount = parseFloat(amountStr);

  if (!amountStr || isNaN(amount) || amount <= 0) {
    resultDisplay.innerText = "Please enter a valid amount.";
    return;
  }

  const rate = conversionRates[fromCurrency]?.[toCurrency];

  if (rate !== undefined) {
    const convertedAmount = amount * rate;
    resultDisplay.innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency} (Rate: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency})`;
  } else {
    resultDisplay.innerText = "Conversion rates not available!";
    console.error("No conversion rate found for:", fromCurrency, toCurrency);
  }
};


fromSelect.addEventListener("change", updateFlag);
toSelect.addEventListener("change", updateFlag);
convertBtn.addEventListener("click", convertCurrency);


updateFlag();
