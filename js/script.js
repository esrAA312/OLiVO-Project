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
