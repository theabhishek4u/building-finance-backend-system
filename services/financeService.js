const Record = require('../models/Record');

/**
 * Finance Service - Handles financial record operations and dashboard analytics
 */
class FinanceService {
  /**
   * Create a new finance record
   */
  static async createRecord(recordData) {
    return await Record.create(recordData);
  }

  /**
   * Get filtered records with pagination and search
   */
  static async getRecords(query = {}) {
    const { page = 1, limit = 10, search, type, category, startDate, endDate } = query;
    const filter = { isDeleted: false };

    // Search by description or category
    if (search) {
      filter.$or = [
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by type (income/expense)
    if (type) {
      filter.type = type;
    }

    // Filter by exact category
    if (category) {
      filter.category = category;
    }

    // Filter by date range
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    
    const records = await Record.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const totalRecords = await Record.countDocuments(filter);

    return {
      records,
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    };
  }

  static async getRecordById(id) {
    return await Record.findOne({ _id: id, isDeleted: false });
  }

  static async updateRecord(id, updateData) {
    return await Record.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updateData,
      { new: true, runValidators: true }
    );
  }

  /**
   * Soft delete a record
   */
  static async deleteRecord(id) {
    return await Record.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date()
    }, { new: true });
  }

  /**
   * Aggregates records for dashboard summary including trends
   */
  static async getDashboardSummary() {
    const allRecords = await Record.find({ isDeleted: false });

    // Basic Summary logic
    const summary = allRecords.reduce(
      (acc, record) => {
        if (record.type === 'income') {
          acc.totalIncome += record.amount;
        } else {
          acc.totalExpense += record.amount;
        }

        // Category breakdown
        acc.categoryBreakdown[record.category] =
          (acc.categoryBreakdown[record.category] || 0) + record.amount;

        return acc;
      },
      {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        categoryBreakdown: {},
        recentTransactions: [],
        monthlyTrends: []
      }
    );

    summary.balance = summary.totalIncome - summary.totalExpense;
    summary.recentTransactions = await Record.find({ isDeleted: false }).sort({ date: -1 }).limit(5);

    // Monthly Trends (Last 6 Months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const trends = await Record.aggregate([
      {
        $match: {
          isDeleted: false,
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    summary.monthlyTrends = trends.map(t => ({
      month: `${t._id.year}-${String(t._id.month).padStart(2, '0')}`,
      income: t.income,
      expense: t.expense,
      net: t.income - t.expense
    }));

    return summary;
  }
}

module.exports = FinanceService;
