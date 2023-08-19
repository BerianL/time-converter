document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.querySelector(".btn-outline");
    calculateButton.addEventListener("click", handleCalculate);
  
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");
  
    fromUnitSelect.addEventListener("change", () => {
      const selectedFromUnit = fromUnitSelect.value;
      updateToUnitOptions(toUnitSelect, selectedFromUnit);
    });
  
    toUnitSelect.addEventListener("change", () => {
      const selectedToUnit = toUnitSelect.value;
      updateToUnitOptions(fromUnitSelect, selectedToUnit);
    });
  });
  
  function handleCalculate() {
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");
  
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
  
    const conversionFactor = getConversionFactor(fromUnit, toUnit);
  
    if (conversionFactor === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unsupported conversion!",
      });
      return;
    }
  
    Swal.fire({
        title: `Enter the value in ${fromUnit} to convert into ${toUnit}`,
        input: "number",
      inputAttributes: {
        step: "any",
      },
      showCancelButton: true,
      confirmButtonText: "Convert",
    }).then((result) => {
      if (result.isConfirmed && !isNaN(result.value)) {
        const inputValue = parseFloat(result.value);
        const convertedValue = inputValue * conversionFactor;
  
        Swal.fire({
            icon: "success",
            title: "Conversion Result",
            text: `${inputValue.toLocaleString()} ${fromUnit} is equal to ${convertedValue.toLocaleString()} ${toUnit}`,
          });
      } else if (result.isConfirmed && isNaN(result.value)) {
        Swal.fire({
          icon: "error",
          title: "Invalid input",
          text: "Please enter a valid number.",
        });
      }
    });
  }
  
  function updateToUnitOptions(selectElement, selectedValue) {
    const options = selectElement.querySelectorAll("option");
    for (const option of options) {
      option.disabled = false;
      option.style.display = ""; // Reset display property
    }
  
    const selectedOption = selectElement.querySelector(`option[value="${selectedValue}"]`);
    if (selectedOption) {
      selectedOption.disabled = true;
      selectedOption.style.display = "none"; // Hide the selected option
    }
  }
  
  function getConversionFactor(fromUnit, toUnit) {
    const conversionFactors = {
      seconds: {
        minutes: 1 / 60,
        hours: 1 / 3600,
        days: 1 / 86400,
        weeks: 1 / 604800,
        months: 1 / 2592000,
        years: 1 / 31536000,
      },
      minutes: {
        seconds: 60,
        hours: 1 / 60,
        days: 1 / 1440,
        weeks: 1 / 10080,
        months: 1 / 43200,
        years: 1 / 525600,
      },
      hours: {
        seconds: 3600,
        minutes: 60,
        days: 1 / 24,
        weeks: 1 / 168,
        months: 1 / 720,
        years: 1 / 8760,
      },
      days: {
        seconds: 86400,
        minutes: 1440,
        hours: 24,
        weeks: 1 / 7,
        months: 1 / 30.44,
        years: 1 / 365.25,
      },
      weeks: {
        seconds: 604800,
        minutes: 10080,
        hours: 168,
        days: 7,
        months: 1 / 4.35,
        years: 1 / 52.18,
      },
      months: {
        seconds: 2592000,
        minutes: 43200,
        hours: 720,
        days: 30.44,
        weeks: 4.35,
        years: 1 / 12,
      },
      years: {
        seconds: 31536000,
        minutes: 525600,
        hours: 8760,
        days: 365.25,
        weeks: 52.18,
        months: 12,
      },
    };
  
    if (fromUnit in conversionFactors && toUnit in conversionFactors[fromUnit]) {
      return conversionFactors[fromUnit][toUnit];
    }
  
    return null; // Unsupported conversion
  }
  