function calculate() {
    //Getting the inputs
    var pipe_quantity = parseInt(document.getElementById("num1").value);
    var elbow = parseInt(document.getElementById("num2").value);
    var transection = parseInt(document.getElementById("num3").value);
    var equaltee = parseInt(document.getElementById("num4").value);
    var coupler = parseInt(document.getElementById("num5").value);
    var rate = parseInt(document.getElementById("num6").value);

    //convert nan to 0
    pipe_quantity = pipe_quantity || 0;
    elbow = elbow || 0;
    transection = transection || 0;
    equaltee = equaltee || 0;
    coupler = coupler || 0;
    rate = rate || 0;
    
    //rates
    var pipe_rate = 990
    var elbow_rate = 916
    var transection_rate = 3108
    var equaltee_rate = 900
    var coupler_rate = 600

    var transportation_cost = 3500
    var labour_cost = 1000


    //calculation
    var selling_price = (pipe_quantity*rate);
    var total_cost = (pipe_quantity*pipe_rate) + (elbow*elbow_rate) + (transection*transection_rate) + (equaltee*equaltee_rate) + (coupler*coupler_rate) + transportation_cost + labour_cost;


    var total_profit = selling_price-total_cost;
    var profit_percent = (total_profit*100)/total_cost;
    profit_percent = profit_percent.toFixed(2);

    var price_for30 = total_cost*1.3;
    var rate_for30 = price_for30/pipe_quantity;
    rate_for30 = rate_for30.toFixed(2);




    document.getElementById("output1").innerHTML = "Total Selling Price at Rate: ₹" + selling_price;
    document.getElementById("output2").innerHTML = "Total Cost of Pipes: ₹" + total_cost;
    document.getElementById("output3").innerHTML = "Total Profit: ₹" + total_profit + " (" + profit_percent +"% Profit)";
    document.getElementById("output4").innerHTML = "Rate for 30% Profit: ₹" + rate_for30;






    


}