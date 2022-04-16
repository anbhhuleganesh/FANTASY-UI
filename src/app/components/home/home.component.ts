import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Player } from 'src/app/models/player';
import { Schedule } from 'src/app/models/schedule';
import { AuthenticationToolService } from 'src/app/services/authentication-tool.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedGameId = ''
  incorrectCaptain = true
  isSelectionDisabled = false
  selectedPerfectTeam = false
  loggedInUserId: string
  selectedPlayer!: Player
  public gameList: Array<Schedule> = []
  public gamePlayers: Array<Player> = []
  public selectedPlayers: Array<Player> = []
  public selectedCaptain: Array<Player> = []
  public selectedViceCaptain: Array<Player> = []
  public gameSelected = false
  public soFarPriceCount = 0
  constructor(
    private teamService: TeamService,
    private authenticationService: AuthenticationToolService,
    private router: Router
    ) {
      console.log('1. inside home constructor:::: ')
      this.loggedInUserId = ''
      this.checkForCookieInfo()
    }

  ngOnInit(): void {
    console.log('3. Inside ngOnInit of Home ::::::::::')
    console.log('4. :x'+this.loggedInUserId+'y:')
    if(this.loggedInUserId == ''){
      console.log('5. loggedInUser is blank')  
      this.router.navigate(['/fantasy/login'])
    }
    if(this.loggedInUserId != ''){
      console.log('6. loggedInuser is not NULL')
      this.retrieveUpcomingSchedule()
    } 
  }

  private retrieveUpcomingSchedule() {
    console.log('6. I am inside fetchScedule ::::')
    console.log(this.loggedInUserId)
    this.teamService.retrieveFutureSchedule().subscribe(data => {
      data.body?.forEach(element => {
        this.gameList.push(element)
      });
    })
  }

  public fetchTeams() {
    this.resetOptions()
    console.log(this.selectedGameId)
    this.teamService.retrievePlayersByGameId(+this.selectedGameId).subscribe(data => {
      data.body?.forEach(element => {
        this.gamePlayers.push(element)
      })
    })
  }

  public addPlayer(player: Player, ob: MatCheckboxChange) {
    if(ob.checked){
      console.log('checkbox checked')
      this.selectedPlayers.push(player)
      this.soFarPriceCount = this.soFarPriceCount + player.price!
      this.teamSelectionCheck()
    }
    else{
      console.log('checkbox unchecked')
      if(this.selectedPlayers.find(pl => pl.playerId === player.playerId)){
        this.removePlayerFromList(player.playerId!)
        this.soFarPriceCount = this.soFarPriceCount - player.price!
      }
      this.teamSelectionCheck()
      
    }
    console.log(this.selectedPlayers)
  }

  public addCaptain(player: Player, ob: MatCheckboxChange) {
    if(ob.checked) {
      this.selectedCaptain.push(player)
      this.teamSelectionCheck()
    }
    else{
      if(this.selectedCaptain.find(pl => pl.playerId === player.playerId)){
        this.removePlayerFromCaptainList(player.playerId!)
      }
      this.teamSelectionCheck()
    }
    console.log('Captain:: '+this.selectedCaptain)
  }

  private removePlayerFromCaptainList(playerId: number) {
    this.selectedCaptain.forEach((value, index) => {
      if(value.playerId== playerId)
        this.selectedCaptain.splice(index,1)
    })
  }

  public addViceCaptain(player: Player, ob: MatCheckboxChange) {
    if(ob.checked) {
      this.selectedViceCaptain.push(player)
      this.teamSelectionCheck()
    }
    else{
      if(this.selectedViceCaptain.find(pl => pl.playerId === player.playerId)){
        this.removePlayerFromViceCaptainList(player.playerId!)
      }
      this.teamSelectionCheck()
    }
    console.log('Vice Captain:: '+this.selectedViceCaptain)
  }

  private removePlayerFromViceCaptainList(playerId: number) {
    this.selectedViceCaptain.forEach((value, index) => {
      if(value.playerId== playerId)
        this.selectedViceCaptain.splice(index,1)
    })
  }

  private removePlayerFromList(playerId: number) {
    this.selectedPlayers.forEach((value, index) => {
      if(value.playerId== playerId)
        this.selectedPlayers.splice(index,1)
    })
  }

  public submitTeam() {
    if(this.loggedInUserId != '' && this.selectedPerfectTeam){
      this.createSubmitTeamRequest()
    }

  }
  private createSubmitTeamRequest() {

  }

  private teamSelectionCheck() {
    if(this.soFarPriceCount > 100 || this.selectedPlayers.length > 11 || this.selectedPlayers.length < 11 || !this.validCandVC())
      this.selectedPerfectTeam = false
    if(this.soFarPriceCount <=100 && this.selectedPlayers.length == 11 && this.validCandVC())
      this.selectedPerfectTeam = true
  }

  private validCandVC(): boolean {
    let rightCaptain = false
    let rightVC = false
    if(this.selectedCaptain.length == 1 && this.selectedViceCaptain.length == 1 && 
      this.selectedCaptain[0]?.playerId != this.selectedViceCaptain[0]?.playerId){
      this.selectedPlayers.forEach((value) => {
        if(value.playerId== this.selectedCaptain[0]?.playerId)
          rightCaptain = true
        if(value.playerId== this.selectedViceCaptain[0]?.playerId)
          rightVC = true
      })
      if(rightCaptain && rightVC)
        return true
    }
    return false
  }


  private resetOptions() {
    this.gameSelected = true
    this.gamePlayers = []
    this.selectedPerfectTeam = false
    this.selectedPlayers = []
    this.soFarPriceCount = 0
  }

  private async checkForCookieInfo() {
    await this.authenticationService.retrieveUserIdFromCookie().then((result) => {
      this.loggedInUserId = result
      console.log('2. this.loggedInUserId:::::a'+this.loggedInUserId+'b::')
    });
  }

}
