
router.patch("/:username/shortlist", async (req, res) => {
  try {
    const { username } = req.params;
    const { matchName } = req.body;

    
    await pool.query(
      `UPDATE users 
       SET connections = 
         CASE 
           WHEN connections IS NULL THEN ARRAY[$1]
           ELSE array_append(connections, $1) 
         END 
       WHERE name = $2`,
      [matchName, username]
    );

    res.status(200).json({ message: `${matchName} added to ${username}'s connections.` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to shortlist user" });
  }
});
