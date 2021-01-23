import moment from 'moment';
// import {v4} from 'uuid';
// const uuidv4 = require('uuid/v4');

const { v4: uuidv4 } = require('uuid');


import db from '../db/index';


// console.log(v4());
const uuId = uuidv4();

const Reflection = {
  /**
   * Create A Reflection 
   */
  async create(req, res) {
    const createQuery = `INSERT INTO
    reflections(id, success, low_point, take_away, owner_id, created_date, modified_date)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;
    const values = [
        uuId,
      req.body.success,
      req.body.low_point,
      req.body.take_away,
      req.user.id,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const  { rows }  = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      console.log(error);
      return res.status(400).send(error);
    }

  },
  /**
   * Get All Reflection
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM reflections WHERE owner_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get A Reflection
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM reflections WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update A Reflection
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM reflections WHERE id=$1 AND owner_id = $2';
    const updateOneQuery =`UPDATE reflections
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 AND owner_id = $6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      const values = [
        req.body.success || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A Reflection
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM reflections WHERE id=$1 AND owner_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Reflection;