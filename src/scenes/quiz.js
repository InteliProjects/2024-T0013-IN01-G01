class QuizGame extends Phaser.Scene {

    constructor() {
        super({
            key: 'QuizGame'
        });
    }

    preload() {
        //Carregar componentes
        this.load.image("botaoVoltarMenu", "./assets/iconeVoltarMenu.png");

        this.load.html("question1", "./src/components/questions/question1.html");
        this.load.html("contador", "./src/components/contador.html");
        this.load.html("answer1", "./src/components/questions/answer1.html");
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
        this.questao1 = this.add.dom((this.game.config.width) / 2, (this.game.config.height) / 2).createFromCache('question1').setScale(window.innerWidth * 0.0025);
        this.feedback1 = this.add.dom((this.game.config.width - (this.game.config.width + 50)) / 2, (this.game.config.height - this.game.config.height) / 2).createFromCache('answer1');
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
                //Logica do tempo esgotado
                this.resposta = "Tempo Esgotado!";
                document.getElementById("answer1").classList.remove("d-none")
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

        //Lógica de validação da resposta correta
        document.getElementById("answer1a").addEventListener("click", (event) => {
            this.resposta = "Quase lá! Tente novamente."; //texto da resposta
            this.tempoResposta = document.getElementById('contador').innerHTML; //Pegar o tempo atual que a pergunta foi respondida
            this.somerro.play(); //tocar som de erro
        });
        document.getElementById("answer1b").addEventListener("click", (event) => {
            this.resposta = "Quase lá! Tente novamente."; //texto da resposta
            this.tempoResposta = document.getElementById('contador').innerHTML; //Pegar o tempo atual que a pergunta foi respondida
            this.somerro.play(); //tocar som de erro
        });
        document.getElementById("answer1c").addEventListener("click", (event) => {
            this.resposta = "Quase lá! Tente novamente."; //texto da resposta
            this.tempoResposta = document.getElementById('contador').innerHTML; //Pegar o tempo atual que a pergunta foi respondida
            this.somerro.play(); //tocar som de erro
        });
        document.getElementById("answer1d").addEventListener("click", (event) => {
            this.resposta = "Resposta Correta!"; //texto da resposta
            this.tempoResposta = document.getElementById('contador').innerHTML; //Pegar o tempo atual que a pergunta foi respondida
            this.somacerto.play(); //tocar som de acerto
        });

        //Lógica para passar para o próximo nível
        var play = document.getElementById("nextLevel");
        play.addEventListener("click", (event) => {
            clearInterval(this.intervalo);
            this.trofeuHud.destroy();
            this.scene.start('QuizGame2', this.game);
        });

        //Botão para voltar ao menu na tela de feedback, assim que clicado ele abre o popup de confirmação
        document.getElementById("voltarMenu").addEventListener("click", (event) => {
            this.voltarMenu();
        });

        //Icone de voltar para o menu
        this.botaoVoltarMenu = this.add.image((this.game.config.width - 300) / 2, 50, "botaoVoltarMenu").setScale(0.20);
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
            this.scene.stop("QuizGame");
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
            document.getElementById("answer1").classList.remove("d-none")
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
        this.trofeusArray.splice(0, 1, trofeuValor);
        localStorage.setItem("Trofeus", JSON.stringify(this.trofeusArray));
    }
}