import express from 'express'
import { lastLocation, locationLog } from '../controller/trajectories'


const tjsRouter = express.Router()


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
 * /trajectories/search/{id} :
 *  get:
 *   tags:
 *     - Trajectories
 *   summary:  Obtiene todas las ubicaciones de un taxi 
 *   parameters: 
 *      - name: id 
 *        in: path
 *        description: se necesita id para consultar la última ubicación reportada por cada taxi.
 *        required: true
 *        schema:
 *          type: integer
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

tjsRouter.get('/trajectories:id', locationLog ) // seria la funcion del controller
tjsRouter.get('/trajectories/search:id', lastLocation ) // ultima ubicación

export default tjsRouter
