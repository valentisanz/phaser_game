import * as Phaser from 'phaser'

export class Scene3 extends Phaser.Scene {
    playText: Phaser.GameObjects.Text

    constructor() {
        super('scene3')
    }
    preload() {

    }
    create() {
        let lastScore = parseInt(localStorage.getItem('lastScore'))
        let scores = JSON.parse(localStorage.getItem('scores'))

        let posY = 450
        this.add.text(innerWidth / 3.5, innerHeight - posY - 20, `TOP SCORES`, { fontSize: 30, fill: 'yellow' })

        if (scores) {
            if (scores.length < 5) {
                scores.push(lastScore)
                localStorage.setItem('scores', JSON.stringify(scores))
            } else {
                scores.sort()
                for (let i = 0; i < scores.length; i++) {
                    if (scores[i] < lastScore) {
                        scores[i] = lastScore
                        i = scores.length
                        scores.sort()
                    }
                }
                localStorage.setItem('scores', JSON.stringify(scores))
            }
            scores.sort(function (a, b) {
                return b - a;
            })
            for (let i = 0; i < scores.length; i++) {
                this.add.text(innerWidth / 3, innerHeight - (posY - (i + 1) * 30), `${i + 1}. - ${scores[i]}`,
                    { fontSize: 30, fill: 'yellow' })
            }

        } else {
            scores = []
            scores.push(lastScore)
            localStorage.setItem('scores', JSON.stringify(scores))
            this.add.text(innerWidth / 3, innerHeight - (posY - (0 + 1) * 30), `1. - ${scores[0]}`,
                { fontSize: 30, fill: 'yellow' })
        }
        this.add.text(innerWidth / 5.5, innerHeight / 8, 'GAME OVER', { fontSize: 50, fill: 'orange' })
        this.playText = this.add.text(innerWidth / 6.5, innerHeight / 4, 'PLAY AGAIN', { fontSize: 50, backgroundColor: 'red' }).setInteractive()

        this.playText.on('pointerdown', () => {
            this.scene.start('scene2')
        }, this)

    }
    update() {

    }
}
