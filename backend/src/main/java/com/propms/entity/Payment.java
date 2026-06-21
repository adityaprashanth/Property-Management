// package com.propms.entity;

// import jakarta.persistence.*;
// import lombok.Getter;
// import lombok.Setter;

// import java.math.BigDecimal;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "payment")
// @Getter
// @Setter
// public class Payment {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "payment_id")
//     private Integer paymentId;

//     @ManyToOne
//     @JoinColumn(name = "customer_id")
//     private Customer customer;

//     @Column(name = "type")
//     private String type;

//     @Column(name = "way")
//     private String way;

//     @Column(name = "amount")
//     private BigDecimal amount;

//     @Column(name = "payment_date")
//     private LocalDateTime paymentDate;

//     @Column(name = "last_updated_by")
//     private String lastUpdatedBy;

//     @Column(name = "created_by")
//     private String createdBy;
// }


package com.propms.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "type")
    private String type;

    @Column(name = "way")
    private String way;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "last_updated_by")
    private String lastUpdatedBy;

    @Column(name = "last_updated_time")
    private LocalDateTime lastUpdatedTime;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    // Getters

    public Integer getPaymentId() {
        return paymentId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public String getType() {
        return type;
    }

    public String getWay() {
        return way;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public LocalDateTime getLastUpdatedTime() {
        return lastUpdatedTime;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    // Setters

    public void setPaymentId(Integer paymentId) {
        this.paymentId = paymentId;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setWay(String way) {
        this.way = way;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public void setLastUpdatedTime(LocalDateTime lastUpdatedTime) {
        this.lastUpdatedTime = lastUpdatedTime;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }
}
