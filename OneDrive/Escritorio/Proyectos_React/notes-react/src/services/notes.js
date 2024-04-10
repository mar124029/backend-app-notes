import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
    // O
    // return axios.get(baseUrl);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
    // return axios.post(baseUrl, newObject);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
        .catch(error => {
        // Manejo de errores aquí
            console.error('Error en la solicitud de actualización:', error)
            throw error // Puedes relanzar el error para que se maneje en el nivel superior
        })
    // return axios.put(`${baseUrl}/${id}`,newObject);
}

export default { getAll, create, update }