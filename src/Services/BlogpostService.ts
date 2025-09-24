import api from '../config/Api';
import { Blogpost, BlogpostDTO } from '../types/models/Blogpost';

const BlogpostService = {
  getAllBlogposts: async (): Promise<Blogpost[]> => {
    const { data } = await api.get<Blogpost[]>('/blogposts');
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