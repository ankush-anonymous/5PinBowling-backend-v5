const { pool } = require("../db/connect");

const updatesRepository = {
  createUpdate: async (data) => {
    try {
      const {
        title,
        subtitle,
        body,
        image_url,
        isArchived,
        author
      } = data;


      const query = `
        INSERT INTO updates (
           title, subtitle, body, image_url, isArchived, author
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;

      const values = [        title,
        subtitle,
        body,
        image_url,
        isArchived ?? false,
        author
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating update: ${error.message}`);
    }
  },

  // Get all updates
  getAllUpdates: async () => {
    try {
      const result = await pool.query(`SELECT * FROM updates ORDER BY dateOfCreation DESC`);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching updates: ${error.message}`);
    }
  },

  // Get update by ID
  getUpdateById: async (id) => {
    try {
      const result = await pool.query(`SELECT * FROM updates WHERE id = $1`, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching update: ${error.message}`);
    }
  },

  // Update update by ID
  updateUpdateById: async (id, data) => {
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

      const query = `UPDATE updates SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`;
      values.push(id);

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating update: ${error.message}`);
    }
  },

  // Delete update by ID
  deleteUpdateById: async (id) => {
    try {
      const result = await pool.query(`DELETE FROM updates WHERE id = $1 RETURNING *`, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting update: ${error.message}`);
    }
  }
};

module.exports = updatesRepository;
