// Default Rates
let pipeRate = 990;
let elbowRate = 910;
let transectionRate = 3100;
let equalTeeRate = 900;
let couplerRate = 600;
let stubsRate = 850;
let flangeRate = 430;
let nutboltRate = 90;

// 3-inch specific rates
let pipeRate3 = 1500; // Example rate, adjust as needed
let transectionRate3 = 4000; // Example rate, adjust as needed
let couplerRate3 = 800; // Example rate, adjust as needed
let stubFlangeRate3 = 1200; // Example rate, adjust as needed
let elbowRate3 = 1500;
let nutboltRate3 = 100;


let transportationCost = 3500;
let labourCost = 1000;

// Load saved rates on page load
const savedRates = JSON.parse(localStorage.getItem("pipeCalculatorRates"));

if (savedRates) {
    // Update rates with saved values
    pipeRate = savedRates.pipeRate2 || 990;
    elbowRate = savedRates.elbowRate || 910;
    transectionRate = savedRates.transectionRate2 || 3100;
    equalTeeRate = savedRates.equalTeeRate || 900;
    couplerRate = savedRates.couplerRate2 || 600;
    stubsRate = savedRates.stubsRate || 850;
    flangeRate = savedRates.flangeRate || 430;
    nutboltRate = savedRates.nutbolt || 90;
    pipeRate3 = savedRates.pipeRate3 || 1500;
    transectionRate3 = savedRates.transectionRate3 || 4000;
    couplerRate3 = savedRates.couplerRate3 || 800;
    stubFlangeRate3 = savedRates.stubFlangeRate3 || 1200;
    elbowRate3 = savedRates.elbowRate3 || 1500;
    nutboltRate3 = savedRates.nutboltRate3 || 100;

    // Populate settings inputs
    document.getElementById("pipeRate").value = pipeRate;
    document.getElementById("elbowRate").value = elbowRate;
    document.getElementById("transectionRate").value = transectionRate;
    document.getElementById("equalTeeRate").value = equalTeeRate;
    document.getElementById("couplerRate").value = couplerRate;
    document.getElementById("pipeRate3").value = pipeRate3;
    document.getElementById("transectionRate3").value = transectionRate3;
    document.getElementById("couplerRate3").value = couplerRate3;
    document.getElementById("stubFlangeRate3").value = stubFlangeRate3;
    document.getElementById("transportationCost").value = transportationCost;
    document.getElementById("labourCost").value = labourCost;
}

// DOM Elements
const settingsPage = document.getElementById("settings-page");
const settingsBtn = document.getElementById("settings-btn");
const saveSettingsBtn = document.getElementById("save-settings-btn");
const calculateBtn = document.getElementById("calculate-btn");
const backButton = document.getElementById("back-button");
const downloadButton = document.querySelector(".download-button");
const pipeToggle = document.getElementById("pipeToggle");
const inputs2inch = document.getElementById("inputs-2inch");
const inputs3inch = document.getElementById("inputs-3inch");

// Toggle between 2-inch and 3-inch inputs
pipeToggle.addEventListener("change", () => {
    if (pipeToggle.value === "2inch") {
        inputs2inch.classList.remove("hidden");
        inputs3inch.classList.add("hidden");
    } else {
        inputs2inch.classList.add("hidden");
        inputs3inch.classList.remove("hidden");
    }

    // Add to pipeToggle event listener
    const settings2Inch = document.getElementById('settings-2inch');
    const settings3Inch = document.getElementById('settings-3inch');

    if (pipeToggle.value === "2inch") {
        settings2Inch.classList.remove("hidden");
        settings3Inch.classList.add("hidden");
    } else {
        settings3Inch.classList.remove("hidden");
        settings2Inch.classList.add("hidden");
    }

});

// Toggle Settings Page
settingsBtn.addEventListener("click", () => {
    settingsPage.classList.toggle("hidden");
});

