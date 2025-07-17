$(document).ready(function() {
  const $book    = $('#flipbook');
  const narrador = document.getElementById('narrador');

  // Inicializamos Turn.js + Zoom en cuanto carga el DOM
  initFlipbook();

  // Cada vez que cambias de página, lanzamos audio (si ya está desbloqueado)
  $book.bind('turned', function(e, page) {
    const src = $book.find('.page').eq(page-1).data('audio');
    if (src) {
      narrador.src = src;
      narrador.play().catch(() => {
        // si no está desbloqueado, el usuario deberá hacer clic en el botón
        console.warn('Narración bloqueada: haz clic en "Activar narración"');
      });
    } else {
      narrador.pause();
    }
  });

  // Redimensionado responsive sin destruir
  $(window).on('resize', function() {
    if ($book.data('turn')) {
      const w = Math.min(window.innerWidth * 0.9, 800);
      const h = Math.round(w * 0.66);
      $book.turn('size', w, h);
    }
  });
});

function initFlipbook() {
  const $book = $('#flipbook');
  const w     = Math.min(window.innerWidth * 0.9, 800);
  const h     = Math.round(w * 0.66);

  $book.turn({
    width:      w,
    height:     h,
    autoCenter: true
  });

  $book.turn('zoom', {
    max: 2,
    when: {
      tap:         function() { this.toggle(); },
      swipeLeft:   function() { this.turn('next'); },
      swipeRight:  function() { this.turn('previous'); }
    }
  });
}
