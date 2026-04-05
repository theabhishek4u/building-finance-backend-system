const FinanceService = require('../services/financeService');
const { validateRecord } = require('../utils/validation');

exports.createRecord = async (req, res, next) => {
  try {
    const { error } = validateRecord(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const record = await FinanceService.createRecord(req.body);
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.getRecords = async (req, res, next) => {
  try {
    // Extract query parameters for service
    const { page, limit, search, type, category, startDate, endDate } = req.query;
    
    const result = await FinanceService.getRecords({
      page,
      limit,
      search,
      type,
      category,
      startDate,
      endDate
    });
    
    res.status(200).json({ 
      success: true, 
      count: result.records.length, 
      pagination: result.pagination,
      data: result.records 
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecord = async (req, res, next) => {
  try {
    const record = await FinanceService.getRecordById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const record = await FinanceService.updateRecord(req.params.id, req.body);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await FinanceService.deleteRecord(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ success: true, message: 'Record deleted' });
  } catch (err) {
    next(err);
  }
};
