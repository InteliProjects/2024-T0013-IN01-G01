class Trofeus extends Phaser.Scene {

    constructor() {
        super({
            key: 'Trofeus'
        });
    }

    preload() {
        //Carregar componentes
        this.load.html("trofeus", "./src/components/trofeus.html");
        this.load.spritesheet('fogoSprite', './assets/fogo.sprite.png', { frameWidth: 9, frameHeight: 18 });
        this.load.audio('somConfirmar', './assets/Sons/somConfirmar.mp3');
        this.load.audio('somCancelar', './assets/Sons/somCancelar.mp3');
    }

    create() {

        this.anims.create({
            key: 'descida',
            frames: this.anims.generateFrameNumbers('fogoSprite', { start: 0, end: 9 }),
            frameRate: 5,
            repeat: -1
        });

        this.fogo = this.physics.add.group({
            key: 'fogoSprite',
            repeat: 6,
            setXY: { x: 0, y: 0, stepX: 80 }
        });

        this.fogo.children.iterate(function(child) {
            var posicaox = Math.floor(Math.random() * (innerWidth - 1 + 1) + 1)
            child.setPosition(posicaox, 1)
            child.setScale(4).setVelocityY(Phaser.Math.Between(100, 200));
            child.anims.play('descida', true);
        });

        //Disposição dos componentes na tela
        this.trofeus = this.add.dom((this.game.config.width - ((this.game.config.width * 0.8 + 40))) / 2, (this.game.config.height - ((this.game.config.height * 0.8 + 80))) / 2).createFromCache('trofeus');

        var closeTrofeus = document.getElementById("closeTrofeus");
        closeTrofeus.addEventListener("click", (event) => {
            this.scene.switch('Welcome');
        });

        var botao1 = document.getElementById("botaoFase1");
        botao1.addEventListener("click", (event) => {
            this.scene.start('QuizGame');
        });

        var botao2 = document.getElementById("botaoFase2");
        botao2.addEventListener("click", (event) => {
            this.scene.start('QuizGame2');
        });

        var botao3 = document.getElementById("botaoFase3");
        botao3.addEventListener("click", (event) => {
            this.scene.start('QuizGame3');
        });

        var botao4 = document.getElementById("botaoFase4");
        botao4.addEventListener("click", (event) => {
            this.scene.start('QuizGame4');
        });

        var botao5 = document.getElementById("botaoFase5");
        botao5.addEventListener("click", (event) => {
            this.scene.start('QuizGame5');
        });

        var botao6 = document.getElementById("botaoFase6");
        botao6.addEventListener("click", (event) => {
            this.scene.start('QuizGame6');
        });

        var botao7 = document.getElementById("botaoFase7");
        botao7.addEventListener("click", (event) => {
            this.scene.start('QuizGame7');
        });

        var botao8 = document.getElementById("botaoFase8");
        botao8.addEventListener("click", (event) => {
            this.scene.start('QuizGame8');
        });

        var botao9 = document.getElementById("botaoFase9");
        botao9.addEventListener("click", (event) => {
            this.scene.start('QuizGame9');
        });

        var botao10 = document.getElementById("botaoFase10");
        botao10.addEventListener("click", (event) => {
            this.scene.start('QuizGame10');
        });

        this.som1 = this.sound.add('somConfirmar');
        this.som2 = this.sound.add('somCancelar');

        var botoes = document.getElementsByClassName("btn");
        for (var i = 0; i < botoes.length; i++) {
            botoes[i].addEventListener("click", function() {
                this.som1.play();
            }.bind(this)); // Aqui estamos vinculando o contexto para garantir que "this" se refira ao objeto correto
        }

        var botaoCancela = document.getElementById("closeTrofeus");
        botaoCancela.addEventListener("click", (event) => {
            this.som1.pause();
            this.som2.play();
            this.som2.setVolume(0.8);
        })
    }

    update() {

        this.fogo.children.iterate(function(child) {
            if (child.y > innerHeight + 10) {
                var posicaox = Math.floor(Math.random() * (innerWidth - 1 + 1) + 1)
                child.setPosition(posicaox, 1)
            }
        });

        //definindo qual o trofeu é de cada fase, considerando o loop
        this.trofeusArray = JSON.parse(localStorage.getItem("Trofeus"));
        for (let i = 0; i < this.trofeusArray.length; i++) {
            if (this.trofeusArray[i] == 1) {
                this.imgTrofeuSrc = "./assets/trofeu-ouro.png"
            } else if (this.trofeusArray[i] == 0.5) {
                this.imgTrofeuSrc = "./assets/trofeu-prata.png"
            } else if (this.trofeusArray[i] == 0.25) {
                this.imgTrofeuSrc = "./assets/trofeu-bronze.png"
            } else if (this.trofeusArray[i] == 0.01) {
                this.imgTrofeuSrc = "./assets/trofeu-quebrado.png"
            } else {
                this.imgTrofeuSrc = "./assets/trofeu-bloqueado.png"
            }
            document.getElementById("imgTrofeu" + i).src = this.imgTrofeuSrc
        }
    }
}