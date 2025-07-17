$(document).ready(function() {
  const $book = $('#flipbook');
  const narrador = document.getElementById('narrador');
  const startBtn = document.getElementById('startReading');

  // Al hacer click en el botón, desbloqueamos audio y arrancamos el flipbook
  startBtn.addEventListener('click', function() {
    // Play+pauase inmediato para otorgar permiso de autoplay
    narrador.play()
      .then(() => narrador.pause())
      .finally(() => {
        // Inicializa Turn.js
        initFlipbook();
        // Oculta botón
        startBtn.style.display = 'none';
      });
  });

  // Función que inicializa flipbook + zoom
  function initFlipbook() {
    // Calcula ancho/alto responsive
    const w = Math.min(window.innerWidth * 0.9, 800);
    const h = Math.round(w * 0.66);

    // Init Turn.js
    $book.turn({
      width:  w,
      height: h,
      autoCenter: true
    });

    // Init Zoom
    $book.turn('zoom', {
      max: 2,
      when: {
        tap: function() {
          this.toggle();
        },
        swipeLeft: function() {
          this.turn('next');
        },
        swipeRight: function() {
          this.turn('previous');
        }
      }
    });

    // Evento al cambiar de página
    $book.bind('turned', function(event, page) {
      const audioSrc = $book.find('.page').eq(page-1).data('audio');
      if (audioSrc) {
        narrador.src = audioSrc;
        narrador.play().catch(() => {
          console.warn('Audio bloqueado hasta interacción');
        });
      } else {
        narrador.pause();
      }
    });
  }

  // Ajustar tamaño al redimensionar
  $(window).on('resize', function() {
    if ($book.data('turn')) {
      const nw = Math.min(window.innerWidth * 0.9, 800);
      const nh = Math.round(nw * 0.66);
      $book.turn('size', nw, nh);
    }
  });
});
