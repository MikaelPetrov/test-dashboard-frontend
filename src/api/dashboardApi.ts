import { TypeSite, TypeTest } from '../components/Dashboard/types';
import { instance } from './api';

export const dashboardAPI = {
  async getSites(sites: TypeSite) {
    const res = await instance.get(`sites`);
    return res.data;
  },
  async getTests(tests: TypeTest) {
    const res = await instance.get(`tests`);
    return res.data;
  },
};
