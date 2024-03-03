export class Event {
    eventID!: number;
    eventName!: string;
    startDate!: Date;
    location!: string;
    maxParticipants!: number;
    description!:string;
    users?: User[];
    dancers?: Dancer[];
    eventsMakers?: Dancer[];
    
  }
  
  export class User {
    // Define the properties of the User entity if not provided
  }
  
  export class Dancer {
    // Define the properties of the Dancer entity if not provided
  }
  