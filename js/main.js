var types = ['income','expenses'];
var income_category = ['inc_cat1', 'inc_cat2', 'inc_cat3'];
var expense_category = ['exp_cat1', 'exp_cat2', 'exp_cat3'];

var income_btn = $('#income-btn');
income_btn.click(function() {
	if ($('.sum-income-section').hasClass('display-none'))
	{
		$('.sum-income-section').removeClass('display-none');
		$('.sum-expenses-section').addClass('display-none');
		$('.sum-balance-section').addClass('display-none');
	} else	{}
});

var expenses_btn = $('#expenses-btn');
expenses_btn.click(function() {
	if ($('.sum-expenses-section').hasClass('display-none'))
	{
		$('.sum-expenses-section').removeClass('display-none');
		$('.sum-income-section').addClass('display-none');
		$('.sum-balance-section').addClass('display-none');
	} else	{}
});

var balance_btn = $('#balance-btn');
balance_btn.click(function() {
	if ($('.sum-balance-section').hasClass('display-none'))
	{
		$('.sum-balance-section').removeClass('display-none');
		$('.sum-income-section').addClass('display-none');
		$('.sum-expenses-section').addClass('display-none');
	} else	{}
});

var income_btn_complete = $('#income-btn-complete');
income_btn_complete.click(function() {
	if ($('.comp-income-section').hasClass('display-none'))
	{
		$('.comp-income-section').removeClass('display-none');
		$('.comp-expenses-section').addClass('display-none');
		$('.comp-balance-section').addClass('display-none');
	} else	{}
});

var expenses_btn_complete = $('#expenses-btn-complete');
expenses_btn_complete.click(function() {
	if ($('.comp-expenses-section').hasClass('display-none'))
	{
		$('.comp-expenses-section').removeClass('display-none');
		$('.comp-income-section').addClass('display-none');
		$('.comp-balance-section').addClass('display-none');
	} else	{}
});

var balance_btn_complete = $('#balance-btn-complete');
balance_btn_complete.click(function() {
	if ($('.comp-balance-section').hasClass('display-none'))
	{
		$('.comp-balance-section').removeClass('display-none');
		$('.comp-income-section').addClass('display-none');
		$('.comp-expenses-section').addClass('display-none');
	} else	{}
});



var close_complete = $('.close-data-complete i');
close_complete.click(function() {
	close_second_parent.call(this);
})

// var open_complete = $('#expand-icon');
// open_complete.click(function() {
// 	$('section#data-complete').css('display','block');
// })

function close_second_parent() {
	var parent = $(this).parent().parent();
	parent.css("display", "none");
}

function close_first_parent() {
	var parent = $(this).parent();
	parent.css("display", "none");
}

// var data = data_object();

var data = {};

if (isEmpty(localStorage.getItem('expensesapp'))) {
	data_object();
} else {
	data = JSON.parse(localStorage.getItem('expensesapp'));
}

$(document).ready(function () {
	show_income();
	show_expenses();
	show_balance();
	today_transaction();
});




// This is to verify if the data object is empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// if (isEmpty(data)) {
// 	data_object();
// }


// This creates the object where the data is going to be strored
function data_object() {
for (var i = 2015; i < 2025; i++) {
    data[i] = {};
    for (var j = 0; j < 12; j++) {
        data[i][j] = {};
        for (var o = 1; o < 32; o++) {
	        data[i][j][o] = {};
        	data[i][j][o][types[0]] = {};
        	data[i][j][o][types[1]] = {};

	        income_category.forEach(function (element) {
	        	data[i][j][o][types[0]][element] = []
	        })

	        expense_category.forEach(function (element) {
	        	data[i][j][o][types[1]][element] = []
	        })
	    }
	}
}	
 // return data
}


function dataObjectUpdate() {
	localStorage.setItem('expensesapp', JSON.stringify(data));
}

$('#save_data').click(function() {
	var value = document.getElementById("import").value;
	
	var type_form = document.getElementsByName('type');
	var exp_category = document.getElementsByName('exp_category');
	var inc_category = document.getElementsByName('inc_category');
	var exp_cat_checked = '';
	var inc_cat_checked = '';
	var type_checked = '';

	for (var i = 0, length = exp_category.length; i < length; i++) {
	    if (exp_category[i].checked) {
	        // do whatever you want with the checked radio
	        exp_cat_checked = exp_category[i].value;

	        // only one radio can be logically checked, don't check the rest
	        break;
	    }
	}

	for (var i = 0, length = inc_category.length; i < length; i++) {
	    if (inc_category[i].checked) {
	        // do whatever you want with the checked radio
	        inc_cat_checked = inc_category[i].value;

	        // only one radio can be logically checked, don't check the rest
	        break;
	    }
	}

	for (var i = 0, length = type_form.length; i < length; i++) {
	    if (type_form[i].checked) {
	        // do whatever you want with the checked radio
	        type_checked = type_form[i].value;

	        // only one radio can be logically checked, don't check the rest
	        break;
	    }
	}

	var category = (type_checked === 'income')?inc_cat_checked:exp_cat_checked;

	if (value) {

		// var currentMonth = 0;
		// var currentYear = 2016;
		// addItemTodo(value);
		// document.getElementById('item').value = '';

		data[currentYear][currentMonth][day][type_checked][category].push(value);
		dataObjectUpdate();

	}


console.log('added');

show_income();
show_expenses();
show_balance();
today_transaction();
transaction_day(day);
$('#input_data').css('display','none');
});

