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

document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards-seguradoras');
  if (!cardsContainer) return; // sai se não houver a seção

  const itemsSeg = Array.from(cardsContainer.children);
  let currentSeg = 0;
  const totalSeg = itemsSeg.length;
  const gapSeg = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--seg-gap')
  );

  function renderSeg() {
    itemsSeg.forEach((card, i) => {
      let offset = i - currentSeg;
      if (offset < -totalSeg/2) offset += totalSeg;
      if (offset >  totalSeg/2) offset -= totalSeg;

      const x = offset * gapSeg;
      const isActive = i === currentSeg;
      const scale = isActive ? 1.2 : 1;
      const opacity = isActive ? 1 : 0.6;
      const zIndex = totalSeg - Math.abs(offset);

      card.style.transform = `translateX(${x}px) scale(${scale})`;
      card.style.opacity   = opacity;
      card.style.zIndex    = zIndex;
    });
  }

  document.getElementById('prevSeg').addEventListener('click', () => {
    currentSeg = (currentSeg - 1 + totalSeg) % totalSeg;
    renderSeg();
  });

  document.getElementById('nextSeg').addEventListener('click', () => {
    currentSeg = (currentSeg + 1) % totalSeg;
    renderSeg();
  });

  // renderiza na primeira exibição
  renderSeg();
});
