iniciar();


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

function iniciar() {
	$('.sum-expenses-section').addClass('display-none');
}

var balance_btn = $('#balance-btn');
balance_btn.click(function() {
	if ($('.sum-balance-section').hasClass('display-none'))
	{
		$('.sum-balance-section').removeClass('display-none');
		$('.sum-income-section').addClass('display-none');
		$('.sum-expenses-section').addClass('display-none');
	} else	{}
});

function iniciar() {
	$('.sum-expenses-section').addClass('display-none');
	$('.sum-balance-section').addClass('display-none');
}

var close_complete = $('#data-complete .close-data-complete i');

close_complete.click(function() {
	$('section#data-complete').css('display','none');
})

var open_complete = $('#expand-icon');
open_complete.click(function() {
	$('section#data-complete').css('display','block');
})