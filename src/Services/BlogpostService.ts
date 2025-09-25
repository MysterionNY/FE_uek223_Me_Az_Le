import api from '../config/Api';
import { Blogpost, BlogpostDTO } from '../types/models/Blogpost';

export interface PaginatedResponse {
  content: Blogpost[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

const BlogpostService = {
  getAllBlogposts: async (): Promise<Blogpost[]> => {
    const { data } = await api.get<Blogpost[]>('/blogposts?size=100');
    return data;
  },

  getAllBlogpostsPaginated: async (
    page: number = 0,
    size: number = 10,
    category?: string
  ): Promise<Blogpost[]> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    if (category && category !== 'ALL') {
      params.append('category', category);
    }

    const { data } = await api.get<Blogpost[]>(`/blogposts?${params.toString()}`);
    return data;
  },

  getBlogpostById: async (blogpostId: string): Promise<Blogpost> => {
    const { data } = await api.get<Blogpost>(`/blogposts/${blogpostId}`);
    return data;
  },

  getBlogpostsByAuthor: async (authorId: string): Promise<Blogpost[]> => {
    const { data } = await api.get<Blogpost[]>(`/blogposts/author/${authorId}`);
    return data;
  },

  createBlogpost: async (blogpost: BlogpostDTO): Promise<Blogpost> => {
    const { data } = await api.post<Blogpost>('/blogposts', blogpost);
    return data;
  },

  updateBlogpost: async (blogpostId: string, blogpost: BlogpostDTO): Promise<Blogpost> => {
    const { data } = await api.put<Blogpost>(`/blogposts/${blogpostId}`, blogpost);
    return data;
  },

  deleteBlogpost: async (blogpostId: string): Promise<void> => {
    await api.delete(`/blogposts/${blogpostId}`);
  },
};

export default BlogpostService;