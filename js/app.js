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

// js/app.js

function initFlipbook() {
  const $book    = $('#flipbook');
  const narrador = document.getElementById('narrador');

  // 1. Crea un array de URLs de audio en orden
  const audioList = $book
    .find('.page')
    .map((i, el) => $(el).attr('data-audio') || '')
    .get();
  console.log('%c[audioList]', 'color:purple', audioList);

  // 2. Calcula dimensiones (ratio 1024×1536 = 1.5)
  const w = Math.min(window.innerWidth * 0.9, 600);
  const h = Math.round(w * 1.5);
  $book.css({ width: w + 'px', height: h + 'px' });

  // 3. Inicializa Turn.js en modo single
  $book.turn({
    display:    'single',
    width:      w,
    height:     h,
    autoCenter: true,
    pages:      audioList.length,
    when: {
      turning() {
        narrador.pause();
        narrador.currentTime = 0;
      },
      turned(event, page, view) {
        const currentPage = (view && view[0]) ? view[0] : page;
        const audioSrc    = audioList[currentPage - 1] || '';
        console.log(
          '%c[turned]','color:green',
          'pagina→', currentPage,
          'audio→', audioSrc
        );
        if (audioSrc) {
          narrador.src = audioSrc;
          narrador.load();
          narrador.play().catch(e => console.warn('play error:', e));
        }
      }
    }
  });

  // 4) Elimina las páginas en blanco añadidas
  const total = $book.turn('pages');
  const real  = audioList.length;
  for (let p = real + 1; p <= total; p++) {
    $book.turn('removePage', p);
  }
  
  // 4. Activa Zoom
  $book.turn('zoom', {
    max: 2,
    when: {
      tap()        { this.toggle(); },
      swipeLeft()  { this.turn('next'); },
      swipeRight() { this.turn('previous'); }
    }
  });
}
