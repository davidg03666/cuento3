// js/app.js

$(document).ready(function() {
  const $book    = $('#flipbook');
  const narrador = document.getElementById('narrador');

  // Arranca el flipbook (con zoom) en cuanto carga el DOM
  initFlipbook();

  // Cuando cambias de página, dispara el audio correspondiente
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

  // Redimensionar sin destruir la instancia
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

  // Calcula ancho/alto con ratio 2:3 (1024×1536 → 1.5)
  const w = Math.min(window.innerWidth * 0.9, 600);
  const h = Math.round(w * 1.5);

  // Ajusta el contenedor
  $book.css({ width: w + 'px', height: h + 'px' });

  // 1) Inicializa Turn.js en modo 'single'
  $book.turn({
    display:    'single',
    width:      w,
    height:     h,
    autoCenter: true,
    pages:      pageCount,
    when: {
      turned: function(event, page) {
        // Reproducción de audio en evento interno también como respaldo
        const audioSrc = $book.find('.page').eq(page - 1).data('audio');
        narrador.src = audioSrc || '';
        if (audioSrc) narrador.play().catch(()=>{});
      }
    }
  });

  // 2) Activa Zoom sobre la misma instancia de Turn.js
  $book.turn('zoom', {
    max: 2,
    when: {
      tap:         function() { this.toggle(); },
      swipeLeft:   function() { this.turn('next'); },
      swipeRight:  function() { this.turn('previous'); }
    }
  });
}
