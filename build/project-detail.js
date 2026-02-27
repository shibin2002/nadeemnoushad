(function () {
  function initFramesViewer(viewer) {
    const slides = viewer.querySelector('.frames-viewer-slides');
    const frames = viewer.querySelectorAll('.frame');
    const prevBtn = viewer.querySelector('.frames-prev');
    const nextBtn = viewer.querySelector('.frames-next');
    const dotsEl = viewer.querySelector('.frames-dots');

    if (!slides || frames.length === 0) return;

    let index = 0;

    function goTo(i) {
      index = ((i % frames.length) + frames.length) % frames.length;
      frames.forEach((f, j) => f.classList.toggle('active', j === index));
      dotsEl.querySelectorAll('.frames-dot').forEach((d, j) => d.classList.toggle('active', j === index));
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    frames.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'frames-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Frame ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    });
  }

  document.querySelectorAll('.frames-viewer').forEach(initFramesViewer);
})();
