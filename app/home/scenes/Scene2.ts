import * as Phaser from 'phaser'

export class Scene2 extends Phaser.Scene {
    bird: Phaser.Physics.Arcade.Sprite

    arrowLeft: Phaser.GameObjects.Image
    arrowRight: Phaser.GameObjects.Image

    redBalloon: Phaser.Physics.Arcade.Sprite
    blueBalloon: Phaser.Physics.Arcade.Sprite
    greenBalloon: Phaser.Physics.Arcade.Sprite
    starBalloon: Phaser.Physics.Arcade.Sprite

    scoreText: Phaser.GameObjects.Text
    score: number

    ost: Phaser.Sound.BaseSound
    balloonSound: Phaser.Sound.BaseSound
    starSound: Phaser.Sound.BaseSound

    timeText: Phaser.GameObjects.Text
    timeLeft: number

    gameOver: boolean
    timerEvent: any

    constructor() {
        super('scene2')
    }
    spawnRedBalloon() {
        let rand = (Math.floor(Math.random() * 360) + 30)
        this.redBalloon = this.physics.add.sprite(rand, 755, 'redBalloon')
        this.redBalloon.setVelocityY(-100)

        this.physics.add.collider(this.bird, this.redBalloon, () => {
            this.balloonSound.play()
            this.bird.setVelocityY(0)
            this.score = this.score + 1
            if (this.bird.body.velocity.x < 0) this.bird.setVelocityX(-100)
            if (this.bird.body.velocity.x > 0) this.bird.setVelocityX(100)
            if (this.bird.body.velocity.x === 0) this.bird.setVelocityX(0)

            this.redBalloon.destroy()
        })
        this.timerEvent = this.time.delayedCall(8500, this.spawnRedBalloon, [], this);

    }
    spawnBlueBalloon() {
        let rand = (Math.floor(Math.random() * 360) + 30)
        this.blueBalloon = this.physics.add.sprite(rand, 755, 'blueBalloon')
        this.blueBalloon.setVelocityY(-150)

        this.physics.add.collider(this.bird, this.blueBalloon, () => {
            this.balloonSound.play()
            this.bird.setVelocityY(0)
            this.score = this.score + 2
            if (this.bird.body.velocity.x < 0) this.bird.setVelocityX(-100)
            if (this.bird.body.velocity.x > 0) this.bird.setVelocityX(100)
            if (this.bird.body.velocity.x === 0) this.bird.setVelocityX(0)
            this.blueBalloon.destroy()

        })
        this.timerEvent = this.time.delayedCall(10000, this.spawnBlueBalloon, [], this);

    }
    spawnGreenBalloon() {
        let rand = (Math.floor(Math.random() * 360) + 30)
        this.greenBalloon = this.physics.add.sprite(rand, 755, 'greenBalloon')
        this.greenBalloon.setVelocityY(-200)

        this.physics.add.collider(this.bird, this.greenBalloon, () => {
            this.balloonSound.play()
            this.bird.setVelocityY(0)
            this.score = this.score + 3
            if (this.bird.body.velocity.x < 0) this.bird.setVelocityX(-100)
            if (this.bird.body.velocity.x > 0) this.bird.setVelocityX(100)
            if (this.bird.body.velocity.x === 0) this.bird.setVelocityX(0)
            this.greenBalloon.destroy()

        })
        this.timerEvent = this.time.delayedCall(12000, this.spawnGreenBalloon, [], this);

    }
    spawnStarBalloon() {
        let rand = (Math.floor(Math.random() * 360) + 30)
        this.starBalloon = this.physics.add.sprite(rand, 755, 'starBalloon')
        this.starBalloon.setVelocityY(-220)

        this.physics.add.collider(this.bird, this.starBalloon, () => {
            this.starSound.play()
            this.bird.setVelocityY(0)
            this.score = this.score + 5
            if (this.bird.body.velocity.x < 0) this.bird.setVelocityX(-200)
            if (this.bird.body.velocity.x > 0) this.bird.setVelocityX(200)
            if (this.bird.body.velocity.x === 0) this.bird.setVelocityX(0)
            this.starBalloon.destroy()
            this.timerEvent = this.time.delayedCall(5000, () => {
                this.bird.setVelocityX(100)
            }, [], this);

        })
        this.timerEvent = this.time.delayedCall(20000, this.spawnStarBalloon, [], this);

    }
    preload() {
        this.load.image('arrowLeft', 'assets/images/arrow-left.png')
        this.load.image('arrowRight', 'assets/images/arrow-right.png')
        this.score = 0
        this.load.image('redBalloon', 'assets/images/balloon-red.png')
        this.load.image('blueBalloon', 'assets/images/balloon-blue.png')
        this.load.image('greenBalloon', 'assets/images/balloon-green.png')
        this.load.image('starBalloon', 'assets/images/balloon-star.png')

        this.load.audio('ost', 'assets/sounds/ost.mp3')
        this.load.audio('balloonSound', 'assets/sounds/balloon.mp3')
        this.load.audio('starSound', 'assets/sounds/star.mp3')

        this.load.spritesheet('bird', 'assets/images/birdsprite.png',
            { frameWidth: 35, frameHeight: 33 }
        )


    }
    create() {
        this.scoreText = this.add.text(20, 20, 'SCORE: ', { fontSize: 25 })
        this.timeText = this.add.text(20, 50, 'TIME LEFT: ', { fontSize: 15 })
        let scores = JSON.parse(localStorage.getItem('scores'))
        let bestScore = 0
        scores
            ? bestScore = Math.max(...scores)
            : bestScore = 0
        this.add.text(250, 25, `MAX SCORE: ${bestScore}`, { fontSize: 15, fill: 'yellow' })
        this.timeLeft = 3600 
        this.gameOver = false

        this.arrowLeft = this.add.image(innerWidth / 2 - 170, innerHeight - 50, 'arrowLeft').setInteractive()
        this.arrowRight = this.add.image(innerWidth - 35, innerHeight - 50, 'arrowRight').setInteractive()

        this.bird = this.physics.add.sprite(innerWidth / 2, innerHeight / 5, 'bird')
        this.bird.setCollideWorldBounds(true)

        this.spawnRedBalloon()
        this.time.delayedCall(10000, this.spawnBlueBalloon, [], this);
        this.time.delayedCall(12000, this.spawnGreenBalloon, [], this);
        this.time.delayedCall(20000, this.spawnStarBalloon, [], this);

        this.anims.create({
            key: 'fly-right',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 13 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'fly-left',
            frames: this.anims.generateFrameNumbers('bird', { start: 14, end: 27 }),
            frameRate: 10,
            repeat: -1
        })
        this.bird.play('fly-right')
        this.arrowLeft.on('pointerdown', () => {
            this.bird.play('fly-left')
            this.bird.setVelocityX(-100)
        }, this)
        this.arrowRight.on('pointerdown', () => {
            this.bird.play('fly-right')
            this.bird.setVelocityX(100)
        }, this)

        this.ost = this.sound.add('ost')
        this.balloonSound = this.sound.add('balloonSound')
        this.starSound = this.sound.add('starSound')
        this.ost.play()

    }
    update() {
        //y: 146.2
        //x: 17.5 - 393.5
        if (this.redBalloon && this.redBalloon.y <= -50) {
            this.redBalloon.destroy()
        }
        if (this.blueBalloon && this.blueBalloon.y <= -50) {
            this.blueBalloon.destroy()
        }
        if (this.greenBalloon && this.greenBalloon.y <= -50) {
            this.greenBalloon.destroy()
        }
        if (this.starBalloon && this.starBalloon.y <= -50) {
            this.starBalloon.destroy()
        }
        this.scoreText.setText('SCORE: ' + this.score)
        this.timeLeft = this.timeLeft - 1
        var secondsLeft = Math.floor(this.timeLeft / 60);

        this.timeText.setText(`TIME LEFT: ${secondsLeft}s`)
        if (secondsLeft === 0) {
            localStorage.setItem('lastScore', this.score.toString())
            this.gameOver = true
            this.ost.stop()
            this.scene.start('scene3')
        }

        if (!this.ost.isPlaying && !this.gameOver) this.ost.play()
    }

}