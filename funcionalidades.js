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
  const leftBtn  = carousel.querySelector('.nav.left');
  const rightBtn = carousel.querySelector('.nav.right');

  // Fonte de dados das seguradoras
  const seguradoras = [
    { titulo: 'Porto Seguro', imagem: 'imagens/logo.png' },
    { titulo: 'SulAmérica', imagem: 'imagens/logosComNome.png' },
    { titulo: 'Bradesco Seguros', imagem: 'imagens/logosCom1Nome.png' },
    { titulo: 'Tokio Marine', imagem: 'imagens/premiacao.jpg' },
    { titulo: 'Allianz', imagem: 'imagens/equipe.jpg' },
    { titulo: 'HDI Seguros', imagem: 'imagens/deoniVero.jpg' },
    { titulo: 'Liberty Seguros', imagem: 'imagens/frenteEmpresa.png' },
    { titulo: 'Zurich', imagem: 'imagens/logo.png' },
    { titulo: 'Mapfre', imagem: 'imagens/logosComNome.png' },
    { titulo: 'Sompo Seguros', imagem: 'imagens/logosCom1Nome.png' },
    { titulo: 'Azul Seguros', imagem: 'imagens/premiacao.jpg' },
    { titulo: 'Alfa Seguradora', imagem: 'imagens/equipe.jpg' },
    { titulo: 'Itaú Seguros', imagem: 'imagens/deoniVero.jpg' },
    { titulo: 'Suhai Seguradora', imagem: 'imagens/frenteEmpresa.png' }
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
      <img src="${seg.imagem}" alt="Logo ${seg.titulo}" class="logo-seguradora" style="max-width: 300px; display: block; margin: 0 auto 40px; border-radius: 15px;"/>
      <h2>${seg.titulo}</h2>`;

    container.appendChild(card);
    carousel.appendChild(container);
  });

  // Atualiza posição e visibilidade dos cards
  function updateCarousel() {
    const containers = carousel.querySelectorAll('.card-container');
    containers.forEach((el, i) => {
      const offset    = (active - i) / 3;
      const absOffset = Math.abs(offset);
      const direction = Math.sign(active - i);

      el.style.setProperty('--active',      i === active ? 1 : 0);
      el.style.setProperty('--offset',      offset);
      el.style.setProperty('--abs-offset',  absOffset);
      el.style.setProperty('--direction',   direction);
      el.style.setProperty('--pointer-events', i === active ? 'auto' : 'none');
      el.style.setProperty('--opacity',       Math.abs(active - i) >= MAX_VISIBILITY ? 0 : 1);
      el.style.setProperty('--display',       Math.abs(active - i) >  MAX_VISIBILITY ? 'none' : 'block');

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

    leftBtn.style.visibility  = active > 0 ? 'visible' : 'hidden';
    rightBtn.style.visibility = active < CARDS - 1 ? 'visible' : 'hidden';
  }

  // Eventos de clique
  leftBtn.addEventListener('click', () => {
    if (active > 0) active--;
    updateCarousel();
  });
  rightBtn.addEventListener('click', () => {
    if (active < CARDS - 1) active++;
    updateCarousel();
  });

  // Inicialização
  updateCarousel();
});

