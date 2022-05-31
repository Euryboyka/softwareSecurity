import request from '../utils/request';

const path = 'http://localhost:8080';
export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export const getCNNVDpagetotal = query =>{
    return request({
        url:path+'/CNNVD/getCNNVDPageTotal',
        method:'get'
    })
};
export const uploadSingleSoftware = (query,id) => {
    return request({
        url:path+'/Vulnerability/uploadSingleSoftwareInfo',
        method:'get',
        params:{
            name:query.name,
            version:query.version,
            date:query.date,
            location:query.location,
            develeper:query.develeper,
            computerId:id
        }
    })
};
export const register = query => {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        transformRequest: [function (data) {
            data = JSON.stringify(data)
            return data
        }],
        data: {
            'name': query.name,
            'password': query.password,
            'level': '1'
        },
        url: path+'/user/register',
        method: 'post',
        params: {}
    })
};
export const verify = query => {
    return request({
        url: path+'/user/exist',
        method: 'get',
        params: {
            name: query,
        }
    })
}

export const getCNNVDInfo = query => {
    return request({
        url: path+'/CNNVD/getListByPage',
        method: 'get',
        params: {
            offset: query
        }
    })
}
export const getLocalIP = () => {
    return request({
        url: 'http://pv.sohu.com/cityjson?ie=utf-8',
        method: 'get',
        changeOrigin : true
    })
}
export const getSingleInfo = (query) => {
    return request({
        url: path+'/Vulnerability/singleInfo',
        method: 'get',
        params:{
            name: query
        }
    })
}
export const getVulerableInfo = (quary) => {
    return request({
        url: path+"/Vulnerability/getVulnerabilityInfo",
        method: 'get',
        params:{
            computerId: quary
        }
    })
}
export const getUserCNNVDList = (query)=>{
    return request({
        url:path+"/Vulnerability/getCNNVDList",
        method:'get',
        params:{
            name:query
        }
    })
}