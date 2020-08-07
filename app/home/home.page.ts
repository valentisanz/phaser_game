import { Component } from '@angular/core';
import { Scene1 } from './scenes/Scene1'
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  game: Phaser.Game
  config: Phaser.Types.Core.GameConfig

  constructor() {
    this.config = {
      width: innerWidth,
      height: innerHeight,
      backgroundColor: '#99ccff',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
        }
      },
      parent: 'game',
      scene: [Scene1, Scene2, Scene3]
    }
  }


  ngOnInit() {
    this.game = new Phaser.Game(this.config)
  }
}
