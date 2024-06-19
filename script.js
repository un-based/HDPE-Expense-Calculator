function calculate() {
    // Getting the inputs
    const pipeQuantity = parseInt(document.getElementById("num1").value) || 0;
    const elbowQuantity = parseInt(document.getElementById("num2").value) || 0;
    const transectionQuantity = parseInt(document.getElementById("num3").value) || 0;
    const equalTeeQuantity = parseInt(document.getElementById("num4").value) || 0;
    const couplerQuantity = parseInt(document.getElementById("num5").value) || 0;
    const rate = parseInt(document.getElementById("num6").value) || 0;

    // Rates
    const pipeRate = 990;
    const elbowRate = 916;
    const transectionRate = 3108;
    const equalTeeRate = 900;
    const couplerRate = 600;
    const transportationCost = 3500;
    const labourCost = 1000;

    // Calculation
    const sellingPrice = pipeQuantity * rate;
    const totalCost = (pipeQuantity * pipeRate) + (elbowQuantity * elbowRate) + (transectionQuantity * transectionRate) + 
                      (equalTeeQuantity * equalTeeRate) + (couplerQuantity * couplerRate) + transportationCost + labourCost;

    const totalProfit = sellingPrice - totalCost;
    const profitPercent = ((totalProfit * 100) / totalCost).toFixed(2);

    const priceFor30 = totalCost * 1.3;
    const rateFor30 = (priceFor30 / pipeQuantity).toFixed(2);

    // Output
    document.getElementById("output1").innerHTML = `Total Selling Price at Rate: ₹${sellingPrice}`;
    document.getElementById("output2").innerHTML = `Total Cost of Pipes: ₹${totalCost}`;
    document.getElementById("output3").innerHTML = `Total Profit: ₹${totalProfit} (${profitPercent}% Profit)`;
    document.getElementById("output4").innerHTML = `Rate for 30% Profit: ₹${rateFor30}`;
}
