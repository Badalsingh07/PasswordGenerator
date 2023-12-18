const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';  
  

let password="";
let checkCount=0;
let passwordLength =10;
handleSlider();
setIndicator("#ccc");


//handle slider 
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
    
};
//setindicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    console.log("color done")
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}
//get random number
function getRandom(min,max){
    return Math.floor( Math.random()*(max-min))+min;
}  
//get random numbers
function getRandNumber(){
    return getRandom(0,9);
}  
//get random Uppercase
function getRandUpperCase(){
    return String.fromCharCode(getRandom(97,123));
}  
//get random numbers
function getRandLowerCase(){
    return String.fromCharCode(getRandom(65,91));
}  
//get random numbers
function getRandsymbol(){
    const randNum = getRandom(0,symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength( ){
    let hasNum=false;
    let hasUpper=false;
    let hasLower=false;
    let hasSym=false;
    if(uppercaseCheck.checked)
    {
        hasUpper=true;
    }
    if(lowercaseCheck.checked)
    {
        hasLower=true;
    }
    if(numbersCheck.checked)
    {
        hasNum=true;
    }
    if(symbolsCheck.checked)
    {
        hasSym=true;
    } 
    if(  hasLower &&(hasNum || hasSym) && hasUpper && passwordLength>=8)
       setIndicator("#0f0")
       else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }

}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

 //inputslider
 inputSlider.addEventListener('input',(e)=>{
      passwordLength = e.target.value;
      handleSlider();
 })
 //copybutton
 copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
 })

 //function for checkbox count
 function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    })
    //special condition for checkbox
    if(passwordLength<checkCount){
        passwordLength=checkCount;
       handleSlider();}
 }
 allCheckBox.forEach((checkbox)=>{
    checkbox,addEventListener('change',handleCheckBoxChange);
 })
 //function for suffling password
 function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
 //generate button
 generateBtn.addEventListener('click',()=>{
    //if none checkbox check
    if(checkCount==0)
     return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        console.log("click hua")
       handleSlider();
      
    }
//start for new password 
console.log("Starting the Journey");

//first remove old password
     password="";
     //create function array
     let funcArr=[];
     if(uppercaseCheck.checked)
     funcArr.push(getRandUpperCase);

     if(lowercaseCheck.checked)
     funcArr.push(getRandLowerCase);

     if(numbersCheck.checked)
     funcArr.push(getRandNumber);

     if(symbolsCheck.checked)
     funcArr.push(getRandsymbol);
   
     for(let i=0; i<funcArr.length; i++){
        password+=funcArr[i]();
     
     }
     //for remaining 
     for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRandom(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
      //shuffle the password
     password = shufflePassword(Array.from(password)); 
//password display
passwordDisplay.value = password;
calcStrength();

 })
