function initFlipbook() {
  const $book = $('#flipbook');
  // ancho = 90% viewport o 600px máximo
  const w = Math.min(window.innerWidth * 0.9, 600);
  // altura = ancho * (1536/1024) = ancho * 1.5
  const h = Math.round(w * 1.5);

  $book.turn({
    width: w,
    height: h,
    autoCenter: true
  });

  $book.turn('zoom', {
    max: 2,
    when: {
      tap:        function() { this.toggle(); },
      swipeLeft:  function() { this.turn('next'); },
      swipeRight: function() { this.turn('previous'); }
    }
  });

  $book.bind('turned', function(e, page) {
    const src = $book.find('.page').eq(page-1).data('audio');
    const narrador = document.getElementById('narrador');
    if (src) {
      narrador.src = src;
      narrador.play().catch(()=>{/* si está bloqueado */});
    } else {
      narrador.pause();
    }
  });
}

// cuando cargue el DOM:
$(document).ready(function() {
  initFlipbook();
  $(window).on('resize', function() {
    // redimensiona sin destruir
    if ($('#flipbook').data('turn')) {
      const nw = Math.min(window.innerWidth * 0.9, 600);
      const nh = Math.round(nw * 1.5);
      $('#flipbook').turn('size', nw, nh);
    }
  });
});
