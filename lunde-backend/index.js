const http = require("http");
const cors = require('cors')
const express = require("express");

const getTotalAmount = (duration, amount, interest) => {
  const durationInDays = duration * 30;
  const totalInterestAmount =
    (amount * interest * durationInDays) / 360;
  return Math.round(amount + totalInterestAmount);
}

const app = express();
app.use(cors())
app.get("/interest-rate", function (req, res) {
  const loanDuration = parseInt(req.query.duration);
  const loanAmount = parseInt(req.query.amount)

  const interestRate = loanDuration < 60 ? 0.047 : 0.037
  const totalAmount = getTotalAmount(loanDuration, loanAmount, interestRate)
  const monthlyPayment = Math.round((totalAmount / loanDuration) * 100) / 100

  res.status(200);
  res.send(JSON.stringify({
    monthly_payment: monthlyPayment,
    interest_rate: interestRate,
    total_amount: totalAmount
  }));
});

app.listen(5000);
console.log('listening on port 5000')
return app;
