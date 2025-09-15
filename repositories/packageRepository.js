const { pool } = require("../db/connect");

const packageRepository = {
  createPackage: async (data) => {
    try {
      const {
        packageName,
        img_url,
        Title,
        subtitle,
        description,
        Cost,
        no_of_person
      } = data;


      const query = `
        INSERT INTO packages (
          packageName, img_url, Title,
          subtitle, description, Cost, no_of_person
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;

      const values = [
        packageName,
        img_url,
        Title,
        subtitle,
        description,
        Cost,
        no_of_person
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating package: ${error.message}`);
    }
  },

  // Get all packages
  getAllPackages: async () => {
    try {
      const result = await pool.query(`SELECT * FROM packages`);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching packages: ${error.message}`);
    }
  },

  // Get package by ID
  getPackageById: async (id) => {
    try {
      const result = await pool.query(`SELECT * FROM packages WHERE id = $1`, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching package: ${error.message}`);
    }
  },

  // Update package by ID
  updatePackageById: async (id, data) => {
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

      const query = `UPDATE packages SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`;
      values.push(id);

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating package: ${error.message}`);
    }
  },

  // Delete package by ID
  deletePackageById: async (id) => {
    try {
      const result = await pool.query(`DELETE FROM packages WHERE id = $1 RETURNING *`, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting package: ${error.message}`);
    }
  },

  // Get all packages with pagination
  getPackagesPaginated: async (limit = 10, offset = 0) => {
    try {
      const result = await pool.query(
        `SELECT * FROM packages ORDER BY Title LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching paginated packages: ${error.message}`);
    }
  },

  countAllPackages: async () => {
    try {
      const result = await pool.query(`SELECT COUNT(*)::int FROM packages`);
      return { count: result.rows[0].count };
    } catch (error) {
      throw new Error(`Error counting packages: ${error.message}`);
    }
  }
};

module.exports = packageRepository;
