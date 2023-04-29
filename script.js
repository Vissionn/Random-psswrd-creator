const inputslider = document.querySelector("[data-lengthslider]");

const inputnumberdisplay = document.querySelector("[data-lengthNumber]");

const copymsg = document.querySelector("[data-copyMsg]"); 

const dataindicator = document.querySelector("[data-indicator]");

const copybtn = document.querySelector("[data-copy]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const uppercasecheck = document.querySelector("#uppercase");

const lowercasecheck = document.querySelector("#lowercase");

const numbercheck = document.querySelector("#numbers");

const symbolcheck = document.querySelector("#symbols");

const generateBtn = document.querySelector(".generateButton");

const allcheckbox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={}[]\|:;"<>,.?/';


 let password = "";
 let passwordlenght = 10;
 let checkbox = 0;
 
handleslider();
setindicator("#ccc");

 function handleslider() {
   inputslider.value = passwordlenght;
   inputnumberdisplay.innerText = passwordlenght;
   // slider wale drag k liye
   const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ( (passwordlenght - min)*100/(max - min)) + "% 100%"
 }

 function setindicator(color) {
  dataindicator.style.backgroundColor = color;
  dataindicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
 }

 // for providing min max value range
 function getrandomInteger(min , max) {
  return Math.floor(Math.random() * (max-min) + min);
 }
 
 function generateRandomNumber() {
return getrandomInteger(0,9);
 }

 function generateLowercase() {
  return String.fromCharCode (getrandomInteger(97,123));
 }
 
 function generateUppercase() {
  return String.fromCharCode(getrandomInteger(65,91));
 }

 function generateSymbol() {
  const randNum = getrandomInteger(0 , symbols.length);

  return symbols.charAt(randNum);
 }

 function calcStrength()
  {

  let hasupper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSymbol = false;

  if(uppercasecheck.checked) 
  hasupper = true;

  if(lowercasecheck.checked)
  hasLower = true;

  if(numbercheck.checked)
  hasNum = true;

  if(symbolcheck.checked)
  hasSymbol = true;

  if(hasupper && hasLower && (hasNum || hasSymbol) && passwordlenght >=8)
  {
    setindicator("#0f0");
  }
  
  else if( (hasLower || hasupper) && (hasNum || hasSymbol) && passwordlenght >=6)
  {
    setindicator("#ff0");
  }

  else {
    setindicator("#f00");
  }

 }


 async function copyContent() {
  try {
    await  navigator.clipboard.writeText(passwordDisplay.value);
    copymsg.innerText = "copied";
  }
  
  catch(e) {
    copymsg.innerText = "failed";
  }

  copymsg.classList.add("active");

  setTimeout( () => {
    copymsg.classList.remove("active")
  }, 2000);
 }

 function shufflePassword(array)
  // Fisher Yates Method
  {
    for (let i =array.lenght - 1; i>0; i--) 
    {
      const j = Math.floor(Math.random() * (i+1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }

 function handleCheckBoxChange()
 {
  checkcount = 0;
  allcheckbox.forEach( (checkbox) =>{
    if(checkbox.checked)
    checkcount++;
  });

  // special condition
  if(passwordlenght < checkcount)
  {
    passwordlenght = checkcount
    handleslider();
  }

 }

 allcheckbox.forEach( (checkbox) => {
  checkbox.addEventListener('change' , handleCheckBoxChange);
 })

 inputslider.addEventListener('input', (e) => {
  passwordlenght = e.target.value;
  handleslider();
 })

 copybtn.addEventListener('click' , () => {
  if(passwordDisplay.value)
  {
    copyContent();
  }
 })
 

 

// .........GENERATE PASSWORD...............

 generateBtn.addEventListener('click' , () => {

  if(checkcount == 0) 
  {
    return;
  }

  if(passwordlenght < checkcount)
  {
    passwordlenght = checkcount;
    handleslider();
  }

  // let start to find new password

  //remove old psswrd
  password = "";

  // let put the stuff mentioned by checkbox

  // if(uppercasecheck.checked)
  // {
  //   password += generateUppercase();
  // }

  // if(lowercasecheck.checked)
  // {
  //   password += generateLowercase;
  // }

  // if(numbercheck.checked)
  // {
  //   password += generateRandomNumber();
  // }

  // if(symbolcheck.checked)
  // {
  //   password += generateSymbol();
  // }

  let funcArr = [];

  if(uppercasecheck.checked)
  {
    funcArr.push(generateUppercase);
  }

  if(lowercasecheck.checked)
  {
    funcArr.push(generateLowercase);
  }

  if(numbercheck.checked)
  {
    funcArr.push(generateRandomNumber);
  }

  if(symbolcheck.checked)
  {
    funcArr.push(generateSymbol);
  }

  //compulsory addition
  for(let i=0; i<funcArr.length; i++)
  {
    password += funcArr[i]();
  }
  console.log("compulosry addition is done");

  // remaining addition

  for(i=0 ; i<passwordlenght - funcArr.length ; i++)
  {
    let randIndex = getrandomInteger(0 , funcArr.length);
    password += funcArr[randIndex]();
  }
  console.log("reamining addition is done");



  // shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("shufflinng is done");

  // show in UI
  passwordDisplay.value = password;
  console.log("UI addition is done");

  // call calc strength
  calcStrength();

 });







