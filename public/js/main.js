const mensagemError = document.querySelector(".mensagem-error");
const mensagemSuccess = document.querySelector(".mensagem-success");
const btnLimpaInput = document.querySelector(".btn-cancelar");
const btnCancelarVenda = document.querySelector(".btn-Cancelar-venda");
const btnConfimarVenda = document.querySelector(".btn-Confimar-venda");
const btnVenda = document.querySelectorAll(".btn-venda");

const inputNome = document.querySelector('input[name="nome"]');
const inputCPF = document.querySelector('input[name="cpf"]');
const inputTelefone = document.querySelector('input[name="telefone"]');
const inputCargo = document.querySelector('input[name="cargo"]');
const inputSenha = document.querySelector('input[name="senha"]');

let produtoId = null;
let mensagemSucesso = "";

window.onload = () => {
  if (mensagemError || mensagemSuccess) {
    let mensagem = mensagemError ?? mensagemSuccess;
    console.log(mensagem);
    setTimeout(() => {
      mensagem.style.display = "none";
    }, 5000);
  }
};

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

function mostraModal() {
  document.querySelector(".modal").style.opacity = 0;
  document.querySelector(".modal").style.display = "block";
  let time = setInterval(() => {
    document.querySelector(".modal").style.opacity = 1;
    clearInterval(time);
  }, 200);
}

function mostraProduto(produto) {
  produtoId = produto.id;
  document.querySelector(".datos-produto .id").innerHTML = produto.id;
  document.querySelector(".datos-produto .nome").innerHTML = produto.nome;
  document.querySelector(".datos-produto .preco").innerHTML = produto.preco;
  document.querySelector(".datos-produto .tamanho").innerHTML = produto.tamanho;
  mostraModal();
}

function mensagemDeSucesso(msg) {
  alert(msg);
  location.href = "http://localhost:3000/";
}

function mensagemDeError(error) {
  document.querySelector(".error").style.display = "flex";
  document.querySelector(".error").innerText = error;
  let time = setInterval(() => {
    document.querySelector(".error").style.display = "none";
    clearInterval(time);
  }, 5000);
}

async function buscarProduto(id) {
  const res = await fetch(`http://localhost:3000/produto/${id}`);
  const data = await res.json();

  if (data.error) {
    return data.error;
  }

  return data.produto;
}

async function venderProduto(produtoId, quantidade) {
  const res = await fetch(`http://localhost:3000/produto/venda`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ produtoId, quantidade }),
  });
  const data = await res.json();
  if (data.error) return data.error;

  return data.msg;
}

if (btnCancelarVenda) {
  btnCancelarVenda.addEventListener("click", (e) => {
    e.preventDefault();
    fecharModal();
  });
}

if (btnConfimarVenda) {
  btnConfimarVenda.addEventListener("click", async (e) => {
    e.preventDefault();
    let quantidade = document.querySelector(".area-from form #quantidade");
    if (!quantidade.value) {
      mensagemDeError("Quantidade invalida.");
      return;
    }
    const data = await venderProduto(produtoId, +quantidade.value);
    fecharModal();
    mensagemDeSucesso(data);
  });
}

if (btnVenda) {
  btnVenda.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const produtoId = parseInt(e.target.getAttribute("data-key"));
      const data = await buscarProduto(produtoId);

      if (typeof data === "string") {
        mensagemDeError(data);
        mostraModal();
        return;
      }
      mostraProduto(data);
    });
  });
}
