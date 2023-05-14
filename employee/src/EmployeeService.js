import axios from 'axios'

const REST_URL = "http://localhost:8080/"
class EmployeeService {
    getAllEmployees() {
        return axios.get(REST_URL + "get");
    }

    createEmployee(employee) {
        return axios.post(REST_URL + "create", employee);
    }

    updateEmployee(id, employee) {
        return axios.put(REST_URL + "update/" + id, employee);
    }

    deleteEmployee(id) {
        return axios.delete(REST_URL + "delete/" + id);
    }

}

export default new EmployeeService();