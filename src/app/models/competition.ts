export class Competition {
    competitionID!: number;
    competitionName!: string;
    danceCategory!: string;
    startDate!: Date;
    endDate!: Date;
    location!: string;
    rating!: number;
    description!:string;
    prize!: string;
    maxParticipants!: number;
    status!: string;
    participations!: Participate[];
    jurymanagers!: JuryManager[];
  }
  
  export class Participate {
    idParticipate!: number;
    competitionRank!: number;
    //dancerParticipated: Dancer;
    competition!: Competition;
  }
  
  export class JuryManager {
    juryID!: number;
    expertiseArea!: string;
    diploma!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    telNumber!: string;
    competitionsManagedByJuries!: Competition[];
  }
  