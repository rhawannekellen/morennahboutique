// === script.js ===
// Tudo roda quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", () => {

    // --- BUSCA DE PRODUTOS ---
    const inputBusca = document.querySelector("#txtBusca");
    const produtos = document.querySelectorAll(".produto");

    // Mensagem "Nenhum produto encontrado"
    const mensagemSemResultado = document.createElement("p");
    mensagemSemResultado.textContent = "Nenhum produto encontrado.";
    mensagemSemResultado.style.display = "none";
    mensagemSemResultado.style.marginTop = "10px";
    mensagemSemResultado.style.color = "red";
    document.getElementById("divBusca").appendChild(mensagemSemResultado);

    // Buscar enquanto digita
    inputBusca.addEventListener("input", () => {
        const termo = inputBusca.value.toLowerCase().trim();
        let algumProdutoVisivel = false;

        produtos.forEach((produto) => {
            const nomeProduto = produto.querySelector("h3").textContent.toLowerCase();
            if (nomeProduto.includes(termo)) {
                produto.style.display = "block";
                algumProdutoVisivel = true;
            } else {
                produto.style.display = "none";
            }
        });

        mensagemSemResultado.style.display = algumProdutoVisivel ? "none" : "block";
    });

    // --- CARRINHO ---
    const carrinho = document.getElementById("carrinhoLateral");
    const listaCarrinho = document.getElementById("listaCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const botaoAbrirCarrinho = document.getElementById("finalizarCompra");
    const botaoFecharCarrinho = document.getElementById("fecharCarrinho");
    const botaoFinalizarWhatsApp = document.getElementById("btnFinalizar");

    let itensCarrinho = [];

    // --- ABRIR / FECHAR CARRINHO ---
    botaoAbrirCarrinho.addEventListener("click", () => {
        carrinho.classList.add("aberto");
    });

    botaoFecharCarrinho.addEventListener("click", () => {
        carrinho.classList.remove("aberto");
    });

    // --- ADICIONAR PRODUTO ---
    document.querySelectorAll(".produto button").forEach((botao) => {
        botao.addEventListener("click", () => {
            const produto = botao.closest(".produto");
            const nome = produto.querySelector("h3").textContent.trim();
            const precoTexto = produto.querySelector("p").textContent.trim();
            const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));
            const quantidadeInput = produto.querySelector(".input-qtd");
            const quantidade = quantidadeInput ? parseInt(quantidadeInput.value) || 1 : 1;

            // Adiciona ao carrinho
            itensCarrinho.push({ nome, preco, quantidade });
            atualizarCarrinho();

            // Feedback visual
            botao.textContent = "Adicionado!";
            botao.style.backgroundColor = "#25D366";
            setTimeout(() => {
                botao.textContent = "Comprar";
                botao.style.backgroundColor = "rgb(228, 167, 105)";
            }, 1500);
        });
    });

    // --- ATUALIZAR CARRINHO ---
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "";
        let total = 0;

        itensCarrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            const li = document.createElement("li");
            li.innerHTML = `
        ${item.nome} (x${item.quantidade}) - R$ ${subtotal.toFixed(2).replace(".", ",")}
        <button class="remover-item" data-index="${index}">🗑️</button>
      `;
            listaCarrinho.appendChild(li);
        });

        totalCarrinho.innerHTML = `<strong>Total:</strong> R$ ${total
      .toFixed(2)
      .replace(".", ",")}`;

        adicionarEventosRemover();
    }

    // --- REMOVER ITEM DO CARRINHO ---
    function adicionarEventosRemover() {
        document.querySelectorAll(".remover-item").forEach((botao) => {
            botao.addEventListener("click", () => {
                const index = botao.dataset.index;
                itensCarrinho.splice(index, 1);
                atualizarCarrinho();
            });
        });
    }

    // --- FINALIZAR COMPRA VIA WHATSAPP ---
    botaoFinalizarWhatsApp.addEventListener("click", () => {
        if (itensCarrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        let mensagem = "🛍️ *Pedido Morennah Boutique*%0A%0A";

        itensCarrinho.forEach((item) => {
            const subtotal = item.preco * item.quantidade;
            mensagem += `• ${item.nome} (x${item.quantidade}) - R$ ${subtotal
        .toFixed(2)
        .replace(".", ",")}%0A`;
        });

        const total = itensCarrinho.reduce(
            (soma, item) => soma + item.preco * item.quantidade,
            0
        );
        mensagem += `%0A💰 *Total:* R$ ${total
      .toFixed(2)
      .replace(".", ",")}%0A%0A`;
        mensagem += "Desejo finalizar minha compra! ❤️";

        const numero = "5511921030727";
        const url = `https://wa.me/${numero}?text=${mensagem}`;

        window.open(url, "_blank");
    });

    // --- MENU MOBILE ---
    const menuToggle = document.querySelector(".menu-toggle");
    const menuNav = document.querySelector(".menu");
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        menuNav.classList.toggle("active");
    });
});