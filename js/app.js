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
          narrador.play().catch(e => {
            console.warn('Audio bloqueado hasta interacción del usuario');
          });
        } else {
          narrador.pause();
        }
      }
    }
  });
}

$(document).ready(function() {
  const startBtn = document.getElementById('startReading');
  const narrador  = document.getElementById('narrador');

  startBtn.addEventListener('click', function() {
    // Este play/pause desbloquea el permiso de audio
    narrador.play()
      .then(() => narrador.pause())
      .finally(() => {
        // Ahora podemos inicializar el flipbook
        initFlipbook();
        // Ocultamos el botón
        startBtn.style.display = 'none';
      });
  });

  // Opcional: si quieres que el usuario pueda reiniciar la página
  window.addEventListener('resize', function() {
    if ($('#flipbook').data('turn') && startBtn.style.display === 'none') {
      $('#flipbook').turn('destroy').html($('#flipbook').html());
      initFlipbook();
    }
  });
});
