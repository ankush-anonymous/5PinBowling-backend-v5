const { pool } = require("../db/connect");

const bookingRepository = {
createBooking: async (data) => {
  try {
    const {
      customerName,
      email,
      phone,
      date,
      startTime,
      endTime,
      noOfPlayers,
      package_id,
      lane_no,
      book_status,
      pay_status,
      note,
      pizza_quantity,
      pizza_type,
      shoe_size,
    } = data;

    const query = `
  INSERT INTO bookings (
    customerName, email, phone, date,
    startTime, endTime, noOfPlayers, package_id,
    lane_no, book_status, pay_status, note,
    pizza_quantity, pizza_type, shoe_size
  )
  VALUES (
    $1, $2, $3, $4::DATE, $5,
    $6, $7, $8, $9,
    $10, $11, $12,
    $13, $14, $15
  )
  RETURNING *`;


    const values = [
      customerName,
      email,
      phone,
      date,
      startTime,
      endTime,
      noOfPlayers,
      package_id,
      lane_no,
      book_status,
      pay_status,
      note,
      pizza_quantity,
      pizza_type,
      shoe_size,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error creating booking: ${error.message}`);
  }
},

  // Get all bookings
  getAllBookings: async () => {
    try {
      const result = await pool.query(`SELECT * FROM bookings`);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching bookings: ${error.message}`);
    }
  },

  // Get booking by ID
  getBookingById: async (id) => {
    try {
      const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
      // return result.rows[0];
      const row = result.rows[0];

      // Ensure date is returned as a string (ISO format)
      row.date = row.date.toISOString().split("T")[0]; // 'YYYY-MM-DD'

      return row;

    } catch (error) {
      throw new Error(`Error fetching booking: ${error.message}`);
    }
  },

  // Update booking by ID
  updateBookingById: async (id, data) => {
    try {
      const fields = [];
      const values = [];
      let i = 1;

      for (let key in data) {
        fields.push(`${key} = $${i}`);
        values.push(data[key]);
        i++;
      }

      if (fields.length === 0) {
        throw new Error("No fields to update");
      }

      const query = `UPDATE bookings SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`;
      values.push(id);

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating booking: ${error.message}`);
    }
  },

  // Delete booking by ID
  deleteBookingById: async (id) => {
    try {
      const result = await pool.query(`DELETE FROM bookings WHERE id = $1 RETURNING *`, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting booking: ${error.message}`);
    }
  },

  // Paginated fetch
  getBookingsPaginated: async (limit = 10, offset = 0) => {
    try {
      const query = `SELECT * FROM bookings ORDER BY date DESC LIMIT $1 OFFSET $2`;
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching bookings with pagination: ${error.message}`);
    }
  },

  countAllBookings: async () => {
    try {
      const result = await pool.query(`SELECT COUNT(*)::int FROM bookings`);
      return { count: result.rows[0].count };
    } catch (error) {
      throw new Error(`Error counting bookings: ${error.message}`);
    }
  },
};

module.exports = bookingRepository;
