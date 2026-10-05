// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  menuBtn.setAttribute('aria-expanded', nav.classList.toggle('open'));
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
});

// Telas do MVP por perfil
const perfis = {
  'Cliente': [
    { img: 'cliente-demandas.png', nome: 'Minhas demandas', texto: 'O cliente acompanha o status, a prioridade e o responsável por cada solicitação em um só lugar.' },
    { img: 'cliente-empresas.png', nome: 'Empresas', texto: 'Encontra a empresa por nome ou cidade e abre uma demanda para ela.' }
  ],
  'Suporte': [
    { img: 'suporte-demandas.png', nome: 'Central de demandas', texto: 'A equipe vê as demandas recebidas, filtra por status e inicia o atendimento.' },
    { img: 'suporte-formulario.png', nome: 'Checklist do relatório', texto: 'O suporte completa o contexto técnico, anexa arquivos, define a prioridade e envia à IA para gerar o relatório, que é revisado antes de ir ao dev.' }
  ],
  'Desenvolvedor': [
    { img: 'dev-demandas.png', nome: 'Central de demandas', texto: 'O desenvolvedor acompanha o contexto, os responsáveis e a evolução de cada solicitação.' }
  ],
  'Administrador': [
    { img: 'adm-formularios.png', nome: 'Problemas e formulários', texto: 'Catálogo da empresa: cada problema tem o seu formulário, com as perguntas publicadas.' },
    { img: 'adm-criar-forms.png', nome: 'Novo problema', texto: 'Define o problema, as orientações para a IA e as perguntas que o cliente deve preencher.' },
    { img: 'adm-funcionarios.png', nome: 'Funcionários', texto: 'Cadastra integrantes e altera os cargos quando necessário.' },
    { img: 'adm-empresa.png', nome: 'Minha empresa', texto: 'Configura as informações que aparecem para os clientes, como contato e horário de atendimento.' }
  ]
};
const tabs = document.getElementById('tabs');
const thumbs = document.getElementById('thumbs');
const mainImg = document.getElementById('main-img');
const capTitle = document.getElementById('cap-title');
const capText = document.getElementById('cap-text');

function showScreen(perfil, i) {
  const t = perfis[perfil][i];
  mainImg.src = 'imagens/' + t.img;
  mainImg.alt = `${perfil}: tela ${t.nome}`;
  capTitle.textContent = t.nome;
  capText.textContent = t.texto;
  thumbs.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-pressed', k === i));
}
function showPerfil(perfil) {
  tabs.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b.textContent === perfil));
  thumbs.innerHTML = '';
  perfis[perfil].forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `<img src="imagens/${t.img}" alt=""><span>${t.nome}</span>`;
    b.addEventListener('click', () => showScreen(perfil, i));
    thumbs.appendChild(b);
  });
  showScreen(perfil, 0);
}
Object.keys(perfis).forEach(p => {
  const b = document.createElement('button');
  b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = p;
  b.addEventListener('click', () => showPerfil(p));
  tabs.appendChild(b);
});
showPerfil('Cliente');

// Planos
const MENSAL = 199.90, ANUAL = 2039.90;
const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const amount = document.getElementById('amount'), per = document.getElementById('per'), note = document.getElementById('note');
document.querySelectorAll('.toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle button').forEach(b => b.classList.toggle('on', b === btn));
    if (btn.dataset.plan === 'anual') {
      amount.textContent = brl(ANUAL);
      per.textContent = 'por empresa, a cada ano';
      note.textContent = `Equivale a ${brl(ANUAL / 12)} por mês, uma economia de ${brl(MENSAL * 12 - ANUAL)} no ano.`;
    } else {
      amount.textContent = brl(MENSAL);
      per.textContent = 'por empresa, a cada mês';
      note.textContent = '';
    }
  });
});

// CTA
const form = document.getElementById('form'), email = document.getElementById('email'), msg = document.getElementById('msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  email.classList.toggle('err', !ok);
  if (!ok) { msg.textContent = 'Digite um e-mail válido, por exemplo voce@suaempresa.com.br.'; email.focus(); return; }
  msg.textContent = 'Recebido! Em breve entraremos em contato para mostrar a ResolveTech.';
  form.reset();
});
