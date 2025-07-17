// js/app.js

$(document).ready(function() {
  const $book = $('#flipbook');

  // 1) Inicializa Turn.js
  $book.turn({
    width: $book.parent().width(),   // usa el ancho del contenedor
    height: $book.parent().height(), // altura idem
    autoCenter: true
  });

  // 2) Inicializa Zoom (asegúrate de haber incluido zoom.js antes)
  $book.turn('zoom', {
    max: 2,   // hasta 200% de zoom
    when: {
      // Doble clic o tap para alternar zoom in/out
      tap: function(event) {
        this.toggle();
      },
      // Si está zoom, permitir swipe para pasar página
      swipeLeft: function(event) {
        this.turn('next');
      },
      swipeRight: function(event) {
        this.turn('previous');
      }
    }
  });
  
  // 3) Redimensionar dinámicamente si cambian el tamaño de ventana
  $(window).on('resize', function() {
    const w = Math.min(window.innerWidth * 0.9, 800);
    const h = Math.round(w * 0.66);
    $book.turn('size', w, h);
  });
});

