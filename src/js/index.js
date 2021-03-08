// jQuery
@@include('../../node_modules/jquery/dist/jquery.js')

// Datapicker
@@include('../../src/js/bootstrap-datepicker.min.js')
@@include('../../src/js/bootstrap-datepicker.ru.min.js')

// Imask
@@include('../../node_modules/imask/dist/imask.js')

// Popper
//include('../../node_modules/popper.js/dist/umd/popper.js')


// Bootstrap 4  js
@@include('../../node_modules/bootstrap/js/dist/util.js')
//include('../../node_modules/bootstrap/js/dist/alert.js')
//include('../../node_modules/bootstrap/js/dist/button.js')
//include('../../node_modules/bootstrap/js/dist/carousel.js')
//@include('../../node_modules/bootstrap/js/dist/collapse.js')
@@include('../../node_modules/bootstrap/js/dist/dropdown.js')
@@include('../../node_modules/bootstrap/js/dist/modal.js')
//include('../../node_modules/bootstrap/js/dist/tooltip.js')
//include('../../node_modules/bootstrap/js/dist/popover.js')
//include('../../node_modules/bootstrap/js/dist/scrollspy.js')
//include('../../node_modules/bootstrap/js/dist/tab.js')
//include('../../node_modules/bootstrap/js/dist/toast.js')



// Phone mask
let element = document.getElementById('phone');
let  maskOptions = {
  mask: '+{375} (00) 000-00-00'
};
let mask = IMask(element, maskOptions);

// Datapicker
$('.input-group.date').datepicker({
  format: 'dd/mm/yyyy',
  language: 'ru',
  orientation:'bottom',
  autoclose: 'true',
  todayHighlight:'true'
});

// Form handler
carForm.onsubmit = async function (e) {
  e.preventDefault();
  let formData = new FormData(document.forms.carForm);
  let date = new Date();
  let optionsY = { year: '2-digit', month: '2-digit', day: '2-digit', };
  let optionsH = { hour: '2-digit', minute: '2-digit' };
  let now = date.toLocaleString('ru-RU', optionsY) + ' - ' + date.toLocaleString('ru-RU', optionsH);
  formData.append('subject', 'Забронировать автомобиль');
  formData.append('date', now);

  let response = await fetch('/handler.php', {
    method: 'POST',
    body: formData
  });
  let result = await response.text();
  let html = '<div class="text-center pt-5"><button type="button" class="close" data-dismiss="modal" >&times;</button >' + result + '</div>';
  $('.modal-body').hide().html(html).fadeIn(500);
  $('.modal-content').css('min-height','200px');
};

