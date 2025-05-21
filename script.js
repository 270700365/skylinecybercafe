let startTime;
let timerInterval;

function loginUser() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('session-section').style.display = 'block';

  startTime = Date.now();
  timerInterval = setInterval(() => {
    const duration = Math.floor((Date.now() - startTime) / 60000);
    document.getElementById('timer').innerText = duration;
  }, 60000);
}

function endSession() {
  clearInterval(timerInterval);
  const duration = Math.floor((Date.now() - startTime) / 60000);
  const printPages = parseInt(document.getElementById('printCount').value) || 0;
  const scanPages = parseInt(document.getElementById('scanCount').value) || 0;

  const printCost = printPages * 0.10;
  const scanCost = scanPages * 0.05;
  const totalBill = (printCost + scanCost).toFixed(2);

  document.getElementById('totalTime').innerText = duration;
  document.getElementById('printCost').innerText = printCost.toFixed(2);
  document.getElementById('scanCost').innerText = scanCost.toFixed(2);
  document.getElementById('totalBill').innerText = totalBill;

  document.getElementById('session-section').style.display = 'none';
  document.getElementById('bill-section').style.display = 'block';
}
