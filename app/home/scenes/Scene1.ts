import * as Phaser from 'phaser'

export class Scene1 extends Phaser.Scene {
    logo: Phaser.GameObjects.Image
    playText: Phaser.GameObjects.Text

    constructor() {
        super('scene1')
    }
    preload() {
        this.load.image('logo', 'assets/images/logo.png')
    }
    create() {
        this.add.text(innerWidth / 3, innerHeight / 8, 'BIRDY', { fontSize: 50, fill: 'orange' })
        this.playText = this.add.text(innerWidth / 5.5, innerHeight / 2, 'PLAY GAME', { fontSize: 50, backgroundColor: 'red' }).setInteractive()

        this.playText.on('pointerdown', () => {
            this.scene.start('scene2')
        }, this)
        this.add.sprite(innerWidth / 2, innerHeight / 3, 'logo')

    }
    update() {

    }
}
