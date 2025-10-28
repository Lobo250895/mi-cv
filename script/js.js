const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.card, .job, .thumb').forEach(el => {
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Guardar el valor original y ponerlas en 0
  document.querySelectorAll('.fill').forEach(bar => {
    const match = bar.getAttribute('style')?.match(/width:(\d+%)/);
    if (match) {
      const width = match[1];
      bar.dataset.target = width; // guardar valor real
      bar.style.width = '0%';     // inicia vacia
    }
  });
});

window.addEventListener('scroll', () => {
  document.querySelectorAll('.fill').forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && !bar.classList.contains('animated')) {
      bar.classList.add('animated');
      const targetWidth = bar.dataset.target || '0%';
      bar.style.transition = 'width 1.5s ease-in-out';
      bar.style.width = targetWidth;
    }
  });
});

const toggle = document.createElement('button');
toggle.id = 'toggle-theme';
toggle.className = 'btn';
toggle.textContent = '🌓';
toggle.style.position = 'fixed';
toggle.style.top = '20px';
toggle.style.right = '20px';
toggle.style.zIndex = '1000';
document.body.appendChild(toggle);

toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem(
    'theme',
    document.body.classList.contains('light') ? 'light' : 'dark'
  );
});

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
}

document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('mouseenter', () => thumb.classList.add('hover'));
  thumb.addEventListener('mouseleave', () => thumb.classList.remove('hover'));
});

window.addEventListener('load', () => {
  const title = document.querySelector('.title');
  if (!title) return;
  const text = "Analista de Sistemas & Desarrolladora Full-Stack";
  let i = 0;
  title.textContent = '';
  function type() {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    }
  }
  type();
});
