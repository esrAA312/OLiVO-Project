let navbar = document.querySelector('.header .flex .navbar');

document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.toggle('active');
}

let account = document.querySelector('.user-cal');

document.querySelector('#usercal-btn').onclick = () =>{
   account.classList.add('active');
}

document.querySelector('#close-cal').onclick = () =>{
   account.classList.remove('active');
}
 
let myOrders = document.querySelector('.DOC');

document.querySelector('#doc-btn').onclick = () =>{
   myOrders.classList.add('active');
}

document.querySelector('#close-doc').onclick = () =>{
   myOrders.classList.remove('active');
}

window.onscroll = () =>{
   navbar.classList.remove('active');

};
function calculate() {
   const gender = document.getElementById('gender').value;
   const age = parseFloat(document.getElementById('age').value);
   const weight = parseFloat(document.getElementById('weight').value);
   const height = parseFloat(document.getElementById('height').value);

   if (isNaN(age) || isNaN(weight) || isNaN(height)) {
       alert('Please enter valid numbers for age, weight, and height.');
       return;
   }

   // Calculate BMI
   const heightInMeters = height / 100;
   const bmi = weight / (heightInMeters ** 2);

   // Calculate ideal weight
   const minIdealWeight = 20 * (heightInMeters ** 2);
   const maxIdealWeight = 23 * (heightInMeters ** 2);

   // Calculate daily calorie needs using Harris-Benedict equation
   let bmr;
   if (gender === 'male') {
       bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
   } else {
       bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
   }

   // Assuming a sedentary lifestyle for simplicity (BMR * 1.2)
   const dailyCalories = bmr * 1.2;

   const resultDiv = document.getElementById('result');
   resultDiv.innerHTML = `
       <p>Your BMI is: ${bmi.toFixed(2)}</p>
       <p>Your ideal weight range is between ${minIdealWeight.toFixed(2)} kg and ${maxIdealWeight.toFixed(2)} kg.</p>
       <p>Your daily calorie needs are approximately ${dailyCalories.toFixed(0)} calories.</p>
   `;
}
