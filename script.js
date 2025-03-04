// Default Rates
let pipeRate = 990;
let elbowRate = 916;
let transectionRate = 3108;
let equalTeeRate = 900;
let couplerRate = 600;
let transportationCost = 3500;
let labourCost = 1000;

// DOM Elements
const settingsPage = document.getElementById("settings-page");
const settingsBtn = document.getElementById("settings-btn");
const saveSettingsBtn = document.getElementById("save-settings-btn");
const calculateBtn = document.getElementById("calculate-btn");
const backButton = document.getElementById("back-button");
const downloadButton = document.querySelector(".download-button"); // Added download button

// Toggle Settings Page
settingsBtn.addEventListener("click", () => {
    settingsPage.classList.toggle("hidden");
});

// Save Settings
saveSettingsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    pipeRate = parseFloat(document.getElementById("pipeRate").value);
    elbowRate = parseFloat(document.getElementById("elbowRate").value);
    transectionRate = parseFloat(document.getElementById("transectionRate").value);
    equalTeeRate = parseFloat(document.getElementById("equalTeeRate").value);
    couplerRate = parseFloat(document.getElementById("couplerRate").value);
    transportationCost = parseFloat(document.getElementById("transportationCost").value);
    labourCost = parseFloat(document.getElementById("labourCost").value);
    settingsPage.classList.add("hidden");
});

// Calculate Results
calculateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const pipeQuantity = parseInt(document.getElementById("pipeQuantity").value) || 0;
    const elbowQuantity = parseInt(document.getElementById("elbowQuantity").value) || 0;
    const transectionQuantity = parseInt(document.getElementById("transectionQuantity").value) || 0;
    const equalTeeQuantity = parseInt(document.getElementById("equalTeeQuantity").value) || 0;
    const couplerQuantity = parseInt(document.getElementById("couplerQuantity").value) || 0;
    const rate = parseFloat(document.getElementById("rate").value) || 0;
    const partyName = document.getElementById("partyName").value || "N/A";

    const sellingPrice = pipeQuantity * rate;

    const totalCost =
        pipeQuantity * pipeRate +
        elbowQuantity * elbowRate +
        transectionQuantity * transectionRate +
        equalTeeQuantity * equalTeeRate +
        couplerQuantity * couplerRate +
        transportationCost +
        labourCost;

    const totalProfit = sellingPrice - totalCost;

    const profitRate = (totalCost * (1 + (30 / 100)))/pipeQuantity;

    // Update Results
    document.getElementById("sellingPrice").innerText = sellingPrice.toFixed(2);
    document.getElementById("totalCost").innerText = totalCost.toFixed(2);

    const profitPercentage = ((sellingPrice - totalCost) / totalCost) * 100;
    document.getElementById("totalProfit").innerText = `${totalProfit.toFixed(2)} (${profitPercentage.toFixed(2)}%)`;

    document.getElementById("profitRate").innerText = profitRate.toFixed(2);

    // Generate PDF
    downloadButton.addEventListener("click", () => {
        generatePDF(
            pipeQuantity,
            elbowQuantity,
            transectionQuantity,
            equalTeeQuantity,
            couplerQuantity,
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
document.getElementById("transportationCost").value = transportationCost;
document.getElementById("labourCost").value = labourCost;

function generatePDF(
    pipeQuantity,
    elbowQuantity,
    transectionQuantity,
    equalTeeQuantity,
    couplerQuantity,
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

    doc.setFontSize(16);
    doc.text("Input Values:", 14, 50);

    doc.setFontSize(12);
    let y = 60; // Starting Y position
    const lineHeight = 10;

    doc.text(`Pipe Quantity: ${pipeQuantity} (Rate: ${pipeRate})`, 14, y);
    y += lineHeight;
    doc.text(`90° Elbow Quantity: ${elbowQuantity} (Rate: ${elbowRate})`, 14, y);
    y += lineHeight;
    doc.text(`Transection Fitting Quantity: ${transectionQuantity} (Rate: ${transectionRate})`, 14, y);
    y += lineHeight;
    doc.text(`Equal Tee Quantity: ${equalTeeQuantity} (Rate: ${equalTeeRate})`, 14, y);
    y += lineHeight;
    doc.text(`Coupler/Socket Quantity: ${couplerQuantity} (Rate: ${couplerRate})`, 14, y);
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
