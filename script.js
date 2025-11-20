// Tudo roda quando o documento estiver carregado
document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       BUSCA DE PRODUTOS
    ===================== */
    const inputBusca = document.querySelector("#txtBusca");
    const produtos = document.querySelectorAll(".produto");

    const mensagemSemResultado = document.createElement("p");
    mensagemSemResultado.textContent = "Nenhum produto encontrado.";
    mensagemSemResultado.style.display = "none";
    mensagemSemResultado.style.marginTop = "10px";
    mensagemSemResultado.style.color = "red";
    document.getElementById("divBusca").appendChild(mensagemSemResultado);

    inputBusca.addEventListener("input", () => {
        const termo = inputBusca.value.toLowerCase().trim();
        let algumVisivel = false;

        produtos.forEach((produto) => {
            const nome = produto.querySelector("h3").textContent.toLowerCase();
            if (nome.includes(termo)) {
                produto.style.display = "block";
                algumVisivel = true;
            } else {
                produto.style.display = "none";
            }
        });

        mensagemSemResultado.style.display = algumVisivel ? "none" : "block";
    });


    /* =====================
       CARRINHO LATERAL
    ===================== */
    const carrinho = document.getElementById("carrinhoLateral");
    const listaCarrinho = document.getElementById("listaCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const abrirCarrinho = document.getElementById("finalizarCompra");
    const fecharCarrinho = document.getElementById("fecharCarrinho");
    const btnWhatsApp = document.getElementById("btnFinalizar");

    let itensCarrinho = [];

    abrirCarrinho.addEventListener("click", () => {
        carrinho.classList.add("active");
    });

    fecharCarrinho.addEventListener("click", () => {
        carrinho.classList.remove("active");
    });


    /* =====================
       ADICIONAR PRODUTOS
    ===================== */
    document.querySelectorAll(".produto button").forEach((botao) => {
        botao.addEventListener("click", () => {
            const produto = botao.closest(".produto");
            const nome = produto.querySelector("h3").textContent.trim();
            const precoTexto = produto.querySelector("p").textContent.replace("R$", "").trim();
            const preco = parseFloat(precoTexto.replace(",", "."));

            const qtdInput = produto.querySelector(".input-qtd");
            const quantidade = qtdInput ? parseInt(qtdInput.value) : 1;

            itensCarrinho.push({ nome, preco, quantidade });
            atualizarCarrinho();

            botao.textContent = "Adicionado!";
            botao.style.backgroundColor = "#25D366";

            setTimeout(() => {
                botao.textContent = "Comprar";
                botao.style.backgroundColor = "#ffbd59";
            }, 1500);
        });
    });


    /* =====================
       ATUALIZAR CARRINHO
    ===================== */
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "";
        let total = 0;

        itensCarrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            const li = document.createElement("li");
            li.style.marginBottom = "10px";
            li.innerHTML = `
                ${item.nome} (x${item.quantidade}) - R$ ${subtotal.toFixed(2).replace(".", ",")}
                <button class="remover-item" data-index="${index}" style="margin-left:10px;background:#ff4444;color:white;border:none;border-radius:5px;padding:3px 8px;cursor:pointer;">X</button>
            `;
            listaCarrinho.appendChild(li);
        });

        totalCarrinho.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2).replace(".", ",")}`;

        adicionarEventosRemover();
    }


    /* =====================
       REMOVER ITEM
    ===================== */
    function adicionarEventosRemover() {
        document.querySelectorAll(".remover-item").forEach((botao) => {
            botao.addEventListener("click", () => {
                const index = botao.dataset.index;
                itensCarrinho.splice(index, 1);
                atualizarCarrinho();
            });
        });
    }


    /* =====================
       FINALIZAR VIA WHATSAPP
    ===================== */
    btnWhatsApp.addEventListener("click", () => {
        if (itensCarrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        let mensagem = "🛍️ *Pedido Morennah Boutique*%0A%0A";

        itensCarrinho.forEach((item) => {
            const subtotal = item.preco * item.quantidade;
            mensagem += `• ${item.nome} (x${item.quantidade}) - R$ ${subtotal.toFixed(2).replace(".", ",")}%0A`;
        });

        const total = itensCarrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

        mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2).replace(".", ",")}%0A%0A`;
        mensagem += "Finalizar compra ❤️";

        const numero = "5511921030727";
        const url = `https://wa.me/${numero}?text=${mensagem}`;

        window.open(url, "_blank");
    });


    /* =====================
       MENU MOBILE
    ===================== */
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuToggle.classList.toggle("open");
    });
});