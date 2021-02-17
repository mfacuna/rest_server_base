const { response, request } = require('express');

const userGet = (req = request, res = response) => {
    const { page = 1, limit = 10 } = req.query;

    res.json({
        msg: 'get Api -  userGet controller',
        page,
        limit
    })
}

const userPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'put Api -  userPut controller',
        id
    })
}

const userPost = (req, res = response) => {
    const { id } = req.body;

    res.json({
        msg: 'post Api - userPost controller',
        id
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete Api - userDelete controller'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api - userPatch controller'
    })
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch,
};