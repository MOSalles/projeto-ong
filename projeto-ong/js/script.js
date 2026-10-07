/* =========================================================
   PROJETO ESPERANÇA
   JAVASCRIPT PRINCIPAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MÁSCARA DE CPF
       ===================================================== */

    const campoCPF = document.getElementById("cpf");

    if (campoCPF) {

        campoCPF.addEventListener("input", function () {

            let valor = campoCPF.value;

            valor = valor.replace(/\D/g, "");

            valor = valor.substring(0, 11);

            valor = valor.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );

            valor = valor.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );

            valor = valor.replace(
                /(\d{3})(\d{1,2})$/,
                "$1-$2"
            );

            campoCPF.value = valor;

        });

    }


    /* =====================================================
       MÁSCARA DE TELEFONE
       ===================================================== */

    const campoTelefone = document.getElementById("telefone");

    if (campoTelefone) {

        campoTelefone.addEventListener("input", function () {

            let valor = campoTelefone.value;

            valor = valor.replace(/\D/g, "");

            valor = valor.substring(0, 11);


            if (valor.length <= 10) {

                valor = valor.replace(
                    /(\d{2})(\d)/,
                    "($1) $2"
                );

                valor = valor.replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );

            } else {

                valor = valor.replace(
                    /(\d{2})(\d)/,
                    "($1) $2"
                );

                valor = valor.replace(
                    /(\d{5})(\d)/,
                    "$1-$2"
                );

            }

            campoTelefone.value = valor;

        });

    }


    /* =====================================================
       MÁSCARA DE CEP
       ===================================================== */

    const campoCEP = document.getElementById("cep");

    if (campoCEP) {

        campoCEP.addEventListener("input", function () {

            let valor = campoCEP.value;

            valor = valor.replace(/\D/g, "");

            valor = valor.substring(0, 8);

            valor = valor.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );

            campoCEP.value = valor;

        });

    }


    /* =====================================================
       DATA DE NASCIMENTO
       Impede selecionar uma data futura.
       ===================================================== */

    const campoNascimento =
        document.getElementById("nascimento");


    if (campoNascimento) {

        const hoje = new Date();

        const ano = hoje.getFullYear();

        const mes =
            String(hoje.getMonth() + 1).padStart(2, "0");

        const dia =
            String(hoje.getDate()).padStart(2, "0");

        const dataAtual =
            `${ano}-${mes}-${dia}`;

        campoNascimento.max = dataAtual;

    }


    /* =====================================================
       FORMULÁRIO
       ===================================================== */

    const formulario =
        document.getElementById("formulario-voluntario");


    if (formulario) {


        formulario.addEventListener("submit", function (event) {

            event.preventDefault();


            /*
             * Primeiro verifica a validação nativa
             * dos campos HTML.
             */

            if (!formulario.checkValidity()) {

                formulario.reportValidity();

                return;

            }


            /*
             * Remove uma mensagem anterior,
             * caso exista.
             */

            const mensagemAnterior =
                document.querySelector(".mensagem-sucesso");


            if (mensagemAnterior) {

                mensagemAnterior.remove();

            }


            /*
             * Cria mensagem de sucesso.
             */

            const mensagem =
                document.createElement("div");


            mensagem.className =
                "mensagem-sucesso";


            mensagem.setAttribute(
                "role",
                "alert"
            );


            mensagem.setAttribute(
                "tabindex",
                "-1"
            );


            mensagem.innerHTML =
                "✅ Cadastro realizado com sucesso! Obrigado por querer fazer parte do Projeto Esperança.";


            /*
             * Coloca a mensagem antes do formulário.
             */

            formulario.parentNode.insertBefore(
                mensagem,
                formulario
            );


            /*
             * Leva o usuário até a mensagem.
             */

            mensagem.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            mensagem.focus();


            /*
             * Limpa os campos depois do cadastro.
             */

            formulario.reset();

        });


        /*
         * Quando o usuário clicar em "Limpar",
         * remove a mensagem de sucesso.
         */

        formulario.addEventListener("reset", function () {

            setTimeout(function () {

                const mensagem =
                    document.querySelector(".mensagem-sucesso");


                if (mensagem) {

                    mensagem.remove();

                }

            }, 10);

        });

    }


    /* =====================================================
       ANO AUTOMÁTICO DO RODAPÉ
       ===================================================== */

    const elementosAno =
        document.querySelectorAll(".ano-atual");


    const anoAtual =
        new Date().getFullYear();


    elementosAno.forEach(function (elemento) {

        elemento.textContent = anoAtual;

    });


    /* =====================================================
       ARIA-CURRENT AUTOMÁTICO
       ===================================================== */

    const linksNavegacao =
        document.querySelectorAll(".navegacao a");


    let paginaAtual =
        window.location.pathname.split("/").pop();


    /*
     * Quando o navegador estiver mostrando a raiz
     * da pasta, considera index.html.
     */

    if (
        paginaAtual === "" ||
        paginaAtual === "/"
    ) {

        paginaAtual = "index.html";

    }


    linksNavegacao.forEach(function (link) {

        const endereco =
            link.getAttribute("href");


        if (endereco === paginaAtual) {

            link.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            link.removeAttribute(
                "aria-current"
            );

        }

    });


    /* =====================================================
       ANIMAÇÃO DOS CARDS
       ===================================================== */

    const cards =
        document.querySelectorAll(
            ".card, .projeto-card, .doacao-card, .impacto-card"
        );


    /*
     * Verifica se o navegador possui suporte
     * ao IntersectionObserver.
     */

    if ("IntersectionObserver" in window) {


        const observador =
            new IntersectionObserver(
                function (entradas, observer) {

                    entradas.forEach(function (entrada) {

                        if (entrada.isIntersecting) {

                            entrada.target.classList.add(
                                "card-visivel"
                            );

                            observer.unobserve(
                                entrada.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        cards.forEach(function (card) {

            card.classList.add(
                "card-animacao"
            );

            observador.observe(card);

        });

    }


    /* =====================================================
       LINKS PLACEHOLDER
       Evita que href="#" leve o usuário para o topo.
       ===================================================== */

    const linksPlaceholder =
        document.querySelectorAll(
            'a[href="#"]'
        );


    linksPlaceholder.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });

});