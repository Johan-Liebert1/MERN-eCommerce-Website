import express from 'express'

import { getProducts, getProductById } from '../controllers/productController.js'

const router = express.Router()

// for / handle a get request and call getProducts
router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

export default router