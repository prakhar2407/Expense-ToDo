package com.example.prakharbansal.dao;

import java.util.List;

import com.example.prakharbansal.models.Expense;

public interface ExpenseDao {
    public List<Expense> getAllExpenses();

    public Expense getExpenseById(Integer id);

    public Expense updateExpense(Expense expense);

    public List<Expense> deleteExpenseById(Integer id);

    public Expense saveExpense(Expense expense);
}
