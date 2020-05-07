import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService, Phrase} from '../../service/data.service'
import {AuthService, Player} from '../../service/auth.service'
import {GameService, Board} from '../../service/game.service'



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public board: Observable<any>;
  public phrases: Observable<any[]>;
  public currentState:any = {};
  public player:Player;
  

  constructor(data:DataService, auth:AuthService, game:GameService) {
    let player = auth.getPlayer(); 
    this.phrases = data.getPhrases();
    this.board = game.getBoard(player.email);
   }

  ngOnInit(): void {
  }

  recievePhrase($event) {
    let phrase = $event;

    if (phrase.selected){
      this.currentState[phrase.id] = phrase;
    } else {
      delete this.currentState[phrase.id];
    }

    if (this.checkBingo()){
      alert("BINGO!")
    }
    
  }


  checkBingo(){
    let counts = {};
    let diag1 = ["b1", "i2", "n3", "g4", "o5"];
    let diag2 = ["b5", "i4", "n3", "g2", "o1"];

    let keys = Object.values(this.currentState) as Phrase[];

    keys.forEach(function(phrase) {
      var column = phrase.tid.charAt(0);
      var row= phrase.tid.charAt(1);
      if (phrase.selected){
          counts[column] = (counts[column] || 0) + 1;
          counts[row] = (counts[row] || 0) + 1;

          if (diag1.indexOf(phrase.tid) >= 0) {
              counts["diag1"] = (counts["diag1"] || 0) + 1;
          }

          if (diag2.indexOf(phrase.tid) >= 0) {
              counts["diag2"] = (counts["diag2"] || 0) + 1;
          }
      }
    });
    for (let key in counts) {
      if (counts[key] == 5){
          return true;
      } 
    }
    return false;


  }



}
