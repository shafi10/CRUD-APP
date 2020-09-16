const router = require('express').Router()

const { postaddData , getData, getsingleData, postEdit, deleteProduct } = require('../controllers/dataCtrl')


router.get('/', getData)
router.post('/',postaddData)
router.get('/single/:id', getsingleData)
router.post('/edit', postEdit)
router.delete('/delete/:id',deleteProduct)


module.exports = router;