function query_cat_month(type) {

var monthly_categories = [];
var month_analyse = Object.keys(data[currentYear][currentMonth]);
var type_selected = (type === 'income')?income_category:expense_category;
type_selected.forEach(function (element1) {
	var monthly_cat = [];
	month_analyse.forEach(function (element) {
		// currentMonth = 0;
		// currentYear = 2016;
		var previus = data[currentYear][currentMonth][element][type][element1];
		monthly_cat = monthly_cat.concat(previus);

	} );
	var cat_sum = suma_lista(monthly_cat);
	monthly_categories.push([element1,cat_sum]);
});
	
 return monthly_categories;
};


function suma_lista(lista) {
var sum = 0;
for (var i in lista) {
    sum = sum + Number(lista[i]);
	
}
return sum;
}

$(document).ready(function () {
	var type_form = $( "input[name='type']");
	type_form.click(function() {
		if (type_form[0].checked) {
		$(".income_categories").css('display','block');
		$(".expenses_categories").css('display','none');

	} 
	if (type_form[1].checked) {
		$(".income_categories").css('display','none');
		$(".expenses_categories").css('display','block');

	}
	})
	
});


// Icons and their colors
icon_color = {
	inc_category1: ['#000','<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 224 224" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg>'],
	inc_category2: ['#000','<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 224 224" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg>'],
	inc_category3: ['#000','<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 224 224" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg>'],
	exp_category1: ['#000','<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 224 224" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg>'],
	exp_category2: ['#000','<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 224 224" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg>'],
	exp_category3: ['#000','<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 224 224" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg>'],
	}


function show_income() {
	var datos = query_cat_month('income');
	var total = [];

	var inc_sum_sec1 = $('.summary-section .sum-income-section .sum-sec1 .detail-box');
	var inc_sum_sec2 = $('.summary-section .sum-income-section .sum-sec2 .detail-box');
	
	inc_sum_sec1.empty();
	inc_sum_sec2.empty();

	datos.forEach(function(element) {
		total.push(element[1]);
	});
	var total_sum = suma_lista(total); 



	datos.forEach(function(element) {
		var cat_name = element[0];
		var number = element[1];
		if (number) {
			// Left side of the summary section
			var cat_box1 = $('<div class="cat-box"><p>'+cat_name+'</p><div class="cat-inco-container"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 224 224" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg></div></div>');
			inc_sum_sec1.append(cat_box1);

			// Right side of the summary section
			var cat_box2 = $('<div class="cat-box"><div class="percentage-box">'+(number/total_sum*100)+'%</div><div class="nominal"><p>$ '+number+'</p></div></div>')
			inc_sum_sec2.append(cat_box2);
		}
	})

}

function show_expenses() {
	var datos = query_cat_month('expenses');
	var total = [];
	var exp_sum_sec1 = $('.summary-section .sum-expenses-section .sum-sec1 .detail-box');
	var exp_sum_sec2 = $('.summary-section .sum-expenses-section .sum-sec2 .detail-box');

	exp_sum_sec1.empty();
	exp_sum_sec2.empty();

	datos.forEach(function(element) {
		total.push(element[1]);
	});
	var total_sum = suma_lista(total); 


	datos.forEach(function(element) {
		var cat_name = element[0];
		var number = element[1];
		if (number) {
			// Left side of the summary section
			var cat_box1 = $('<div class="cat-box"><p>'+cat_name+' </p><div class="cat-inco-container"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 224 224" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg></div></div>');
			exp_sum_sec1.append(cat_box1);

			// Right side of the summary section
			var cat_box2 = $('<div class="cat-box"><div class="percentage-box">'+(number/total_sum*100)+'%</div><div class="nominal"><p>$ '+number+'</p></div></div>')
			exp_sum_sec2.append(cat_box2);
		}
	})
}

function show_balance() {
	var balance_graph = $('<div class="balance-graph"><div class="balance-plus"><div class="plus-sign"><i class="fas fa-plus"></i></div></div><div class="balance-plus-graph"></div><div class="balance-minus-graph"></div><div class="balance-minus"><div class="minus-sign"><i class="fas fa-minus"></i></div></div></div>');
	var balance_sum_sec = $('.sum-balance-section');
	balance_sum_sec.empty();



	// Income monthly data
	var datos_income = query_cat_month('income');
	var total_income = [];

	datos_income.forEach(function(element) {
		total_income.push(element[1]);
	});
	var total_sum_income = suma_lista(total_income); 


	// Expenses monthly data
	var datos_expenses = query_cat_month('expenses');
	var total_expenses = [];

	datos_expenses.forEach(function(element) {
		total_expenses.push(element[1]);
	});
	var total_sum_expenses = suma_lista(total_expenses); 

	if ((total_sum_income != 0) || (total_sum_expenses != 0)) {
		balance_sum_sec.append(balance_graph);
		// width specification
		$('.balance-plus-graph').css('flex-basis',(total_sum_income/(total_sum_income + total_sum_expenses)*100)+'%');
		$('.balance-minus-graph').css('flex-basis',100-(total_sum_income/(total_sum_income + total_sum_expenses)*100)+'%');


		// Balance
		var balance_income = $('<div class="balance-income"><p>Ingresos</p><p>$ '+total_sum_income+'</p></div>');
		balance_sum_sec.append(balance_income);

		var balance_expenses = $('<div class="balance-expenses"><p>Gastos</p><p>$ '+total_sum_expenses+'</p></div>');
		balance_sum_sec.append(balance_expenses);

		var result_box = $('<div class="result-box1"><p>Saldo</p><p>$ '+(total_sum_income - total_sum_expenses)+'</p></div>');
		balance_sum_sec.append(result_box);
	}
}

