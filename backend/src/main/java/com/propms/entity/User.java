package com.propms.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", length = 20)
    private String role = "CUSTOMER";

    @Column(name = "last_updated_date")
    private LocalDateTime lastUpdatedDate;

    @Column(name = "last_updated_by")
    private String lastUpdatedBy;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "customer_id")
    private Integer customerId;

    @PrePersist
    protected void onCreate() { createdDate = lastUpdatedDate = LocalDateTime.now(); }

    @PreUpdate
    protected void onUpdate() { lastUpdatedDate = LocalDateTime.now(); }

    // Getters
    public Integer       getUserId()         { return userId; }
    public String        getEmail()          { return email; }
    public String        getPassword()       { return password; }
    public String        getRole()           { return role; }
    public LocalDateTime getLastUpdatedDate(){ return lastUpdatedDate; }
    public String        getLastUpdatedBy()  { return lastUpdatedBy; }
    public LocalDateTime getCreatedDate()    { return createdDate; }
    public String        getCreatedBy()      { return createdBy; }
    public Integer       getCustomerId()     { return customerId; }

    // Setters
    public void setUserId(Integer userId)               { this.userId = userId; }
    public void setEmail(String email)                  { this.email = email; }
    public void setPassword(String password)            { this.password = password; }
    public void setRole(String role)                    { this.role = role; }
    public void setLastUpdatedDate(LocalDateTime d)     { this.lastUpdatedDate = d; }
    public void setLastUpdatedBy(String lastUpdatedBy)  { this.lastUpdatedBy = lastUpdatedBy; }
    public void setCreatedDate(LocalDateTime createdDate){ this.createdDate = createdDate; }
    public void setCreatedBy(String createdBy)          { this.createdBy = createdBy; }
    public void setCustomerId(Integer customerId)       { this.customerId = customerId; }
}