package com.propms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "customer_stage")
public class CustomerStage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_stage_id")
    private Integer customerStageId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;

    public Integer getCustomerStageId() {
        return customerStageId;
    }

    public void setCustomerStageId(Integer customerStageId) {
        this.customerStageId = customerStageId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }
}
