$(document).ready(function() {
  const $book    = $('#flipbook');
  const narrador = document.getElementById('narrador');

  // Arranca el flipbook en cuanto carga el DOM
  initFlipbook();

  // Cuando el usuario pase página, dispara el audio correspondiente
  $book.bind('turned', function(e, page) {
    const src = $book.find('.page').eq(page - 1).data('audio');
    if (src) {
      narrador.src = src;
      narrador.play().catch(() => {
        console.warn('Narración bloqueada: haz clic en "Activar narración"');
      });
    } else {
      narrador.pause();
    }
  });

  // En resize ajustamos tamaño sin destruir la instancia
  $(window).on('resize', function() {
    if ($book.data('turn')) {
      const w = Math.min(window.innerWidth * 0.9, 600);
      const h = Math.round(w * 1.5);
      $book.turn('size', w, h);
    }
  });
});

function initFlipbook() {
  const $book = $('#flipbook');
  const w     = Math.min(window.innerWidth * 0.9, 600);
  const h     = Math.round(w * 1.5);

  // Inicialización con display single
  $book.css({ width: w + 'px', height: h + 'px' }).turn({
    display:    'single',
    width:      w,
    height:     h,
    autoCenter: true
  });

  // Zoom opcional sobre la misma instancia
  $book.turn('zoom', {
    max: 2,
    when: {
      tap:        function() { this.toggle(); },
      swipeLeft:  function() { this.turn('next'); },
      swipeRight: function() { this.turn('previous'); }
    }
  });
}
