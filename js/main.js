$(document).ready(function(){

	// активируе первый слайдер
	setSlide($('#slider-container').children().eq(0));

	// меняем состояние кнопки первого слайдера
	$('#select-slide').children().children().eq(0).toggleClass('active');

	// позиционируем кнопки слайреа
	$('#select-slide').css('left', String($('.slider-main-block').width() - $('.description').width()) + 'px');

	// настраиваем мобильное меню
	alignCenter($("#modal ul"));
	$('#modal').height($(document).height());

	// placeholder для IE
	$('input').placeholder();

	// обработка нажатия на кнопки слайдера
	$('#select-slide').children().children().click(function(e)
	{
		if($(this).hasClass('active') || $('#slider-container').children().eq($(this).index()).length === 0)
		{
			return false;
		}

		setSlide($('#slider-container').children().eq($(this).index()));

		$('#select-slide').children().children().each(function(){
			$(this).removeClass('active');
		});

		$(this).toggleClass('active');
	});

	// обработка нажатия кнопок списка туров
	$('.tab').click(function(){
		$('.tab').each(function(){ $(this).removeClass('active'); });
		$(this).toggleClass('active');
	});

	// обработка нажатия выпадающих полей в боковой панелт
	$('select').click(function(){
		$('select').parent().each(function(){ $(this).removeClass('active'); });
		$(this).parent().toggleClass('active');
	});

	// обработка события при фокусировке на поле выбора в боковой панели
	$("select").focus(function(){
		$(this).css('background-color', 'white');
	});

	// при потере фокуса полем поиска в боковой панели
	$('select').blur(function(){ $(this).parent().removeClass('active'); });

	// активация мобильного меню
	$("#mobile-menu a").click(function(){ $('#modal').css('display', 'block'); });

	// деактивация мобильного меню
	$("#modal").click(function(){ $(this).css('display', 'none'); });
});

// изменение размеров окна
$(window).resize(function(){
	$('#select-slide').css('left', String($('.slider-main-block').width() - $('.description').width()) + 'px');
	alignCenter($("#modal ul"));
});

// прокрутка окна
$(window).scroll(function(){
	alignCenter($("#modal ul"));
	$('#select-slide').css('left', ($('.slider-main-block').width() - 220) + 'px');
});

// включения слайда
function setSlide(slide)
{
	$('#slider-container').children().each(function(){
		$(this).removeClass('active');
		$(this).children().children('img').removeAttr('style');
	});

	slide.addClass('active');

	$('#select-slide').css('display', 'none');

	slide.children('.slider-main-block').children('img').animate({ left: '0px' }, 500);
	slide.children('.slider-main-block').children('.description').removeAttr('style').animate({ right: '0px' }, 500);
	slide.children('.slider-footer').children('.second-text').removeAttr('style').animate({ left: '0px' }, 500);
	slide.children('.slider-footer').children('h1').removeAttr('style').animate({ left: '0px' }, 500);

	slide.children('.slider-footer').children('img').animate(
	{
		bottom: '-20px' },
		500,
		function()
		{
			$('#select-slide').css('display', 'block');
		});
}

// центровка пунктов мобильного меню
function alignCenter(elem){
	elem.css({
		left: ($(window).width() - elem.width()) / 2 + 'px',
		top: $(document).scrollTop() + 50 + 'px'
	});
}