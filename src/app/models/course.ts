export class Course {
  courseId!: number;
  courseName!: string;
  category!: string;
  startDate!: Date;
  endDate!: Date;
  location!: string;
  description!: string;
  durationInHours!: number;
  requiredSkillLevel!: string;
  videoLink!: string;
  maxParticipants!: number;
}

export class Participant {
  participantId!: number;
  // Pas besoin de la propriété participationRank pour un formulaire de cours de danse
  // Pas besoin de la référence à la compétition pour un formulaire de cours de danse
}

export class JuryManager {
  juryManagerId!: number;
  // Les autres propriétés telles que expertiseArea, diploma, etc. peuvent être conservées si elles sont pertinentes
  // Pas besoin de la référence à la compétition pour un formulaire de cours de danse
}