// Save Settings
saveSettingsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // 2-inch rates
    pipeRate = parseFloat(document.getElementById("pipeRate").value);
    elbowRate = parseFloat(document.getElementById("elbowRate").value);
    transectionRate = parseFloat(document.getElementById("transectionRate").value);
    equalTeeRate = parseFloat(document.getElementById("equalTeeRate").value);
    couplerRate = parseFloat(document.getElementById("couplerRate").value);
    stubsRate = parseFloat(document.getElementById("stubsRate").value);
    flangeRate = parseFloat(document.getElementById("flangeRate").value);
    nutboltRate = parseFloat(document.getElementById("nutboltRate").value);

    // 3-inch rates
    pipeRate3 = parseFloat(document.getElementById("pipeRate3").value);
    transectionRate3 = parseFloat(document.getElementById("transectionRate3").value);
    couplerRate3 = parseFloat(document.getElementById("couplerRate3").value);
    stubFlangeRate3 = parseFloat(document.getElementById("stubFlangeRate3").value);
    elbowRate3 = parseFloat(document.getElementById("elbowRate3").value);
    nutboltRate3 = parseFloat(document.getElementById("nutboltRate3").value);

    settingsPage.classList.add("hidden");

    // Inside saveSettingsBtn click event:
    const rates = {
        pipeRate2: parseFloat(document.getElementById("pipeRate").value),
        elbowRate: parseFloat(document.getElementById("elbowRate").value),
        transectionRate2: parseFloat(document.getElementById("transectionRate").value),
        equalTeeRate: parseFloat(document.getElementById("equalTeeRate").value),
        couplerRate2: parseFloat(document.getElementById("couplerRate").value),
        stubsRate: parseFloat(document.getElementById("stubsRate").value),
        flangeRate: parseFloat(document.getElementById("flangeRate").value),
        nutboltRate: parseFloat(document.getElementById("nutboltRate").value),
        pipeRate3: parseFloat(document.getElementById("pipeRate3").value),
        transectionRate3: parseFloat(document.getElementById("transectionRate3").value),
        couplerRate3: parseFloat(document.getElementById("couplerRate3").value),
        stubFlangeRate3: parseFloat(document.getElementById("stubFlangeRate3").value),
        elbowRate3: parseFloat(document.getElementById("elbowRate3").value),
        nutboltRate3: parseFloat(document.getElementById("nutboltRate3").value),
    };

    // Save to localStorage
    localStorage.setItem("pipeCalculatorRates", JSON.stringify(rates));

});

// Calculate Results
calculateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const is2Inch = pipeToggle.value === "2inch";
    let pipeQuantity, elbowQuantity, transectionQuantity, equalTeeQuantity, couplerQuantity, stubFlangeQuantity, rate, partyName;

    if (is2Inch) {
        pipeQuantity = parseInt(document.getElementById("pipeQuantity").value) || 0;
        elbowQuantity = parseInt(document.getElementById("elbowQuantity").value) || 0;
        transectionQuantity = parseInt(document.getElementById("transectionQuantity").value) || 0;
        equalTeeQuantity = parseInt(document.getElementById("equalTeeQuantity").value) || 0;
        couplerQuantity = parseInt(document.getElementById("couplerQuantity").value) || 0;
        stubFlangeQuantity = 0;
        rate = parseFloat(document.getElementById("rate").value) || 0;
        partyName = document.getElementById("partyName").value || "N/A";
    } else {
        pipeQuantity = parseInt(document.getElementById("pipeQuantity3").value) || 0;
        elbowQuantity = 0;
        transectionQuantity = parseInt(document.getElementById("transectionQuantity3").value) || 0;
        equalTeeQuantity = 0;
        couplerQuantity = parseInt(document.getElementById("couplerQuantity3").value) || 0;
        stubFlangeQuantity = parseInt(document.getElementById("stubFlangeQuantity3").value) || 0;
        rate = parseFloat(document.getElementById("rate3").value) || 0;
        partyName = document.getElementById("partyName3").value || "N/A";
    }

    const sellingPrice = pipeQuantity * rate;

    const totalCost = is2Inch
        ? pipeQuantity * pipeRate +
          elbowQuantity * elbowRate +
          transectionQuantity * transectionRate +
          equalTeeQuantity * equalTeeRate +
          couplerQuantity * couplerRate +
          transportationCost +
          labourCost
        : pipeQuantity * pipeRate3 +
          transectionQuantity * transectionRate3 +
          couplerQuantity * couplerRate3 +
          stubFlangeQuantity * stubFlangeRate3 +
          transportationCost +
          labourCost;

    const totalProfit = sellingPrice - totalCost;
    const profitRate = (totalCost * (1 + (30 / 100))) / pipeQuantity;

    // Update Results
    document.getElementById("sellingPrice").innerText = sellingPrice.toFixed(2);
    document.getElementById("totalCost").innerText = totalCost.toFixed(2);
    const profitPercentage = ((sellingPrice - totalCost) / totalCost) * 100;
    document.getElementById("totalProfit").innerText = `${totalProfit.toFixed(2)} (${profitPercentage.toFixed(2)}%)`;
    document.getElementById("profitRate").innerText = profitRate.toFixed(2);

    // Generate PDF
    downloadButton.addEventListener("click", () => {
        generatePDF(
            is2Inch,
            pipeQuantity,
            elbowQuantity,
            transectionQuantity,
            equalTeeQuantity,
            couplerQuantity,
            stubFlangeQuantity,
            rate,
            partyName,
            sellingPrice,
            totalCost,
            totalProfit,
            profitRate
        );
    });
});

