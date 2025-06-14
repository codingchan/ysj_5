import axios from 'axios'

export const getRooms = () => axios.get('/room')
export const getRoomMembers = id => axios.get('/room/members/' + id)
export const getRoomInfo = id => axios.get('/room/' + id)
export const deleteRoom = id => axios.delete('/room/' + id)
export const createRoom = params => axios.post('/room', params)
export const editRoom = (id, params) => axios.put('/room/' + id, params)
export const addPrototype = params => axios.post('/room/prototype', params)
export const getPrototypeList = () => axios.get('/room/prototype')
export const deletePrototype = id => axios.delete('/room/prototype/' + id)
export const getPrototypeDetail = id => axios.get('/room/prototype/' + id)
export const getRoomStats = id => axios.get('/room/room_stats?room_id=' + id)
