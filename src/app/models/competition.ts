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
  export enum DanceStyle {
    ZOMBA,
    SALSA,
    Ballet,
    HIPHOP,
    TANGO,
  }
  
  export enum ExperienceLevel {
    BEGINNER,
    AMATEUR,
    ADVANCED,
    EXPERT
  }
  
  export class Dancer {
    dancerId!: number;
    firstName!: string;
    lastName!: string;
    password!: string;
    points!: number;
    danceStyle!: DanceStyle;
    experienceLevel!: ExperienceLevel;
    email!: string;
    telNum!: string;

  }
  