// js/app.js

$(document).ready(function() {
  const $book = $('#flipbook');
  const narrador = document.getElementById('narrador');

  initFlipbook();

  // Al cambiar de página, reproduce el audio
  $book.bind('turned', function(e, page) {
    const audioSrc = $book.find('.page').eq(page-1).data('audio');
    if (audioSrc) {
      narrador.src = audioSrc;
      narrador.play().catch(()=>{/* bloqueado si no se activó */});
    } else {
      narrador.pause();
    }
  });

  // Resize responsive sin destruir
  $(window).on('resize', function() {
    if ($book.data('turn')) {
      const w = Math.min(window.innerWidth * 0.9, 600);
      const h = Math.round(w * (4/3)); // ajusta según tu aspect-ratio
      $book.turn('size', w, h);
    }
  });
});

function initFlipbook() {
  const $book = $('#flipbook');
  const w = Math.min(window.innerWidth * 0.9, 600);
  const h = Math.round(w * (4/3)); // ajusta según tu aspect-ratio

  $book.turn({
    width: w,
    height: h,
    autoCenter: true,
    pages: $book.find('.page').length
  });

  // Zoom opcional (mantiene una página a la vez)
  $book.turn('zoom', {
    max: 2,
    when: {
      tap:        function() { this.toggle(); },
      swipeLeft:  function() { this.turn('next'); },
      swipeRight: function() { this.turn('previous'); }
    }
  });
}