function transaction_day(dia) {
	var transaction_container = $('.data_day_transactions');
	transaction_container.empty();
	var income_data = [];
	var expenses_data = [];
	types.forEach(function (element) {
		var type_selected = (element === 'income')?income_category:expense_category;
		type_selected.forEach( function (element1) {
			var transaction = data[currentYear][currentMonth][day][element][element1];
			transaction.forEach( function (element2) {
				if(element2) {
					var transaction_data = $('<div class="transaction"><div class="transaction-sec1"><div class="cat-box"><div class="cat-inco-container"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="16" height="16"viewBox="0 0 224 224"style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg></div><p>'+element1+'</p></div><div class="tran-import"><p>$ '+element2+'</p></div></div><div class="transaction-sec2"><div class="transaction-note-box"><p>Nota:</p><p class="transaction-note">No hay notas addicionales</p></div></div></div>')
					transaction_container.append(transaction_data);	
				}

				if(element === 'income') {
					income_data.push(element2);
				} else {
					expenses_data.push(element2);
				}

			});
		});

	});
	var balance_data = suma_lista(income_data) - suma_lista(expenses_data);
	var balance_box = $('section.transactions-container div.balance-sec p:nth-of-type(2)');
	balance_box.empty();
	balance_box.append('$ '+balance_data);
}


function today_transaction() {
	var transaction_container = $('.data_transaction');
	var income_data = [];
	var expenses_data = [];
	var dia = new Date().getDate();
	transaction_container.empty();
	types.forEach(function (element) {
		var type_selected = (element === 'income')?income_category:expense_category;
		type_selected.forEach( function (element1) {
			var transaction = data[currentYear][currentMonth][dia][element][element1];
			transaction.forEach( function (element2) {
				if(element2) {
					var transaction_data = $('<div class="transaction"><div class="transaction-sec1"><div class="cat-box"><div class="cat-inco-container"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="16" height="16"viewBox="0 0 224 224"style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,224v-224h224v224z" fill="none"></path><g fill="#ffffff"><path d="M196,47.88c0,22.86667 -24.36,48.90667 -61.41333,86.14667c-34.53333,33.88 -65.42667,62.16 -87.36,62.16c-5.69333,0 -10.73333,-1.96 -15.12,-6.16c-8.96,-7.37333 -13.44,-18.29333 -13.44,-32.38667c0,-11.94667 3.08,-20.53333 7.18667,-26.6c23.61333,2.24 37.05333,15.02667 37.52,15.58667l13.25333,-13.25333c-0.74667,-0.65333 -14.28,-14 -38.17333,-19.22667c2.70667,-16.05333 11.29333,-28.18667 23.89333,-34.44c24.54667,2.70667 42.93333,20.16 43.12,20.34667l13.06667,-13.44c-0.84,-0.84 -16.89333,-16.14667 -40.78667,-22.77333c4.66667,-13.16 14.56,-21.74667 29.02667,-25.01333c22.68,4.94667 34.25333,21.56 34.81333,22.30667l15.49333,-10.26667c-0.56,-0.93333 -9.89333,-14.56 -28.18667,-23.8c6.81333,-4.85333 15.58667,-8.4 29.21333,-8.4c18.2,0 37.89333,11.2 37.89333,29.21333z"></path></g></g></svg></div><p>'+element1+'</p></div><div class="tran-import"><p>$ '+element2+'</p></div></div><div class="transaction-sec2"><div class="transaction-note-box"><p>Nota:</p><p class="transaction-note">No hay notas addicionales</p></div></div></div>')
					transaction_container.append(transaction_data);	
				}

				if(element === 'income') {
					// Number(element2);
					income_data.push(element2);
				} else {
					// Number(element2);
					expenses_data.push(element2);
				}

			});
		});

	});
	var balance_data = suma_lista(income_data) - suma_lista(expenses_data);
	var balance_box = $('div.transactions-container div.balance-sec p:nth-of-type(2)');
	balance_box.empty();
	balance_box.append('$ '+balance_data);
	console.log(balance_data);
}

var go_to_input = $('.go_input_data');

go_to_input.click(function() {
	var input_container = $('section#input_data');
	input_container.css('display','block');
});