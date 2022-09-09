package com.example.prakharbansal.dao.daoImpl;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.prakharbansal.dao.ExpenseDao;
import com.example.prakharbansal.models.Expense;

@Repository
public class ExpenseDaoImpl implements ExpenseDao {

    private EntityManager entityManager;


    @Autowired
    public ExpenseDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Expense> getAllExpenses() {
        Query query = (Query) entityManager.createQuery("from Expense");
        List<Expense> expenses = query.getResultList();
        return expenses;
    }

    @Override
    public Expense getExpenseById(Integer id) {
        Expense expense = entityManager.find(Expense.class, id);
        return expense;
    }

    @Override
    public Expense updateExpense(Expense expense) {
        Expense new_expense = entityManager.merge(expense);
        new_expense.setId(new_expense.getId());
        return new_expense;
    }

    @Override
    public List<Expense> deleteExpenseById(Integer id) {
        Query theQuery = (Query) entityManager.createQuery("delete from Expense where id=:transactionId");
        theQuery.setParameter("transactionId", id);
        theQuery.executeUpdate();
        return getAllExpenses();
    }

    @Override
    public Expense saveExpense(Expense expense) {
        Expense new_expense = entityManager.merge(expense);
        new_expense.setId(new_expense.getId());
        return new_expense;
    }

}
