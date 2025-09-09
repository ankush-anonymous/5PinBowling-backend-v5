const { pool } = require("../db/connect");

const businessHoursRepository = {
  // Create business hour
  createBusinessHour: async (data) => {
    try {
      const { day_no, day_name, startTime, endTime, offDay } = data;

      const query = `
        INSERT INTO business_hours (
         day_no, day_name, startTime, endTime, offDay
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;

      const values = [ day_no, day_name, startTime, endTime, offDay ?? false];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating business hour: ${error.message}`);
    }
  },

  // Get all business hours
  getAllBusinessHours: async () => {
    try {
      const result = await pool.query(`SELECT * FROM business_hours ORDER BY day_no`);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching business hours: ${error.message}`);
    }
  },

  // Get business hour by ID
  getBusinessHourById: async (id) => {
    try {
      const result = await pool.query(`SELECT * FROM business_hours WHERE id = $1`, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching business hour: ${error.message}`);
    }
  },

  // Update business hour by ID
  updateBusinessHourById: async (id, data) => {
    try {
      const fields = [];
      const values = [];
      let i = 1;

      for (let key in data) {
        fields.push(`${key} = $${i}`);
        values.push(data[key]);
        i++;
      }

      if (fields.length === 0) throw new Error("No fields to update");

      const query = `UPDATE business_hours SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`;
      values.push(id);

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating business hour: ${error.message}`);
    }
  },

  // Delete business hour by ID
  deleteBusinessHourById: async (id) => {
    try {
      const result = await pool.query(`DELETE FROM business_hours WHERE id = $1 RETURNING *`, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting business hour: ${error.message}`);
    }
  },
};

module.exports = businessHoursRepository;
