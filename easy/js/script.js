window.addEventListener('DOMContentLoaded', function() {

	let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent'),
		info = document.getElementsByClassName('info')[0];


	function hideTabContent(a) {
		for(let i = a; i < tabContent.length; i++){
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1)

	function showTabContent(b){
		if(tabContent[b].classList.contains('hide')){
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}
	showTabContent(0)

	info.addEventListener('click', function(event) {
		let target = event.target;
		if(target.className == 'info-header-tab') {
			for(let i = 0; i < tab.length; i++){
				if(target == tab[i] && i != 0){
					hideTabContent((i-1));
					hideTabContent(0);
					showTabContent(i);
					break;
				} else{
					hideTabContent(3);
					hideTabContent(2);
					hideTabContent(1);
					showTabContent(0);
				}
			}
		}
	});

//TIMER

	let deadLine = '2018-06-12';

	function getTimeRemaning(endTime) {
		let t = Date.parse(endTime) - Date.parse(new Date());
		let seconds = Math.floor((t/1000)%60),
			minutes = Math.floor((t/1000/60) % 60),
			hours = Math.floor( (t/(1000*60*60) % 60) ) ; 

			//условие
				if(t < 0){
					hours = 0,
					minutes  = 0,
					seconds =  0					
				}




			if(hours < 10){
				hours = '0' + hours;
			}
			if(minutes < 10){
				minutes = '0' + minutes;
			}
			if(seconds < 10){
				seconds = '0' + seconds;
			}
			return{
				'total': t,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			}
	}

	function setClock(id, endTime){

		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds');

			function updateClock() {
				let t = getTimeRemaning(endTime);

				hours.innerHTML = t.hours;
				minutes.innerHTML = t.minutes;
				seconds.innerHTML = t.seconds;
			}

			updateClock();
			let timeInterval = setInterval(updateClock, 1000);
	}

	setClock('timer', deadLine);


	//Modal
	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close  = document.querySelector('.popup-close'),
		descriptionTab = info.querySelectorAll('.info-tabcontent');

		for (let i = 0; i < 4; i++) {
			descriptionTab[i].addEventListener('click', function() {
				this.classList.add('more-splash');
				overlay.style.display = "block";
				document.body.style.overflow = 'hidden';
			});
		};

	console.log(descriptionTab);	
	more.addEventListener('click', function() {
		this.classList.add('more-splash');
		overlay.style.display = "block";
		document.body.style.overflow = 'hidden';
	});
	close.addEventListener('click', function(){
		overlay.style.display = "none";
		more.classList.remove("more-splash");
		document.body.style.overflow = '';
	})


	//form
	let message = new Object();
	message.success = 'Спасибо! Скоро мы с вами свяжемся';
	message.loading = 'Load...';
	message.failure = 'Что-то пошло не так...';

	let form = document.getElementsByClassName('main-form')[0],
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');
		statusMessage.classList.add('status');

		form.addEventListener('submit', function(event) {
			event.preventDefault();
			form.appendChild(statusMessage);

			//AJAX

			let request = new XMLHttpRequest();
			request.open("POST", 'server.php')

			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

			let formData = new FormData(form);

			request.send(formData);
			request.onreadystatechange = function() {
				if(request.readyState < 4){
					statusMessage.innerHTML = message.loading;
				} else if (request.readyState == 4){
					if(request.status == 200 && request.status < 300){
						statusMessage.innerHTML = message.success;
					}
					else{
						statusMessage.innerHTML = message.failure;
					}
				}
			}
			for(let i = 0; i < input.length; i++){
				input[i].value = ''
				// очищаем поля ввода
			}
		})


	let mailForm = document.getElementsByClassName('contact-form')[0],
		mail_Input = mailForm.getElementsByTagName('input')[0],
		phone_Input = mailForm.getElementsByTagName('input')[1],
		statusMailMessage = document.createElement('div');

		statusMailMessage.classList.add('status');


		mailForm.addEventListener('submit', function(event) {
			event.preventDefault();
			mailForm.appendChild(statusMailMessage);

			//AJAX

			let request = new XMLHttpRequest();
			request.open("POST", 'server.php')

			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

			let formData = new FormData(mailForm);

			request.send(formData);
			request.onreadystatechange = function() {
				if(request.readyState < 4){
					statusMailMessage.innerHTML = message.loading;
				} else if (request.readyState === 4){
					if(reques.status == 200 && request.status < 300){
						statusMailMessage.innerHTML = message.success;
					}
					else{
						statusMailMessage.innerHTML = message.failure;
					}
				}
			}
			for(let i = 0; i < input.length; i++){
				input[i].value = ''
				// очищаем поля ввода
			}
		})

		//slider

		let slideIndex = 1,
			slides = document.getElementsByClassName('slider-item'),
			prev = document.querySelector('.prev'),
			next = document.querySelector('.next'),
			dotsWrap = document.querySelector(".slider-dots"),
			dots = document.getElementsByClassName('dot');

			showSlides(slideIndex);

			function showSlides(n) {
				
				if (n > slides.length){
					slideIndex = 1;
				}
				if(n < 1){
					slideIndex = slides.length;
				}
				for(let i = 0; i < slides.length; i++){
					slides[i].style.display = "none";
				}
				for(let i = 0; i < dots.length; i++){
					dots[i].classList.remove('dot-active');
				}

				slides[slideIndex  - 1].style.display = 'block';
				dots[slideIndex - 1].classList.add('dot-active')
			}

			function plusSlides (n){
				showSlides(slideIndex += n)
			}
			function currentSlide(n){
				showSlides(slideIndex = n)
			}
			prev.addEventListener('click', function() {
				plusSlides(-1)
			})
			next.addEventListener('click', function() {
				plusSlides(+1)
			})

			dotsWrap.addEventListener('click', function(event) {
				for(let i = 0; i < dots.length + 1; i++){
					if(event.target.classList.contains('dot') && event.target == dots[i-1]){
						currentSlide(i)
					}
				}
			})

	//calc
	let people = document.getElementsByClassName('counter-block-input')[0],
		restDays = document.getElementsByClassName('counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daysSum = 0,
		total = 0;



		totalValue.innerHTML = 0;
		people.addEventListener('change', function() {
			if(restDays.value == ''){
				totalValue.innerHTML = 0;
			} else {				
				personsSum = Math.floor(+this.value);
				 	total = (daysSum + personsSum)*4000;
				 	totalValue.innerHTML = total;
				 }			
		})
		restDays.addEventListener('change', function() {
			if(people.value == ''){
				totalValue.innerHTML = 0;
			} else {				 
				daysSum = Math.floor(+this.value);
				 	total = (daysSum + personsSum)*4000;
				 	totalValue.innerHTML = total;
				 }
			
		})
		place.addEventListener('change', function(){
			if (restDays.value == '' || people.value == '') {
				totalValue.innerHTML = 0;
			}else {
				let a = total;
				totalValue.innerHTML = a * this.options[this.selectedIndex].value;
			}
		})

})	


class Options{
	constructor(height, width, bg, fontSize, textAlign){
		this.height = height;
		this.width = width;
		this.bg = bg;
		this.fontSize = fontSize;
		this.textAlign = textAlign;
	}
	creatDiv(text){
		let div = document.createElement('div');
		div.textContent = text;

		div.style.cssText = `height: ${this.height};
							width: ${this.width};
							background-color: ${this.bg};
							font-size: ${this.fontSize};
							text-align: ${this.textAlign};`

		document.body.appendChild(div)
	}
}

let obj = new Options('200px','300px','black','20px','center');
obj.creatDiv('Hello')