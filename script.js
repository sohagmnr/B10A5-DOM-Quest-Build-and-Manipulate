
function donate() {
    let myBalance = parseFloat(document.getElementById("myBalance").innerText); // grab my balance and convert it to a number.

    let donations = [ ]; // to store donated amount to each charity


    //looks at the donation input if it's empty set the input to 0 and add the donation in the donations array
    for (let i= 1;i <=3; i++) {
        let donation = parseFloat(document.getElementById(`charity${i}`).value) || 0;
        donations.push(donation);
    }
    //add all donation from donations array 
    let totalDonation = 0;
    for(let i = 0 ; i<donations.length; i++){
        totalDonation += donations[i];
    }

    //check if total donation is higher than my balance. if it is then show alert message
    if (totalDonation> myBalance) {         
        alert("Sorry, you don't have enough balance");
        return;
    }

    let newBalance =myBalance - totalDonation; //minus the donated amount from my balance

    document.getElementById("myBalance").innerText =  newBalance; //update the new balance


    // it will go through each charity and update their balance
    for (let i = 1;i <= 3;i++) {
        let charityBalance = parseFloat(document.getElementById(`charity${i}Balance`).innerText); // grab current balance of each charity

        document.getElementById(`charity${i}Balance`).innerText =  charityBalance + donations[i - 1];  //add the donation with current balance

        document.getElementById(`charity${i}`).value= ''; //clear the input field 

    }

    document.getElementById("congoModal").classList.remove("hidden");  //this will remove the  hidden class and show the congo modal

    createHistoryCard(donations); //record this donation in history section

}

//added event listener in close button so when it's get clickd it's hide the modal
document.getElementById("closeModal").addEventListener("click",  function() {
    document.getElementById("congoModal").classList.add("hidden");
});



// this function hide the history section after clicking the donation button

function viewDono() {
    document.getElementById("dntSec").style.display = "block";
    document.getElementById("historySection").style.display = "none";


    document.getElementById("dntBtn").classList.add("bg-btnColor");
    document.getElementById("historyBtn").classList.add("text-customGray");
    document.getElementById("historyBtn").classList.remove("bg-btnColor");
}

// this function will hide the donation section and show the history section

function viewHistory() {
    document.getElementById("dntSec").style.display = "none";
    document.getElementById("historySection").style.display = "block";

    document.getElementById("historyBtn").classList.add("bg-btnColor");
    document.getElementById("historyBtn").classList.remove("text-customGray");
    document.getElementById("historyBtn").classList.add("text-black");
    document.getElementById("dntBtn").classList.remove("bg-btnColor");
    document.getElementById("dntBtn").classList.add("bg-bCustomGray");
}



//  this function will create history card

function createHistoryCard(donations) {
    let historySection = document.getElementById("historyList"); 

    let historyCard = document.createElement("li"); 

    historyCard.classList.add("mb-4", "p-4", "border", "list-none",  "rounded-lg", "bg-white", "shadow-md"); //added style to the card

    let donationTime = new Date().toLocaleString(); //donation date and time

    let historyText = ""; //to store the card content

    const charityDescriptions = [
        "Taka donated for flood relief in Noakhali.", "Taka donated for food relief in Feni.", "Taka donated for injured in the quota movement."
    ];

    //history card title
    donations.forEach((donation, index) => {
        if (donation > 0) {
            historyText+= `${donation} ${charityDescriptions[index]}<br>`;
        }
    });

    historyText +=`<small class="text-customGray">Donated on: ${donationTime}</small>`; //add the time to the history textt

    historyCard.innerHTML = historyText; //added the content in the history card

    historySection.insertBefore(historyCard, historySection.firstChild); //history card will be inserted top of the history list
}

// this function show the donation page every time page reload

document.addEventListener("DOMContentLoaded", viewDono);


