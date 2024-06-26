import express from 'express'
import { exportToExcel, lastLocation, locationLog } from '../controller/trajectories'


const router = express.Router()


/**
* @swagger
* components:
*  schemas:
*    Trajectories:
*      type: object
*      properties: 
*        id:
*          type: integer
*          description: ID del taxi
*        date:
*          type: string
*          format: date
*      required:
*        - id
*        - date
*      example: 
*          - id: 15
*            date: 2008-02-02
*          - latitude: 116.222
*            longitude: 38.556
*          - latitude: 116.222
*            longitude: 8.556
*    Searchlocation:
*      type: object
*      properties:
*        id:
*           type: integer
*           description: id del taxi
*      required:
*        - id
*      example:
*        - id: 15
*          plate: FNHK-3772
*          latitude: 116.222
*          longitude: 38.556
*          timestamp: 
*/


/**
 *  @swagger
 * tags:
 *  - name: Trajectories
 *    description: Endpoints para el manejo de ubicaciones de taxis
 * /trajectories/{id}:
 *  get:
 *   tags:
 *     - Trajectories
 *   summary:  Obtiene todas las ubicaciones de un taxi 
 *   parameters: 
 *      - name: id 
 *        in: path
 *        description: se necesita id  para consultar todas las ubicaciones de un taxi
 *        required: true
 *        schema:
 *          type: integer
 *      - name: date
 *        in: path
 *        description: se necesita especificar la fecha/date
 *        required: true
 *        schema:
 *          type: string
 *          format: date 
 *   responses:
 *      200:
 *       description: operación exitosa
 *       content: 
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Trajectories'
 *      400:
 *        description: Error de solicitud incorrecta
 *        content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Error'                  
*/


/**
 *  @swagger
 * /lastlocation:
 *  get:
 *   tags:
 *     - Trajectories
 *   summary:  Obtiene todas las ubicaciones de un taxi 
 *   parameters: 
 *      - name: _page
 *        in: query
 *        description: Número de página para consultar.
 *        required: false
 *        schema:
 *          type: integer
 *          default: 1
 *      - name: _limit
 *        in: query
 *        description: número de elementos por pagina.
 *        required: false
 *        schema:
 *          type: integer
 *          default: 10
 *   responses:
 *      200:
 *       description: operación exitosa
 *       content: 
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *             $ref: '#/components/schemas/Searchlocation'
 *      400:
 *        description: Error de solicitud incorrecta
 *        content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Error'                  
*/

router.get('/trajectories/:id', locationLog) // seria la funcion del controller
router.get('/lastlocation', lastLocation); // ultima ubicación
router.get('/trajectories/:id/export', exportToExcel ) // exportar trayectorias segun id y fecha 
export default router
