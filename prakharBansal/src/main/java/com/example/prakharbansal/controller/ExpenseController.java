package com.example.prakharbansal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.prakharbansal.models.Expense;
import com.example.prakharbansal.service.serviceImpl.ExpenseServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path="/api/assignment")
public class ExpenseController {

    @Autowired
    ExpenseServiceImpl expenseServiceImpl;

    @GetMapping("/expenses")
    public List<Expense> getAllExpenses() {
        return expenseServiceImpl.findAllExpenses();
    }

    @GetMapping("/expenses/{expenseId}")
    public Expense getExpenseById(@PathVariable Integer expenseId) {
        return expenseServiceImpl.findExpenseById(expenseId);
    }

    @PutMapping("/expenses")
    public Expense updateExpense(@RequestBody Expense expense) {
        return expenseServiceImpl.updateExpense(expense);
    }

    @DeleteMapping("/expenses/{expenseId}")
    public List<Expense> deleteExpenseById(@PathVariable Integer expenseId) {
        return expenseServiceImpl.deleteExpenseById(expenseId);
    }

    @PostMapping("/expenses")
    public Expense postExpense(@RequestBody Expense expense) {
        return expenseServiceImpl.saveExpense(expense);
    }

}
