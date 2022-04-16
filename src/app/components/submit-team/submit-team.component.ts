import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-submit-team',
  templateUrl: './submit-team.component.html',
  styleUrls: ['./submit-team.component.css']
})
export class SubmitTeamComponent implements OnInit {

  players!: Array<Player>
  gameId!: number
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.retrieveTeamPlayers()
  }

  private retrieveTeamPlayers() {
    this.teamService.retrievePlayersByGameId(this.gameId).subscribe(players => this.players)
  }

}
