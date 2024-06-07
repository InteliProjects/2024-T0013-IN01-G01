class Welcome extends Phaser.Scene {

    constructor() {
        super({
            key: 'Welcome'
        });
    }

    preload() {
        //Carregar componentes
        this.load.html("header", "./src/components/header.html");
        this.load.html("buttons", "./src/components/initial_buttons.html");
        this.load.html("icone", "./src/components/icone_personagem.html");
        this.load.html("title", "./src/components/title.html");
        this.load.html("score", "./src/components/score.html");
        
        //carregar musica
        this.load.audio('musica', './assets/musicaJogo.mp3');
        this.load.audio('somConfirmar', './assets/Sons/somConfirmar.mp3');
        this.load.audio('somCancelar', './assets/Sons/somCancelar.mp3');
        this.load.spritesheet('fogoSprite', './assets/fogo.sprite.png', { frameWidth: 9, frameHeight: 18 });
    }

    create() {
        //Animação do fogo no background
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
        this.header = this.add.dom(30, 30).createFromCache('header').setOrigin(0.5);
        this.header = this.add.dom((this.game.config.width) / 1.27, (this.game.config.height) / 12).createFromCache('icone').setOrigin(0.5).setScale(1.3);
        this.title = this.add.dom((this.game.config.width - 180) / 2, (this.game.config.height - 400) / 2).createFromCache('title').setOrigin(0, 0);
        this.buttons = this.add.dom((this.game.config.width - 290) / 2, (this.game.config.height - 130) / 2).createFromCache('buttons').setOrigin(0, 0);
        this.score = this.add.dom((this.game.config.width - 15) / 2, this.game.config.height - 80).createFromCache('score').setOrigin(0.5);

        //Inicialização do armazenamento local dos troféus
        if (localStorage.getItem("Trofeus") == null) {
            this.fases = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            localStorage.setItem("Trofeus", JSON.stringify(this.fases));
        }

        //Inicio da musica no jogo
        this.musica = this.sound.add('musica', { loop: true });
        this.musica.setVolume(0.05);
        this.musica.play();
        this.musicaTocando = true;

        //passar para a cena dos troféus
        var showTrofeus = document.getElementById("showTrofeus");
        showTrofeus.addEventListener("click", (event) => {
            this.scene.switch('Trofeus', this.game);
        });

        //passar para a reescolha de personagem
        var reescolha = document.getElementById("iconePersonagem");
        reescolha.addEventListener("click", (event) => {
            this.som.play();
            this.scene.switch('Reescolha', this.game);
        });

        //Iniciar jogo após o clique no botão iniciar Jogo
        var play = document.getElementById("playBtn");
        play.addEventListener("click", (event) => {
            this.scene.switch('Personagem', this.game);
        });

        //Lógica para mutar e desmutar o som após o botão de som for clicado
        var pausarMusica = document.getElementById("iconesom");
        pausarMusica.addEventListener("click", (event) => {

            this.som.play();

            if (this.musicaTocando) {
                this.musica.pause();
                this.musicaTocando = false;
                document.getElementById("imagemSom").src = "./assets/iconemutado.png";
            } else {
                this.musica.play();
                this.musicaTocando = true;
                document.getElementById("imagemSom").src = "./assets/iconesom.png";
            }
        });

        this.som = this.sound.add('somConfirmar');

        var botoes = document.getElementsByClassName("btn");

        for (var i = 0; i < botoes.length; i++) {
            botoes[i].addEventListener("click", function() {
                this.som.play();
                this.som.setVolume(0.);
            }.bind(this)); // Aqui estamos vinculando o contexto para garantir que "this" se refira ao objeto correto
        }

    }


    update() {
        this.fogo.children.iterate(function(child) {
            if (child.y > innerHeight + 10) {
                var posicaox = Math.floor(Math.random() * (innerWidth - 1 + 1) + 1)
                child.setPosition(posicaox, 1)
            }
        });

        this.calcularMelhorDesempenho();
    }

    calcularMelhorDesempenho() {

        this.melhorDesempenho = parseInt(localStorage.getItem("melhorDesempenho"));
        this.progressaoTotal = this.calcularProgressaoTotal();

        if (this.melhorDesempenho > this.progressaoTotal) {
            localStorage.setItem("melhorDesempenho", this.melhorDesempenho);
        } else {
            localStorage.setItem("melhorDesempenho", this.progressaoTotal);
        }

        document.getElementById('melhorDesempenho').innerHTML = Math.round(localStorage.getItem("melhorDesempenho"));
    }

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