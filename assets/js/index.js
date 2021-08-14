let root = document.getElementById('root');

let setScale = debounce(() => {
  root.style.transform = `scale(${getScale()})`;
}, 200);

window.addEventListener('resize', setScale);
setScale();

function getScale(width = 1920, height = 1080) {
  let scaleW = window.innerWidth / width;
  let scaleH = window.innerHeight / height;
  return scaleW < scaleH ? scaleW : scaleH;
}

function debounce(fn, wait = 200) {
  let timeout = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}
