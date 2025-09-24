import { User } from './User.model';

export enum BlogpostCategory {
  ADVICE = 'ADVICE',
  SPORT = 'SPORT',
  HEALTH = 'HEALTH',
  FOOD = 'FOOD',
  HISTORY = 'HISTORY',
  TECHNOLOGY = 'TECHNOLOGY',
  TRAVEL = 'TRAVEL',
  LIFESTYLE = 'LIFESTYLE',
  BUSINESS = 'BUSINESS',
  EDUCATION = 'EDUCATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  OTHER = 'OTHER'
}

export interface Blogpost {
  id: string;
  title: string;
  content: string;
  category: BlogpostCategory;
  author: User;
  createdDate?: string;
  updatedDate?: string;
}

export interface BlogpostDTO {
  id?: string;
  title: string;
  content: string;
  category: BlogpostCategory;
  authorId?: string;
  author?: User;
  createdDate?: string;
  updatedDate?: string;
}