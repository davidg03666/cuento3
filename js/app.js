function initFlipbook() {
  $('#flipbook').turn({
    width: $('#flipbook').width(),
    height: $('#flipbook').height(),
    autoCenter: true,
    
  });
}

$(document).ready(function() {
  // inicializa el flipbook
  initFlipbook();

  // en resize, destruye y vuelve a inicializar
  $(window).on('resize', function() {
    $('#flipbook').turn('destroy').html($('#flipbook').html());
    initFlipbook();
  });
});
