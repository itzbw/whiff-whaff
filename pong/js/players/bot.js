import { Player } from "./player.js";
import { CHECK_BALL_TIMER } from '../constants/constants.js';
import { BOARD, BOARD_LENGTH, DISTANCE_TO_BOARD } from '../constants/board.js';

export class Bot extends Player{
    /**
     * @constructs Bot
     * @param Array  Array of Canvas Context
     * @param Number Initial x coordinate of Player
     * @param Number Initial x coordinate of Player
     * @param Number Initial x coordinate of Player
     * @param Number Player Id
     * @param String Player Name
     * @param Object Ball Object
     */
    constructor(ctx, x, y, z, id, name, ball){
        super(ctx, x, y ,z, id, name);
        this.ball = ball;
        this.dX = 0;
        this.dY = 0;
        this.dZ = 0;   
        this.currentBallPos = this.ball.position;
        setInterval(this.moveBot.bind(this), CHECK_BALL_TIMER);
    }

    neededChange(){
        this.currentBallPos = this.ball.position;
        this.dX = 0;
        this.dY = 0;
        this.dX = (Math.random()/2 +0.3) * (this.batPosition.x - this.currentBallPos.x);
        if (this.ball.position.z > DISTANCE_TO_BOARD + BOARD_LENGTH/2) {
            this.dY= (this.currentBallPos.y - this.batPosition.y) ;
        }
    }

    moveBot(){
        this.neededChange();
        this.batPosition.x -= this.dX;
        this.batPosition.y += this.dY;
        if (this.batPosition.y > BOARD.HEIGHT){
            this.batPosition.y -= 2* (this.batPosition.y - BOARD.HEIGHT)
        }
        if (this.batPosition.y < BOARD.HEIGHT/2){
            this.batPosition.y = BOARD.HEIGHT;
        }
    }

    serve(){
        setTimeout(()=>{
            this.ball.dZ = Math.random()*2+3;
            this.ball.dX = Math.random()*2-1;
            this.ball.dY = 0;
            this.ball.isBeingServed = false;
            this.ball.lastPlayerTouched = this.playerId;
            setTimeout(()=>{this.serveState = false;},200)
        },1000)
    }
}