const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const basic url =  "https://v6.exchangerate-api.com/v6/4a05e4808b13da7d640b715a/latest/USD"

let dropdowns = document.querySelectorAll(".dropdown select")
let selects = document.querySelectorAll(".select")
let chngeBtn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")


for(let select of dropdowns){
    for (let currCode in countryList){
        let newOpt = document.createElement("option")
        // console.log(code,countryList[code]);
        newOpt.innerText = currCode
        newOpt.value = currCode
        if(select.name === "from" && currCode === "USD"){
           newOpt.selected = "selected"
        }
        else if(select.name === "to" && currCode === "PKR"){
            newOpt.selected = "selected"
         }
        select.append(newOpt)
    }
    select.addEventListener("change",(evt)=>{
          updtFlag(evt.target)
    })
}

const updtFlag =  (ele) =>{
  let currCode = ele.value
  console.log(currCode);
  let countryCode = countryList[currCode]
  console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img= ele.parentElement.querySelector("img")
  img.src = newSrc
}

chngeBtn.addEventListener("click", async (evt)=>{
    evt.preventDefault()
    let amountVal = document.querySelector(".amount input")
    let amount = amountVal.value
    console.log(amount);
    if(amount === "" || amount < 1){
        amount = 1
        amountVal.value = "1"
    }
    
    console.log(fromCurr.value,toCurr.value);
    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(url)
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    console.log(rate);
    let finalAmount = amount * rate 

    msg.innerText = `${amount} ${fromCurr} = ${finalAmount}${toCurr}`
})