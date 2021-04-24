import { TypeSite, TypeTest } from '../components/Dashboard/types';
import { instance } from './api';

export const dashboardAPI = {
  async getSites(): Promise<TypeSite[]> {
    const res = await instance.get(`sites`);
    return res.data;
  },
  async getTests(): Promise<TypeTest[]> {
    const res = await instance.get(`tests`);
    return res.data;
  },
};
