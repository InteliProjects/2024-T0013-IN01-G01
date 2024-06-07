class QuizGame2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'QuizGame2'
        });
    }

    preload() {
        //Carregar componentes
        this.load.image("botaoVoltarMenu", "./assets/iconeVoltarMenu.png");

        this.load.html("question2", "./src/components/questions/question2.html");
        this.load.html("contador", "./src/components/contador.html");
        this.load.html("answer2", "./src/components/questions/answer2.html");
        this.load.html("confirmeVoltarMenu", "./src/components/confVoltarMenu.html");

        this.load.audio('somacerto', './assets/Sons/SomAcerto.mp3');
        this.load.audio('somerro', './assets/Sons/ErroSom.wav');
        this.load.audio('relogio', './assets/Sons/somRelogio.mp3');
        this.load.audio('somConfirmar', './assets/Sons/somConfirmar.mp3');
        this.load.audio('somCancelar', './assets/Sons/somCancelar.mp3');

        this.load.image("ouro", "./assets/trofeu-ouro.png");
        this.load.image("prata", "./assets/trofeu-prata.png");
        this.load.image("bronze", "./assets/trofeu-bronze.png");
        this.load.image("quebrado", "./assets/trofeu-quebrado.png");
    }

    create() {
        //Disposição dos componentes na tela
        this.questao2 = this.add.dom((this.game.config.width) / 2, (this.game.config.height) / 2).createFromCache('question2').setScale(window.innerWidth * 0.0025);
        this.feedback2 = this.add.dom((this.game.config.width - (this.game.config.width + 50)) / 2, (this.game.config.height - this.game.config.height) / 2).createFromCache('answer2');
        this.contador = this.add.dom((this.game.config.width - 55), 25).createFromCache('contador').setScale(window.innerWidth * 0.0025);
        this.popupConfirmarVoltarMenu = this.add.dom(0, 0).createFromCache('confirmeVoltarMenu');

        this.tempoResposta = false;
        this.resposta = false;

        //adicao dos sons de acerto e erro
        this.somacerto = this.sound.add('somacerto');
        this.somerro = this.sound.add('somerro');
        this.somRelogio = this.sound.add('relogio');
        this.som = this.sound.add('somConfirmar');
        this.som2 = this.sound.add('somCancelar');

        //posicionamento do troféu na HUD
        this.trofeuHud = this.add.image((this.game.config.width - 90), 60, 'ouro').setScale(window.innerWidth * 0.0002);
        this.trofeuStatus;

        //Lógica do contador
        this.intervalo = setInterval(() => {
            if (document.getElementById('contador').innerHTML == 0 && document.getElementById('textAnswer').innerHTML == "") {
                this.resposta = "Tempo Esgotado!";
                document.getElementById("answer2").classList.remove("d-none")
                document.getElementById("textAnswer").innerHTML = this.resposta;
                document.getElementById('contador').classList.add("d-none");

                document.getElementById("imgTrofeu").src = './assets/trofeu-quebrado.png';
                document.getElementById("textoTrofeu").innerHTML = 'Poxa! Você conquistou um troféu quebrado.';

                this.somerro.play();

                this.somRelogio.stop();

                //Guarda o troféu de bronze a fase
                this.armazenaTrofeu(0.01);
                clearInterval(this.intervalo);
            } else {
                document.getElementById('contador').innerHTML -= 1;
                this.tempoContador = document.getElementById('contador').innerHTML;
                // adição do status de troféu ao HUD
                if (this.tempoContador >= 20) {
                    // adição de troféu de ouro
                    this.trofeuStatus = "ouro";

                } else if (this.tempoContador < 20 && this.tempoContador > 5) {
                    // adição de troféu de prata
                    this.trofeuStatus = "prata";
                } else {
                    // adição de troféu de bronze
                    this.trofeuStatus = "bronze";
                    this.somRelogio.play();
                }

                //Atualiza a imagem do trofeu na hud
                this.trofeuHud.setTexture(this.trofeuStatus);
            }
        }, 1000);

        // Lógica de validação da resposta selecionada
        document.getElementById("answer2a").addEventListener("click", (event) => {
            this.resposta = "Quase lá! Tente novamente."; //texto da resposta
            this.tempoResposta = document.getElementById('contador').innerHTML; //Pegar o tempo atual que a pergunta foi respondida
            this.somerro.play(); //tocar som de erro
        });
        document.getElementById("answer2b").addEventListener("click", (event) => {
            this.resposta = "Quase lá! Tente novamente."; //texto da resposta
            this.tempoResposta = document.getElementById('contador').innerHTML; //Pegar o tempo atual que a pergunta foi respondida
            this.somerro.play(); //tocar som de erro
        });
        document.getElementById("answer2c").addEventListener("click", (event) => {
            this.resposta = "Resposta Correta!"; //texto da resposta
            this.tempoResposta = document.getElementById('contador').innerHTML; //Pegar o tempo atual que a pergunta foi respondida
            this.somacerto.play(); //tocar som de acerto
        });
        document.getElementById("answer2d").addEventListener("click", (event) => {
            this.resposta = "Quase lá! Tente novamente."; //texto da resposta
            this.tempoResposta = document.getElementById('contador').innerHTML; //Pegar o tempo atual que a pergunta foi respondida
            this.somerro.play(); //tocar som de erro
        });

        //Lógica para passar para a próxima cutscene
        var play = document.getElementById("nextLevel");
        play.addEventListener("click", (event) => {
            clearInterval(this.intervalo);
            this.trofeuHud.destroy();
            this.scene.start('Sala'); //troca para nova cena (quiz ou cenário)
        });

        //Definir a imagem do quiz com base no personagem selecionado pelo jogador
        this.personagemEscolhido = localStorage.getItem("Personagem");
        switch (this.personagemEscolhido) {
            case 'lavinia':
                document.getElementById("img-quiz2").src = './assets/questions/question1/question1_lavinia.png';
                break;
            case 'alex':
                document.getElementById("img-quiz2").src = './assets/questions/question1/question1_alex.png';
                break;
            case 'enzo':
                document.getElementById("img-quiz2").src = './assets/questions/question1/question1_enzo.png';
                break;
            case 'mauro':
                document.getElementById("img-quiz2").src = './assets/questions/question1/question1_mauro.png';
                break;
            case 'bruna':
                document.getElementById("img-quiz2").src = './assets/questions/question1/question1_bruna.png';
                break;
            default:
                document.getElementById("img-quiz2").src = './assets/questions/question1/question1_lavinia.png';
                break;
        }

        //Icone de voltar para o menu
        this.botaoVoltarMenu = this.add.image((this.game.config.width - 300) / 2, 55, "botaoVoltarMenu").setScale(window.innerWidth * 0.0005);
        this.botaoVoltarMenu.setInteractive();
        this.botaoVoltarMenu.on("pointerup", this.voltarMenu, this);

        //Botão cancelar do popup de confirmação clicado, assim fechando o popup
        document.getElementById("openVoltar").addEventListener("click", (event) => {
            this.som2.play();
            document.getElementById("overlayPopup").classList.add("d-none")
            document.getElementById("popupConfirmarMenu").classList.add("d-none")
        });

        //Botão de confirmação do popup clicado, assim voltando para o menu
        document.getElementById("openConfirmar").addEventListener("click", (event) => {
            this.som.play();
            document.getElementById("overlayPopup").classList.add("d-none")
            document.getElementById("popupConfirmarMenu").classList.add("d-none")
            this.scene.switch("Welcome");
            clearInterval(this.intervalo);
            this.scene.stop("QuizGame2");
        });

        //Botão para voltar ao menu na tela de feedback, assim que clicado ele abre o popup de confirmação
        document.getElementById("voltarMenu").addEventListener("click", (event) => {
            this.voltarMenu();
        });


    }

    //Abre o popup de Confirmação para voltar ao menu
    voltarMenu() {
        document.getElementById("overlayPopup").classList.remove("d-none")
        document.getElementById("popupConfirmarMenu").classList.remove("d-none")
    }


    update() {
            //Verifica se foi respondido
            if (this.resposta != false) {
                this.somRelogio.stop();
                clearInterval(this.intervalo);
                document.getElementById("answer2").classList.remove("d-none")
                document.getElementById("textAnswer").innerHTML = this.resposta;
                document.getElementById('contador').classList.add("d-none");
            }

            // logica de qual trofeu sera recebido pelo jogador
            if (this.tempoResposta != false) {
                if (this.tempoResposta >= 20 && this.resposta == "Resposta Correta!") {
                    // definição do atributo para o troféu de ouro
                    document.getElementById("imgTrofeu").src = './assets/trofeu-ouro.png';
                    document.getElementById("spanTrofeu").innerHTML = 'ouro';
                    this.trofeuValor = 1;
                } else if (this.tempoResposta < 20 && this.tempoResposta > 5 && this.resposta == "Resposta Correta!") {
                    // definição do atributo para o troféu de prata
                    document.getElementById("imgTrofeu").src = './assets/trofeu-prata.png';
                    document.getElementById("spanTrofeu").innerHTML = 'prata';
                    this.trofeuValor = 0.5;
                } else if (this.tempoResposta > 5 && this.resposta == "Resposta Correta!") {
                    // definição do atributo para o troféu de bronze
                    document.getElementById("imgTrofeu").src = './assets/trofeu-bronze.png';
                    document.getElementById("spanTrofeu").innerHTML = 'bronze';
                    this.trofeuValor = 0.25;
                } else {
                    // definição do atributo para o troféu quebrado
                    document.getElementById("imgTrofeu").src = './assets/trofeu-quebrado.png';
                    document.getElementById("textoTrofeu").innerHTML = 'Poxa! Você conquistou um troféu quebrado.';
                    this.trofeuValor = 0.01;
                }
                this.armazenaTrofeu(this.trofeuValor);
            }
        }
        //armazena trofeu
    armazenaTrofeu(trofeuValor) {
        this.trofeusArray = JSON.parse(localStorage.getItem("Trofeus"));
        this.trofeusArray.splice(1, 1, trofeuValor);
        localStorage.setItem("Trofeus", JSON.stringify(this.trofeusArray));
    }
}