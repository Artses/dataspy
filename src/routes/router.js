import express from "express";
import "dotenv/config";
import {
  getConnections,
  getLocks,
  getSlowQueries,
  countSlowQueries
} from "../database/queries.js";

const router = express.Router();

router.get(`/api/${process.env.API_VERSION}/metrics`, async (req, res) => {
  try {
    const [
      connections,
      locks,
      slowQueriesCount,
      topQueries
    ] = await Promise.all([
      getConnections(),
      getLocks(),
      countSlowQueries(),
      getSlowQueries()
    ]);

    const status =
      locks > 0 || slowQueriesCount > 0 ? "ALERT" : "OK";

    res.json({
      connections,
      locks,
      slowQueries: slowQueriesCount,
      status,
      topQueries
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao coletar métricas" });
  }
});

export default router;
