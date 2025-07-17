function initFlipbook() {
  const $book    = $('#flipbook');
  const narrador = document.getElementById('narrador');
  const pageCount= $book.find('.page').length;

  // Calcula ancho/alto con ratio 2:3
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
      // 1) Antes de girar la página, para el audio y lo reinicia
      turning: function(event, page, view) {
        console.log('%c[turning]','color:blue','→ requested page:', page, 'view:', view);
        narrador.pause();
        narrador.currentTime = 0;
      },
      // 2) Después de girar, toca el audio correcto
      turned: function(event, page, view) {
        // view[0] para single, o page si no existe
        const currentPage = (view && view[0]) ? view[0] : page;
        const audioSrc    = $book
          .find('.page')
          .eq(currentPage - 1)
          .data('audio') || '';
          console.log('%c[turned]','color:green',
          '→ currentPage:', currentPage,
          'audioSrc:', audioSrc,
          'narrador.src:', narrador.src
        );
        narrador.src = audioSrc;
        if (audioSrc) narrador.play().catch(()=>{});
      }
    }
  });

  // Activa Zoom
  $book.turn('zoom', {
    max: 2,
    when: {
      tap:        function() { this.toggle(); },
      swipeLeft:  function() { this.turn('next'); },
      swipeRight: function() { this.turn('previous'); }
    }
  });
}

$(document).ready(function() {
  initFlipbook();

  // redimensiona sin destruir
  $(window).on('resize', function() {
    const $book = $('#flipbook');
    if (!$book.data('turn')) return;
    const nw = Math.min(window.innerWidth * 0.9, 600);
    const nh = Math.round(nw * 1.5);
    $book.css({ width: nw + 'px', height: nh + 'px' })
         .turn('size', nw, nh);
  });
});

