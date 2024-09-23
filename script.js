
function donate() {
    let myBalance = parseFloat(document.getElementById("myBalance").innerText);
    let donations = [];
    for (let i= 1;i <=3; i++) {
        let donation = parseFloat(document.getElementById(`charity${i}`).value) || 0;
        donations.push(donation);
    }

    let totalDonation =  donations.reduce((sum, donation) =>sum + donation, 0);
    if (totalDonation> myBalance) {
        alert("Sorry, you don't have enough balance to donate this amount.");
        return;
    }

    let newBalance =myBalance - totalDonation;
    document.getElementById("myBalance").innerText =  newBalance;

    for (let i = 1;i <= 3;i++) {
        let charityBalance = parseFloat(document.getElementById(`charity${i}Balance`).innerText);
        document.getElementById(`charity${i}Balance`).innerText =  charityBalance + donations[i - 1];
        document.getElementById(`charity${i}`).value= '';
    }

    document.getElementById("thankYouModal").classList.remove("hidden");
    createHistoryCard(donations);
}


document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("thankYouModal").classList.add("hidden");
});



function showDonations() {
    document.getElementById("donationSection").style.display = "block";
    document.getElementById("historySection").style.display = "none";


    document.getElementById("donationButton").classList.add("bg-btnColor");
    document.getElementById("donationButton").classList.remove("text-black");
    document.getElementById("historyButton").classList.add("text-customGray");
    document.getElementById("historyButton").classList.remove("bg-btnColor");
}



function showHistory() {
    document.getElementById("donationSection").style.display = "none";
    document.getElementById("historySection").style.display = "block";

    document.getElementById("historyButton").classList.add("bg-btnColor");
    document.getElementById("historyButton").classList.remove("text-customGray");
    document.getElementById("donationButton").classList.add("text-black");
    document.getElementById("donationButton").classList.remove("bg-btnColor");
    document.getElementById("donationButton").classList.add("bg-bCustomGray");
}



function createHistoryCard(donations) {
    let historySection = document.getElementById("historyList");
    let historyCard = document.createElement("li");
    historyCard.classList.add("mb-4", "p-4", "border", "rounded-lg", "bg-white", "shadow-md");
    let donationTime = new Date().toLocaleString();
    let historyText = "";

    const charityDescriptions = [
        "Taka donated for flood relief in Noakhali.", "Taka donated for food relief in Feni.", "Taka donated for injured in the quota movement."
    ];

    donations.forEach((donation, index) => {
        if (donation > 0) {
            historyText+= `${donation} ${charityDescriptions[index]}<br>`;
        }
    });

    historyText +=`<small class="text-customGray">Donated on: ${donationTime}</small>`;
    historyCard.innerHTML = historyText;
    historySection.insertBefore(historyCard, historySection.firstChild);
}



document.addEventListener("DOMContentLoaded", showDonations);


