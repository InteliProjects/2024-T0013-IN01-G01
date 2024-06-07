class Tutorial extends Phaser.Scene {

    constructor() {
        super({
            key: 'Tutorial'
        });
    }

    preload() {
        this.load.html("tutorial", "./src/components/tutorial.html");
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

        this.add.dom((this.game.config.width - ((this.game.config.width * 0.8 + 40))) / 2, (this.game.config.height - ((this.game.config.height * 0.8 + 80))) / 2).createFromCache('tutorial');

        var closeTutorial = document.getElementById("passarTutorial");
        closeTutorial.addEventListener("click", (event) => {
            this.scene.switch('Cozinha');
        });

        this.som = this.sound.add('somConfirmar');

        var botoes = document.getElementsByClassName("btn");
        for (var i = 0; i < botoes.length; i++) {
            botoes[i].addEventListener("click", function() {
                this.som.play();
                this.som.setVolume(0.2);
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
    }
}