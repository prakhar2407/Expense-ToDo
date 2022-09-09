package com.example.prakharbansal.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.lang.NonNull;


@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @NonNull
    private Integer Id;
    private String name;
    private double cost;
    private Date date;
    private String url;
    private String remarks;

    public Expense(Integer id, String name, double cost, Date date, String url, String remarks) {
        Id = id;
        this.name = name;
        this.cost = cost;
        this.date = date;
        this.url = url;
        this.remarks = remarks;
    }

    public Expense() {
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "Expense [Id=" + Id + ", cost=" + cost + ", date=" + date + ", name=" + name
                + ", remarks=" + remarks + ", url=" + url + "]";
    }
}
