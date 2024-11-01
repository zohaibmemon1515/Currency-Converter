var countryList = {
    USD: "US",
    EUR: "FR",
    JPY: "JP",
    GBP: "GB",
    PKR: "PK",
};
var conversionRates = {
    USD: { PKR: 280.0, EUR: 0.94, JPY: 150.0, GBP: 0.75 },
    PKR: { USD: 0.0036, EUR: 0.0034, JPY: 0.54, GBP: 0.0027 },
    EUR: { USD: 1.06, PKR: 295.0, JPY: 159.0, GBP: 0.80 },
    JPY: { USD: 0.0067, PKR: 1.83, EUR: 0.0063, GBP: 0.0050 },
    GBP: { USD: 1.33, PKR: 370.0, EUR: 1.25, JPY: 200.0 },
};
var fromSelect = document.querySelector("#fromSelect");
var toSelect = document.querySelector("#toSelect");
var fromFlag = document.querySelector("#fromFlag");
var toFlag = document.querySelector("#toFlag");
var amountInput = document.querySelector(".amountInput input");
var resultDisplay = document.querySelector(".resultDisplay");
var convertBtn = document.querySelector(".convertButton");
resultDisplay.innerText = "";
for (var currCode in countryList) {
    var fromOption = document.createElement("option");
    fromOption.value = currCode;
    fromOption.innerText = currCode;
    fromSelect.append(fromOption);
    var toOption = document.createElement("option");
    toOption.value = currCode;
    toOption.innerText = currCode;
    toSelect.append(toOption);
}
fromSelect.value = "USD";
toSelect.value = "PKR";
var updateFlag = function () {
    fromFlag.src = "https://flagsapi.com/".concat(countryList[fromSelect.value], "/flat/64.png");
    toFlag.src = "https://flagsapi.com/".concat(countryList[toSelect.value], "/flat/64.png");
};
var convertCurrency = function () {
    var _a;
    var fromCurrency = fromSelect.value;
    var toCurrency = toSelect.value;
    var amountStr = amountInput.value.trim();
    var amount = parseFloat(amountStr);
    if (!amountStr || isNaN(amount) || amount <= 0) {
        resultDisplay.innerText = "Please enter a valid amount.";
        return;
    }
    var rate = (_a = conversionRates[fromCurrency]) === null || _a === void 0 ? void 0 : _a[toCurrency];
    if (rate !== undefined) {
        var convertedAmount = amount * rate;
        resultDisplay.innerText = "".concat(amount, " ").concat(fromCurrency, " = ").concat(convertedAmount.toFixed(2), " ").concat(toCurrency, " (Rate: 1 ").concat(fromCurrency, " = ").concat(rate.toFixed(4), " ").concat(toCurrency, ")");
    }
    else {
        resultDisplay.innerText = "Conversion rates not available!";
        console.error("No conversion rate found for:", fromCurrency, toCurrency);
    }
};
fromSelect.addEventListener("change", updateFlag);
toSelect.addEventListener("change", updateFlag);
convertBtn.addEventListener("click", convertCurrency);
updateFlag();
