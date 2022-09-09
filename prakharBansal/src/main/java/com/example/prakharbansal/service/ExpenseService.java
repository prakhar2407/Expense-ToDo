package com.example.prakharbansal.service;

import java.util.List;

import com.example.prakharbansal.models.Expense;

public interface ExpenseService {
    public List<Expense> findAllExpenses();
    public Expense findExpenseById(Integer id);
    public Expense updateExpense(Expense expense);
    public List<Expense> deleteExpenseById(Integer id);
    public Expense saveExpense(Expense expense);
}
