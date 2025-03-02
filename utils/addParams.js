const addParams = (sentencia, filters) => {
    let sql = sentencia
    let conditions = [];
    let values = [];
  
    for (const [key, value] of Object.entries(filters)) {
      if (key && value) {
        conditions.push(`${key} LIKE ?`);
        values.push(`%${value}%`);
      }
    }
  
    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    return {sql, values}
}

module.exports = {addParams}