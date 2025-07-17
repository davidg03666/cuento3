// js/app.js

$(document).ready(function() {
  const $book     = $('#flipbook');
  const narrador  = document.getElementById('narrador');
  const startBtn  = document.getElementById('startReading');

  // Cuando el usuario habilite el audio...
  startBtn.addEventListener('click', function() {
    narrador.play()
      .then(() => narrador.pause())
      .finally(() => {
        // Aquí llamamos al initFlipbook, pero nos aseguramos
        // de que TODO esté cargado con window.load
        $(window).on('load', initFlipbook);
        startBtn.style.display = 'none';
      });
  });

  // Función que arranca Turn.js + Zoom y enlaza la narración
  function initFlipbook() {
    const w = Math.min(window.innerWidth * 0.9, 800);
    const h = Math.round(w * 0.66);

    $book.turn({
      width:  w,
      height: h,
      autoCenter: true
    });

    $book.turn('zoom', {
      max: 2,
      when: {
        tap: function()    { this.toggle(); },
        swipeLeft: function()  { this.turn('next'); },
        swipeRight: function() { this.turn('previous'); }
      }
    });

    $book.bind('turned', function(e, page) {
      const audioSrc = $book.find('.page').eq(page-1).data('audio');
      if (audioSrc) {
        narrador.src = audioSrc;
        narrador.play().catch(()=>{/* ya desbloqueado */});
      } else {
        narrador.pause();
      }
    });
  }

  // Resize dinámico sin destroy
  $(window).on('resize', function() {
    if ($book.data('turn')) {
      const nw = Math.min(window.innerWidth * 0.9, 800);
      const nh = Math.round(nw * 0.66);
      $book.turn('size', nw, nh);
    }
  });
});
