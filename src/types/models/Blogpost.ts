import { User } from './User.model';

export enum BlogpostCategory {
  TECHNOLOGY = 'TECHNOLOGY',
  LIFESTYLE = 'LIFESTYLE',
  TRAVEL = 'TRAVEL',
  FOOD = 'FOOD',
  BUSINESS = 'BUSINESS',
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SPORTS = 'SPORTS',
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