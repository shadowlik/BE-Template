import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:3001'
})

const api = {
    async listUsers() {
        const { data } = await axios.get('/profiles');
        return data;
    },
    async listContracts() {
        const { data } = await axios.get('/contracts');
        return data;
    },
    async listUnpaidJobs() {
        const { data } = await axios.get('/jobs/unpaid');
        return data;
    },
    admin: {
        async bestClients() {
            const { data } = await axios.get('/admin/best-clients');
            return data;
        },
        async bestProfession() {
            const { data } = await axios.get('/admin/best-profession');
            return data;
        }
    }
}

export { axios }

export default api;