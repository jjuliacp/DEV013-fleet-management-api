import express from 'express'
import { getAllTaxis } from '../controller/taxis'

const router = express.Router()


/**
 * @swagger
 * components:
 *  schemas:
 *    Taxi:
 *      type: object
 *      properties: 
 *        id:
 *          type: integer
 *          description: ID del taxi
 *        plate:
 *          type: string
 *          description: Número de placa
 *      required:
 *        - id
 *        - plate
 *      example: 
 *        - id: 15
 *          plate: FNHK-3772
 *        - id: 21
 *          plate: NNEL-2287
 *    Error:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          description: Mensaje de error
 *          example: "Mensaje de error "
 */

/**
* @swagger
* tags:
*   - name: Taxis
*     description: Endpoints para el manejo de ubicaciones de taxis
* paths:
*   /taxis:
*     get:
*       tags:
*         - Taxis
*       summary: Obtiene el listado de taxis
*       parameters:
*         - name: _page
*           in: query
*           description: Número de página para consultar
*           required: false
*           schema:
*             type: integer
*             default: 1
*         - name: _limit
*           in: query
*           description: Número de elementos por página
*           required: false
*           schema:
*             type: integer
*             default: 10
*       responses:
*         200:
*           description: Operación exitosa
*           content: 
*             application/json:
*               schema:
*                 type: array
*                 items:
*                 $ref: '#/components/schemas/Taxi'
*         400:
*           description: Error de solicitud incorrecta
*           content:
*             application/json:
*                schema:
*                 $ref: '#/components/schemas/Error'  
*         500:
*           description: Internal Server Error
*           content: 
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Error'  
*   /taxis/{id}:
*    put:
*     tags:
*       - Taxis
*     summary: actualizar la información de un taxi existente
*     parameters:
*       - name: id
*         in: path
*         description: se necesita id del taxi
*         required: true
*         schema: 
*           type: integer
*     responses:
*       200:
*           description: operación exitosa
*           content: 
*               application/json:
*                   schema:
*                       type: object
*                       items:
*                       $ref: '#/components/schemas/Taxi' 
*       400:
*           description: Error de solicitud incorrecta
*   /taxis/user/{id}:
*    delete:
*       tags:
*         - Taxis
*       summary: eliminar taxi existente
*       parameters:
*         - name: id
*           in: path
*           description: se necesita id del taxi
*           required: true
*           schema:
*               type: integer
*   /taxis/: 
*    post:
*       tags:
*         - Taxis
*       summary:  Registrar un nuevo taxi en el sistema    
*             
*/


router.get('/taxis', getAllTaxis) // seria la funcion del controller



export default router