backButton.addEventListener("click", () => {
    settingsPage.classList.add("hidden");
});

// Populate settings with default values
document.getElementById("pipeRate").value = pipeRate;
document.getElementById("elbowRate").value = elbowRate;
document.getElementById("transectionRate").value = transectionRate;
document.getElementById("equalTeeRate").value = equalTeeRate;
document.getElementById("couplerRate").value = couplerRate;
document.getElementById("pipeRate3").value = pipeRate3;
document.getElementById("transectionRate3").value = transectionRate3;
document.getElementById("couplerRate3").value = couplerRate3;
document.getElementById("stubFlangeRate3").value = stubFlangeRate3;
document.getElementById("transportationCost").value = transportationCost;
document.getElementById("labourCost").value = labourCost;

function generatePDF(
    is2Inch,
    pipeQuantity,
    elbowQuantity,
    transectionQuantity,
    equalTeeQuantity,
    couplerQuantity,
    stubFlangeQuantity,
    rate,
    partyName,
    sellingPrice,
    totalCost,
    totalProfit,
    profitRate
) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const today = new Date();
    const date = today.toLocaleDateString();

    doc.setFontSize(20);
    doc.text("Pipe Calculation Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 14, 30);
    doc.text(`Party Name: ${partyName}`, 14, 40);
    doc.text(`Pipe Type: ${is2Inch ? "2-inch" : "3-inch"}`, 14, 50);

    doc.setFontSize(16);
    doc.text("Input Values:", 14, 60);

    doc.setFontSize(12);
    let y = 70;
    const lineHeight = 10;

    doc.text(`Pipe Quantity: ${pipeQuantity} (Rate: ${is2Inch ? pipeRate : pipeRate3})`, 14, y);
    y += lineHeight;

    if (is2Inch) {
        doc.text(`90° Elbow Quantity: ${elbowQuantity} (Rate: ${elbowRate})`, 14, y);
        y += lineHeight;
        doc.text(`Equal Tee Quantity: ${equalTeeQuantity} (Rate: ${equalTeeRate})`, 14, y);
        y += lineHeight;
    } else {
        doc.text(`Stub Flange Quantity: ${stubFlangeQuantity} (Rate: ${stubFlangeRate3})`, 14, y);
        y += lineHeight;
    }

    doc.text(`Transection Fitting Quantity: ${transectionQuantity} (Rate: ${is2Inch ? transectionRate : transectionRate3})`, 14, y);
    y += lineHeight;
    doc.text(`Coupler/Socket Quantity: ${couplerQuantity} (Rate: ${is2Inch ? couplerRate : couplerRate3})`, 14, y);
    y += lineHeight;
    doc.text(`Transportation Cost: ${transportationCost}`, 14, y);
    y += lineHeight;
    doc.text(`Labour Cost: ${labourCost}`, 14, y);
    y += lineHeight + 5;

    doc.setFontSize(16);
    doc.text("Calculation Results:", 14, y);
    y += lineHeight;

    doc.setFontSize(12);
    doc.text(`Selling Price: ₹${sellingPrice.toFixed(2)}`, 14, y);
    y += lineHeight;
    doc.text(`Total Cost: ₹${totalCost.toFixed(2)}`, 14, y);
    y += lineHeight;
    doc.text(`Profit: ₹${totalProfit.toFixed(2)}`, 14, y);
    y += lineHeight;
    doc.text(`Rate for 30% Profit: ₹${profitRate.toFixed(2)}`, 14, y);

    // Save the PDF
    doc.save("pipe_calculation_report.pdf");

    

}
