const mensagemError = document.querySelector(".mensagem-error");
const mensagemSuccess = document.querySelector(".mensagem-success");
const btnCancelar = document.querySelector(".btn-cancelar");

const inputNome = document.querySelector('input[name="nome"]');
const inputCPF = document.querySelector('input[name="cpf"]');
const inputTelefone = document.querySelector('input[name="telefone"]');
const inputCargo = document.querySelector('input[name="cargo"]');
const inputSenha = document.querySelector('input[name="senha"]');

if (mensagemError || mensagemSuccess) {
  let mensagem = mensagemError ?? mensagemSuccess;
  setTimeout(() => {
    mensagem.style.display = "none";
  }, 5000);
}

btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  inputNome.value = "";
  inputCPF.value = "";
  inputTelefone.value = "";
  inputCargo.value = "";
  inputSenha.value = "";
});
