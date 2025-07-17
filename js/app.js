// js/app.js
$(document).ready(function() {
  const $book    = $('#flipbook');
  const narrador = document.getElementById('narrador');

  initFlipbook();

  // Redimensionar responsive sin destruir
  $(window).on('resize', function() {
    if (!$book.data('turn')) return;
    const nw = Math.min(window.innerWidth * 0.9, 600);
    const nh = Math.round(nw * 1.5);
    $book.css({ width: nw + 'px', height: nh + 'px' })
         .turn('size', nw, nh);
  });
});

function initFlipbook() {
  const $book     = $('#flipbook');
  const narrador  = document.getElementById('narrador');
  const pageCount = $book.find('.page').length;

  const w = Math.min(window.innerWidth * 0.9, 600);
  const h = Math.round(w * 1.5);

  $book.css({ width: w + 'px', height: h + 'px' });

  $book.turn({
    display:    'single',
    width:      w,
    height:     h,
    autoCenter: true,
    pages:      pageCount,
    when: {
      // NOTE: aquí usamos `view`, que es un array con las páginas mostradas
      turned: function(event, page, view) {
        // view[0] es la página actual en modo single
        const currentPage = view[0] || page;
        const audioSrc = $book
          .find('.page')
          .eq(currentPage - 1)
          .data('audio') || '';

        narrador.src = audioSrc;
        if (audioSrc) narrador.play().catch(()=>{});
      }
    }
  });

  // activamos zoom sobre la misma instancia
  $book.turn('zoom', {
    max: 2,
    when: {
      tap:        function() { this.toggle(); },
      swipeLeft:  function() { this.turn('next'); },
      swipeRight: function() { this.turn('previous'); }
    }
  });
}
