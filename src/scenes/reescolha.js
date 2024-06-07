class Reescolha extends Phaser.Scene {

    constructor() {
        super({
            key: 'Reescolha'
        });
    }

    preload() {
        this.load.spritesheet('lavinia', './assets/personagens/lavinia.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('alex', './assets/personagens/alex.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enzo', './assets/personagens/enzo.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('fogoSprite', './assets/fogo.sprite.png', { frameWidth: 9, frameHeight: 18 });
        this.load.spritesheet('bruna', './assets/personagens/bruna.png', { frameWidth: 64, frameHeigth: 64 });
        this.load.spritesheet('mauro', './assets/personagens/mauro.png', { frameWidth: 64, frameHeigth: 64 });
        this.load.audio('somConfirmar', './assets/Sons/somConfirmar.mp3');
    }

    create() {

        this.som = this.sound.add('somConfirmar');

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

        // Adição de texto
        this.textoEscolha = this.add.text((innerWidth / 2), 100, "Escolha um novo personagem!", { fill: '#000' }).setOrigin(0.5).setFont('25px "Montserrat"');
        this.textoEscolha2 = this.add.text((innerWidth / 2), 130, "(clique no personagem desejado)", { fill: '#000' }).setOrigin(0.5).setFont('20px "Montserrat"');

        // Definição de armazenamento local
        if (localStorage.getItem("Personagem") != null) {}

        // Adicionar lavinia à cena
        this.lavinia = this.add.sprite(window.innerWidth / 4, (innerHeight / 2) - 20, 'lavinia').setInteractive(this.input.makePixelPerfect());
        this.lavinia.setScale(3); //     // this.lavinia.setOffset(this.lavinia.width * 0.25, this.lavinia.height * 0.1)

        // Adicionar alex à cena
        this.alex = this.add.sprite(window.innerWidth / 2, (innerHeight / 2) - 20, 'alex').setInteractive(this.input.makePixelPerfect());
        this.alex.setScale(3);

        // Adicionar enzo à cena
        this.enzo = this.add.sprite((window.innerWidth * 0.8) - 10, (innerHeight / 2) - 20, 'enzo').setInteractive(this.input.makePixelPerfect());
        this.enzo.setScale(3);

        // Adicionar bruna à cena
        this.bruna = this.add.sprite(window.innerWidth * 0.66, innerHeight * 0.7, 'bruna').setInteractive(this.input.makePixelPerfect());
        this.bruna.setScale(3);

        this.mauro = this.add.sprite((window.innerWidth * 0.33) + 20, innerHeight * 0.7, 'mauro').setInteractive(this.input.makePixelPerfect());
        this.mauro.setScale(3);

        // Comando de animação de lavinia
        this.anims.create({
            key: 'laviniaAndar',
            frames: this.anims.generateFrameNumbers('lavinia', { start: 18, end: 26 }),
            frameRate: 10,
            repeat: -1
        });

        // Comando de animação de alex
        this.anims.create({
            key: 'alexAndar',
            frames: this.anims.generateFrameNumbers('alex', { start: 18, end: 26 }),
            frameRate: 10,
            repeat: -1
        });

        // Comando de animação de enzo
        this.anims.create({
            key: 'enzoAndar',
            frames: this.anims.generateFrameNumbers('enzo', { start: 18, end: 26 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'brunaAndar',
            frames: this.anims.generateFrameNumbers('bruna', { start: 18, end: 26 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'mauroAndar',
            frames: this.anims.generateFrameNumbers('mauro', { start: 18, end: 26 }),
            frameRate: 10,
            repeat: -1
        });

        // Configurar o que lavinia deve fazer ao ser clicada
        this.lavinia.on("pointerup", () => this.personagemNovo('lavinia'));
        // Configurar o que alex deve fazer ao ser clicado
        this.alex.on("pointerup", () => this.personagemNovo('alex'));
        // Configurar o que enzo deve fazer ao ser clicado
        this.enzo.on("pointerup", () => this.personagemNovo('enzo'));
        this.mauro.on("pointerup", () => this.personagemNovo('mauro'));
        this.bruna.on("pointerup", () => this.personagemNovo('bruna'));

        // Verificar e atualizar a posição de lavinia
        this.lavinia.anims.play('laviniaAndar', true);
        this.alex.anims.play('alexAndar', true);
        this.enzo.anims.play('enzoAndar', true);
        this.bruna.anims.play('brunaAndar', true);
        this.mauro.anims.play('mauroAndar', true);

        this.add.text(this.lavinia.x + 38, this.lavinia.y - 80, 'Lavinia', { fill: '#000000' }).setOrigin(1).setFont('25px "Pixelify Sans"');
        this.add.text(this.alex.x + 25, this.alex.y - 70, 'Alex', { fill: '#000000' }).setOrigin(1).setFont('25px "Pixelify Sans"');
        this.add.text(this.bruna.x + 35, this.bruna.y + 100, 'Bruna', { fill: '#000000' }).setOrigin(1).setFont('25px "Pixelify Sans"');
        this.add.text(this.mauro.x + 33, this.mauro.y + 100, 'Mauro', { fill: '#000000' }).setOrigin(1).setFont('25px "Pixelify Sans"');
        this.add.text(this.enzo.x + 30, this.enzo.y - 75, 'Enzo', { fill: '#000000' }).setOrigin(1).setFont('25px "Pixelify Sans"');
    }

    personagemNovo(personagem) {
        let personagemNovo;

        this.som.play();

        switch (personagem) {
            case 'lavinia':
                personagemNovo = 'lavinia';
                break;
            case 'alex':
                personagemNovo = 'alex';
                break;
            case 'enzo':
                personagemNovo = 'enzo';
                break;
            case 'mauro':
                personagemNovo = 'mauro';
                break;
            case 'bruna':
                personagemNovo = 'bruna';
                break;
            default:
                personagemNovo = 'alex';
                break;
        }

        //Salvar o personagem no locaStorage
        if (personagemNovo) {
            localStorage.setItem("Personagem", personagemNovo);
        }

        this.scene.switch("Welcome");
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