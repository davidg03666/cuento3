$(document).ready(function() {
  const $book    = $('#flipbook');
  const narrador = document.getElementById('narrador');

  initFlipbook();

  // Resize responsive sin destruir
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

  // Calcula ancho/alto con proporción 1024×1536 → 1.5
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
      // Antes de girar, detén y reinicia cualquier audio
      turning: function() {
        narrador.pause();
        narrador.currentTime = 0;
      },
      // Después de girar, extrae la página real de `view` y toca su audio
      turned: function(event, page, view) {
        const currentPage = (view && view[0]) || page;
        // LEER DIRECTO EL ATRIBUTO, no $.data()
        const audioSrc = $book
          .find('.page')
          .eq(currentPage - 1)
          .attr('data-audio') || '';

        console.log(
          '%c[turned]','color:green',
          'página→', currentPage,
          'audio→', audioSrc
        );

        if (audioSrc) {
          narrador.src = audioSrc;
          narrador.load();
          narrador.play().catch(e =>
            console.warn('play error:', e)
          );
        }
      }
    }
  });

  // Activa Zoom sobre la misma instancia
  $book.turn('zoom', {
    max: 2,
    when: {
      tap:        function() { this.toggle(); },
      swipeLeft:  function() { this.turn('next'); },
      swipeRight: function() { this.turn('previous'); }
    }
  });
}
