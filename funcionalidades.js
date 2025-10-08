var logo = window.document.getElementById("logo")
var idade = window.document.getElementById("anos")
function scrollParaElementoPorId(idDoElemento) {
  const elemento = document.getElementById(idDoElemento);
  if (elemento) {
    if (idDoElemento === 'logo') {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      const yOffset = -60; // altura do menu fixo
      const y = elemento.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  } else {
    console.warn(`Elemento com ID '${idDoElemento}' não encontrado.`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1) Scroll reveal usando IntersectionObserver
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in-element')
    .forEach(el => observer.observe(el));

  // Chama definirIdade ao carregar a página
  definirIdade();
});

function definirIdade() {
  const dataFundacao = new Date("2000-03-01");
  const hoje = new Date();
  let anos = hoje.getFullYear() - dataFundacao.getFullYear();
  const m = hoje.getMonth() - dataFundacao.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < dataFundacao.getDate())) {
    anos--;
  }
  if (idade) {
    idade.textContent = anos;
  }
}


// script.js
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('seguradoras');
  const carousel = section.querySelector('.carousel');
  // Remover botões de navegação se existirem
  // const leftBtn = carousel.querySelector('.nav.left');
  // const rightBtn = carousel.querySelector('.nav.right');
  // if (leftBtn) leftBtn.remove();
  // if (rightBtn) rightBtn.remove();

  // Fonte de dados das seguradoras
  const seguradoras = [
    { titulo: 'Aliro', imagem: 'imagens/Logos/aliro.png' },
    { titulo: 'Allianz', imagem: 'imagens/Logos/allianz.jpg' },
    { titulo: 'Azos', imagem: 'imagens/Logos/azos.png' },
    { titulo: 'Azul', imagem: 'imagens/Logos/azul.jpg' },
    { titulo: 'Bradesco Seguros', imagem: 'imagens/Logos/logoBradesco.png' },
    { titulo: 'Essor', imagem: 'imagens/Logos/essor.png' },
    { titulo: 'Fairfax Seguros', imagem: 'imagens/Logos/logoFf.png' },
    { titulo: 'HDI Seguros', imagem: 'imagens/Logos/hdi.jpg' },
    { titulo: 'Icatu', imagem: 'imagens/Logos/icatu.jpg' },
    { titulo: 'Itaú Seguros', imagem: 'imagens/Logos/logoItau.png' },
    { titulo: 'MAG Seguros', imagem: 'imagens/Logos/mag.png' },
    { titulo: 'Mapfre Seguros', imagem: 'imagens/Logos/mapfre.png' },
    { titulo: 'Metlife', imagem: 'imagens/Logos/metlife.png' },
    { titulo: 'Porto Seguro', imagem: 'imagens/Logos/portoseguro.jpg' },
    { titulo: 'Swiss Re', imagem: 'imagens/Logos/swiss.png' },
    { titulo: 'Tokio Marine', imagem: 'imagens/Logos/logoTokio.jpg' },
    { titulo: 'Yelum', imagem: 'imagens/Logos/yelum.jpg' },
    { titulo: 'Zurich', imagem: 'imagens/Logos/zurich.png' }
  ];

  const CARDS = seguradoras.length;
  const MAX_VISIBILITY = 3;
  let active = 0;

  // Gera dinamicamente os cards a partir da fonte de dados
  seguradoras.forEach((seg, i) => {
    const container = document.createElement('div');
    container.className = 'card-container';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${seg.imagem}" alt="Logo ${seg.titulo}" class="logo-seguradora" style="max-width: 300px; display: block; margin: 0 auto 50px; border-radius: 15px;"/>
      <h2>${seg.titulo}</h2>`;

    // Impede arrastar imagem
    setTimeout(() => {
      const img = card.querySelector('img');
      if (img) {
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', e => e.preventDefault());
      }
    }, 0);

    container.appendChild(card);
    carousel.appendChild(container);
  });

  // Atualiza posição e visibilidade dos cards
  function updateCarousel() {
    const containers = carousel.querySelectorAll('.card-container');
    containers.forEach((el, i) => {
      const offset = (active - i) / 3;
      const absOffset = Math.abs(offset);
      const direction = Math.sign(active - i);

      el.style.setProperty('--active', i === active ? 1 : 0);
      el.style.setProperty('--offset', offset);
      el.style.setProperty('--abs-offset', absOffset);
      el.style.setProperty('--direction', direction);
      el.style.setProperty('--pointer-events', i === active ? 'auto' : 'none');
      el.style.setProperty('--opacity', Math.abs(active - i) >= MAX_VISIBILITY ? 0 : 1);
      el.style.setProperty('--display', Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block');

      // Adiciona/remover classe 'active' no card
      const card = el.querySelector('.card');
      if (card) {
        if (i === active) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      }
    });
  }

  // Swiper: mouse/touch events
  let startX = null;
  let isDragging = false;

  function onDragStart(e) {
    isDragging = true;
    startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
  }

  function onDragMove(e) {
    if (!isDragging) return;
    const x = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const diff = x - startX;
    // threshold de 50px para swipe
    if (Math.abs(diff) > 50) {
      if (diff < 0 && active < CARDS - 1) {
        active++;
        updateCarousel();
      } else if (diff > 0 && active > 0) {
        active--;
        updateCarousel();
      }
      isDragging = false;
    }
  }

  function onDragEnd() {
    isDragging = false;
  }

  carousel.addEventListener('mousedown', onDragStart);
  carousel.addEventListener('mousemove', onDragMove);
  carousel.addEventListener('mouseup', onDragEnd);
  carousel.addEventListener('mouseleave', onDragEnd);
  carousel.addEventListener('touchstart', onDragStart);
  carousel.addEventListener('touchmove', onDragMove);
  carousel.addEventListener('touchend', onDragEnd);

  // Inicialização
  updateCarousel();

  // Torna os botões de navegação funcionais
  const leftBtn = carousel.querySelector('.nav.left');
  const rightBtn = carousel.querySelector('.nav.right');
  if (leftBtn) {
    // if (active === 0) {
    //   leftBtn.classList.add('hidden');
    // } else {
    //   leftBtn.classList.remove('hidden');
    // }
    leftBtn.addEventListener('click', () => {
      if (active > 0) {
        active--;
        updateCarousel();
      }
    });
  }
  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      if (active < CARDS - 1) {
        active++;
        updateCarousel();
      }
    });
  }
});

(function () {
  // breakpoint para mobile
  var isMobile = window.matchMedia('(max-width: 900px)').matches;
  var pathname = (location.pathname || '').toLowerCase();
  // evita loop e só redireciona se não estiver já na versão mobile
  if (isMobile && pathname.indexOf('mobile.html') === -1) {
    var dest = 'mobile.html' + location.search + location.hash;
    location.replace(dest);
  }
})();