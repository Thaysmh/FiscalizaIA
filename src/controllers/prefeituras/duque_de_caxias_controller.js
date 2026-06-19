import DuqueDeCaxiasService from '../../services/prefeituras/duque_de_caxias_service.js';

export async function get_duque_de_caxias(req, res) {
  try {
    const { year } = req.query;
    const data = await DuqueDeCaxiasService({ year });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}