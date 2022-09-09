package com.example.prakharbansal.service.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.prakharbansal.dao.daoImpl.ExpenseDaoImpl;
import com.example.prakharbansal.models.Expense;
import com.example.prakharbansal.service.ExpenseService;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    ExpenseDaoImpl expenseDaoImpl;

    @Override
    @Transactional
    public List<Expense> findAllExpenses() {
        return expenseDaoImpl.getAllExpenses();
    }

    @Override
    @Transactional
    public Expense findExpenseById(Integer id) {
        return expenseDaoImpl.getExpenseById(id);
    }

    @Override
    @Transactional
    public Expense updateExpense(Expense expense) {
        return expenseDaoImpl.updateExpense(expense);
    }

    @Override
    @Transactional
    public List<Expense> deleteExpenseById(Integer id) {
        return expenseDaoImpl.deleteExpenseById(id);
    }

    @Override
    @Transactional
    public Expense saveExpense(Expense expense) {
        return expenseDaoImpl.saveExpense(expense);
    }

}
