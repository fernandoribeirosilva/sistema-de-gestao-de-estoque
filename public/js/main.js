const mensagemError = document.querySelector(".mensagem-error");
const mensagemSuccess = document.querySelector(".mensagem-success");
const btnLimpaInput = document.querySelector(".btn-cancelar");
const btnCancelarVenda = document.querySelector(".btn-Cancelar-venda");
const btnVenda = document.querySelectorAll(".btn-venda");

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

if (btnLimpaInput) {
  btnLimpaInput.addEventListener("click", (e) => {
    e.preventDefault();
    inputNome.value = "";
    inputCPF.value = "";
    inputTelefone.value = "";
    inputCargo.value = "";
    inputSenha.value = "";
  });
}

function fecharModal() {
  document.querySelector(".modal").style.opacity = 0;
  let time = setInterval(() => {
    document.querySelector(".modal").style.display = "none";
    clearInterval(time);
  }, 200);
}

if (btnCancelarVenda) {
  btnCancelarVenda.addEventListener("click", (e) => {
    e.preventDefault();
    fecharModal();
  });
}

function mostraModal() {
  document.querySelector(".modal").style.opacity = 0;
  document.querySelector(".modal").style.display = "block";
  let time = setInterval(() => {
    document.querySelector(".modal").style.opacity = 1;
    clearInterval(time);
  }, 200);
}

function mostraProduto(produto) {
  document.querySelector(".datos-produto .id").innerHTML = produto.id;
  document.querySelector(".datos-produto .nome").innerHTML = produto.nome;
  document.querySelector(".datos-produto .preco").innerHTML = produto.preco;
  document.querySelector(".datos-produto .tamanho").innerHTML = produto.tamanho;
  mostraModal();
}

async function buscarProduto(id) {
  const res = await fetch(`http://localhost:3000/produto/${id}`);
  const { produto } = await res.json();
  return produto;
}

if (btnVenda) {
  btnVenda.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const produtoId = parseInt(e.target.getAttribute("data-key"));
      const produto = await buscarProduto(produtoId);
      console.log(produto);
      mostraProduto(produto);
    });
  });
}

/* 
  method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
*/
