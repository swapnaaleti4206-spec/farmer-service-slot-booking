let generatedOTP;
let registrationNo;
let farmerData = {};
let slotData = {};

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxyN5nBpyTCQ28xVRzjBJqj-syneaYVl6YkmolRqOT9ztRqlLTdVVWM-d5SnCIHiR5KCQ/exec";

function sendOTP() {
  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  alert("OTP: " + generatedOTP);
  otpBox.style.display = "block";
}

function verifyOTP() {
  if (otpInput.value == generatedOTP) {
    loginPage.style.display = "none";
    dashboard.style.display = "block";
  } else {
    alert("Invalid OTP");
  }
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function submitRegistration() {
  registrationNo = "REG" + Math.floor(10000 + Math.random() * 90000);

  farmerData = {
    name: farmerName.value,
    address: address.value,
    land: landDetails.value
  };

  regResult.innerHTML = "Registration Number: " + registrationNo;
}

// 🔹 Google Sheet ki data pampadaniki function
function sendToSheet(data) {
  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(msg => console.log("Saved to Sheet:", msg))
  .catch(err => console.log("Error:", err));
}

function bookslot() {

  if (regNoInput.value != registrationNo) {
    alert("Enter Correct Registration Number");
    return;
  }

  slotData = {
    regno: regNoInput.value,
    name: bookingName.value,
    district: district.value,
    market: market.value,
    date: slotDate.value,
    time: slotTime.value,
    status: "Booked"
  };

  // 🔹 Slot details display
  slotDetails.innerHTML =
    "Registration No: " + slotData.regno +
    "<br>Name: " + slotData.name +
    "<br>District: " + slotData.district +
    "<br>Market: " + slotData.market +
    "<br>Date: " + slotData.date +
    "<br>Time: " + slotData.time +
    "<br>Status: Booked";

  // 🔹 Google Sheet lo save
  sendToSheet(slotData);

  alert("Slot Booked Successfully & Saved to Database");
}

function cancelSlot() {
  slotDetails.innerHTML = "Slot Cancelled";
}