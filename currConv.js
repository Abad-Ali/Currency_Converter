const Base_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    };

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });

};

const updateFlag=(element)=>{

    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;

};

btn.addEventListener("click", async(evt)=>{

    evt.preventDefault();
    updateExchangeRate();

});

const empty =()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal===""){
        msg.innerHTML="<div> Enter the amount first...</div>";
    }
}

const updateExchangeRate = async ()=>{

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    
    if(amtVal ==="" || amtVal < 1){
        amtVal = 1;

        setTimeout(() => {
           amount.value = "1";
        }, 300); 
        
    }
    empty();

    // console.log(fromCurr.value,toCurr.value);
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;  //  new URL
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);


    let fromCurrency = fromCurr.value.toLowerCase();
    let toCurrency = toCurr.value.toLowerCase(); // Assuming you have toCurr element

    if (data[fromCurrency] && data[fromCurrency][toCurrency]) {
        rate = data[fromCurrency][toCurrency]
        // console.log(data[fromCurrency][toCurrency]);
    } else {
        // console.error("Currency data not found in the response");
    }
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};

window.addEventListener("load",()=>{
    updateExchangeRate();
});
