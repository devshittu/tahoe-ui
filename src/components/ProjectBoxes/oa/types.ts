// src/types/project.ts

export type Participant = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Project = {
  id: string;
  date: string;
  title: string;
  color: string;
  subtitle: string;
  progress: {
    percentage: number;
    color: string;
  };
  participants: Participant[];
  daysLeft: number;
  backgroundColor: string;
};
