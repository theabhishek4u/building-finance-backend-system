const FinanceService = require('../services/financeService');

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await FinanceService.getDashboardSummary();
    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};
