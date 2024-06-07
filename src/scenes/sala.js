class Sala extends Phaser.Scene {
    constructor() {
        super({
            key: 'Sala'
        });

        // Adicionar personagemJogador como propriedade da classe
        this.personagemJogador = null;
    }

    preload() {
        // Carregar componentes
        this.load.image('sala', './assets/cenas/sala.png');
        this.load.spritesheet('lavinia', './assets/personagens/lavinia.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('alex', './assets/personagens/alex.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enzo', './assets/personagens/enzo.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('caixaLegenda', './assets/caixa_legenda.png');

        this.load.spritesheet('bruna', './assets/personagens/bruna.png', { frameWidth: 64, frameHeigth: 64 });
        this.load.spritesheet('mauro', './assets/personagens/mauro.png', { frameWidth: 64, frameHeigth: 64 });
    }

    create() {
        //Verifica se o personagem foi escolhido antes de iniciar a cutscene
        if (localStorage.getItem("Personagem") == null) {
            this.scene.stop("Sala")
            this.scene.start("Personagem")
        }
        //buscar o valor do personagem escolhido (armazenado no cache)
        this.personagemEscolhido = localStorage.getItem("Personagem");

        this.finalizacaoLegendas = false;

        // Trasição de fade in para quando a cena iniciar
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        //Responsividade do background
        const background = this.add.image(0, 0, 'sala').setOrigin(0, 0);
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height;

        // Adicionar personagemJogador à cena
        this.personagemJogador = this.physics.add.sprite(window.innerWidth / 3, innerHeight, this.personagemEscolhido);
        this.personagemJogador.setScale(4);
        this.personagemJogador.body.setSize(this.personagemJogador.width * 0.5, this.personagemJogador.height * 0.8)
        this.personagemJogador.body.setOffset(this.personagemJogador.width * 0.25, this.personagemJogador.height * 0.1)
        this.personagemJogador.setCollideWorldBounds(true);

        //Animação do Enzo
        this.anims.create({
            key: 'andarenzo',
            frames: this.anims.generateFrameNumbers('enzo', { start: 27, end: 35 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'virarenzo',
            frames: this.anims.generateFrameNumbers('enzo', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });

        //Animação da Lavinia 
        this.anims.create({
            key: 'andarlavinia',
            frames: this.anims.generateFrameNumbers('lavinia', { start: 27, end: 35 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'virarlavinia',
            frames: this.anims.generateFrameNumbers('lavinia', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });

        //Animação Bruna 
        this.anims.create({
            key: 'andarbruna',
            frames: this.anims.generateFrameNumbers('bruna', { start: 27, end: 35 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'virarbruna',
            frames: this.anims.generateFrameNumbers('bruna', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });

        //Animação Alex
        this.anims.create({
            key: 'andaralex',
            frames: this.anims.generateFrameNumbers('alex', { start: 27, end: 35 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'viraralex',
            frames: this.anims.generateFrameNumbers('alex', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });

        //Animação Mauro
        this.anims.create({
            key: 'andarmauro',
            frames: this.anims.generateFrameNumbers('mauro', { start: 27, end: 35 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'virarmauro',
            frames: this.anims.generateFrameNumbers('mauro', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1
        });

        // Iniciar animação de andar
        this.personagemJogadorFim = false;

        //Sistema de legenda
        this.arrayLegendas = [
            "\n   Na sala nós também\n   estamos propensos a \n  queimaduras\n",
            "\n...especialmente devido\n ao contato \ncom as tomadas\n",
            " É muito importante\n sempre manter o cuidado\n ao andar na sala"
        ];
        this.legendaIndex = 0;
        this.legendaEstilo = {
            fill: '#000',
            font: '"Pixelify"!important',
            fontWeight: '900'
        }
        this.add.image(innerWidth / 2, 50, 'caixaLegenda').setScale(0.12);
        this.legenda = this.add.text((innerWidth / 2), 70, "", this.legendaEstilo).setOrigin(0.5).setFont('23px "Pixelify Sans"');

        this.updateLegenda(this.arrayLegendas, this.legendaIndex, this.legenda);
    }

    //Método para atualizar as legendas
    updateLegenda(arrayLegendas, legendaIndex, legenda) {
        if (legendaIndex < arrayLegendas.length) {
            legenda.setText(arrayLegendas[legendaIndex]);
            legendaIndex++;
            setTimeout(() => {
                this.updateLegenda(arrayLegendas, legendaIndex, legenda);
            }, 3000);
        } else {
            this.finalizacaoLegendas = true;
        }
    }



    update() {
        // Verificar e atualizar a posição da menininha
        if (this.personagemJogador.x === window.innerWidth / 3) {
            this.personagemJogador.setTexture(localStorage.getItem('Personagem'));
            this.personagemJogador.anims.play('andar' + localStorage.getItem('Personagem'), true);
            this.personagemJogador.setVelocityX(25); // Define a velocidade para a direita
        }

        if (this.personagemJogador.x >= game.config.width - 100) {
            this.personagemJogador.setVelocityX(0); // Define a velocidade para a esquerda
            this.personagemJogador.anims.play('virar' + localStorage.getItem('Personagem'), true);
            setTimeout(() => {
                this.personagemJogadorFim = true;
            }, 600);
        }

        if (this.personagemJogadorFim && this.finalizacaoLegendas) {
            this.QuizG();
        }
    }
    QuizG() {
        // Pular para a próxima cena
        this.scene.start('QuizGame3');
    }
}