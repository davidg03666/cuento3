function initFlipbook() {
  $('#flipbook').turn({
    width: $('#flipbook').width(),
    height: $('#flipbook').height(),
    autoCenter: true,
    when: {
      turned: function(event, page) {
        const audioSrc = $('#flipbook .page').eq(page-1).data('audio');
        const narrador = document.getElementById('narrador');
        if (audioSrc) {
          narrador.src = audioSrc;
          narrador.play();
        } else {
          narrador.pause();
        }
      }
    }
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
