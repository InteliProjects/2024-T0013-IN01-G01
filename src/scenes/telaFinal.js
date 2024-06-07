class TelaFinal extends Phaser.Scene {
    constructor() {
        super({
            key: 'TelaFinal'
        });
    }
    preload() {
        //carregar compenente da tela final
        this.load.html("telaFinal", "./src/components/telaFinal.html");
        this.load.audio('somConfirmar', './assets/Sons/somConfirmar.mp3');
        this.load.audio('somCancelar', './assets/Sons/somCancelar.mp3');
        this.load.audio('relogio', './assets/Sons/somRelogio.mp3');
    }

    create() {
        //posicionar a tela final
        this.telaFinal = this.add.dom((this.game.config.width - (this.game.config.width + 50)) / 2, (this.game.config.height - this.game.config.height) / 2).createFromCache('telaFinal');

        //calculo e exibição da progresão
        document.getElementById("progressoTotal1").innerHTML = Math.round(this.calcularProgressaoTotal()) + "%";

        //Voltar para o menu inicial
        var menuInicial = document.getElementById("menuInicial");
        menuInicial.addEventListener("click", (event) => {
            this.scene.stop('TelaFinal')
            this.scene.switch('Welcome');
        });

        this.som1 = this.sound.add('somConfirmar');
        this.som2 = this.sound.add('somCancelar');
        // this.relogio = this.sound.add('relogio');

        var botoes = document.getElementsByClassName("btn");
        for (var i = 0; i < botoes.length; i++) {
            botoes[i].addEventListener("click", function() {
                this.som1.play();
            }.bind(this)); // Aqui estamos vinculando o contexto para garantir que "this" se refira ao objeto correto
        }

        // var botaoCancela = document.getElementById("closeTrofeus");
        // botaoCancela.addEventListener("click", (event) => {
        //     this.som1.pause();
        //     this.som2.play();
        //     this.som2.setVolume(0.8);
        // })
    }

    //Método para calcular a progressão total do jogo
    calcularProgressaoTotal() {
        this.fases = JSON.parse(localStorage.getItem("Trofeus"));
        this.progressaoTotal = 0;
        this.progressoFase = 1 / this.fases.length;
        for (let i = 0; i < this.fases.length; i++) {
            this.progressaoTotal += this.progressoFase * this.fases[i];
        }

        return Math.round(this.progressaoTotal * 100);
    }
}