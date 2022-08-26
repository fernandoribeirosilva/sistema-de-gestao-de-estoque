const mensagem = document.querySelector('.mensagem-error');

if (mensagem) {
  setTimeout(() => {
    mensagem.style.display = 'none';
  }, 5000);
}