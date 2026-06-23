// package com.propms.entity;

// import jakarta.persistence.*;
// import java.math.BigDecimal;

// @Entity
// @Table(name = "customer")
// public class Customer {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "customer_id")
//     private Integer customerId;

//     @Column(name = "firstname", nullable = false, length = 50)
//     private String firstname;

//     @Column(name = "lastname", length = 50)
//     private String lastname;

//     @Column(name = "address")
//     private String address;

//     @Column(name = "phone_no", length = 15)
//     private String phoneNo;

//     @Column(name = "docs")
//     private String docs;

//     @Column(name = "approved")
//     private Boolean approved = false;

//     @Column(name = "advance", precision = 12, scale = 2)
//     private BigDecimal advance = BigDecimal.ZERO;

//     @Column(name = "till_date_money", precision = 12, scale = 2)
//     private BigDecimal tillDateMoney = BigDecimal.ZERO;

//     @Column(name = "how_paid", length = 50)
//     private String howPaid;

//     @Column(name = "pid")
//     private Integer pid;

//     @Column(name = "facing")
//     private String facing;

//     @Column(name = "constructed_area")
//     private Double constructedArea;

//     @Column(name = "approved_area")
//     private Double approvedArea;

//     @Column(name = "site_area")
//     private Double siteArea;

//     @Column(name = "status")
//     private String status = "ACTIVE";
//     // private String status;

//     // Getters
//     public Integer getCustomerId()    { return customerId; }
//     public String  getFirstname()     { return firstname; }
//     public String  getLastname()      { return lastname; }
//     public String  getAddress()       { return address; }
//     public String  getPhoneNo()       { return phoneNo; }
//     public String  getDocs()          { return docs; }
//     public Boolean getApproved()      { return approved; }
//     public BigDecimal getAdvance()    { return advance; }
//     public BigDecimal getTillDateMoney() { return tillDateMoney; }
//     public String  getHowPaid()       { return howPaid; }
//     public Integer getPid()           { return pid; }

//     public String getFacing() {
//         return facing;
//     }

//     public Double getConstructedArea() {
//         return constructedArea;
//     }

//     public Double getApprovedArea() {
//         return approvedArea;
//     }

//     public Double getSiteArea() {
//         return siteArea;
//     }   

//     public String getStatus() {
//         return status;
//     }

//     public String getStatus() {
//         return status;
//     }

//     public void setStatus(String status) {
//         this.status = status;
//     }

//     public String getFacing() {
//         return facing;
//     }

//     public void setFacing(String facing) {
//         this.facing = facing;
//     }

//     public Double getConstructedArea() {
//         return constructedArea;
//     }

//     public void setConstructedArea(Double constructedArea) {
//         this.constructedArea = constructedArea;
//     }

//     public Double getApprovedArea() {
//         return approvedArea;
//     }

//     public void setApprovedArea(Double approvedArea) {
//         this.approvedArea = approvedArea;
//     }

//     public Double getSiteArea() {
//         return siteArea;
//     }

//     public void setSiteArea(Double siteArea) {
//         this.siteArea = siteArea;
//     }

//     // Setters
//     public void setCustomerId(Integer customerId)       { this.customerId = customerId; }
//     public void setFirstname(String firstname)          { this.firstname = firstname; }
//     public void setLastname(String lastname)            { this.lastname = lastname; }
//     public void setAddress(String address)              { this.address = address; }
//     public void setPhoneNo(String phoneNo)              { this.phoneNo = phoneNo; }
//     public void setDocs(String docs)                    { this.docs = docs; }
//     public void setApproved(Boolean approved)           { this.approved = approved; }
//     public void setAdvance(BigDecimal advance)          { this.advance = advance; }
//     public void setTillDateMoney(BigDecimal tillDateMoney) { this.tillDateMoney = tillDateMoney; }
//     public void setHowPaid(String howPaid)              { this.howPaid = howPaid; }
//     public void setPid(Integer pid)                     { this.pid = pid; }

//     public void setFacing(String facing) {
//         this.facing = facing;
//     }

//     public void setConstructedArea(Double constructedArea) {
//         this.constructedArea = constructedArea;
//     }

//     public void setApprovedArea(Double approvedArea) {
//         this.approvedArea = approvedArea;
//     }

//     public void setSiteArea(Double siteArea) {
//         this.siteArea = siteArea;
//     }

//     public void setStatus(String status) {
//         this.status = status;
//     }

// }

package com.propms.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "firstname", nullable = false, length = 50)
    private String firstname;

    @Column(name = "lastname", length = 50)
    private String lastname;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_no", length = 15)
    private String phoneNo;

    @Column(name = "docs")
    private String docs;

    @Column(name = "approved")
    private Boolean approved = false;

    @Column(name = "advance", precision = 12, scale = 2)
    private BigDecimal advance = BigDecimal.ZERO;

    @Column(name = "till_date_money", precision = 12, scale = 2)
    private BigDecimal tillDateMoney = BigDecimal.ZERO;

    @Column(name = "how_paid", length = 50)
    private String howPaid;

    @Column(name = "pid")
    private Integer pid;

    @Column(name = "facing")
    private String facing;

    @Column(name = "constructed_area")
    private Double constructedArea;

    @Column(name = "approved_area")
    private Double approvedArea;

    @Column(name = "site_area")
    private Double siteArea;

    @Column(name = "status")
    private String status = "ACTIVE";

    // =========================
    // Getters
    // =========================

    public Integer getCustomerId() {
        return customerId;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getAddress() {
        return address;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public String getDocs() {
        return docs;
    }

    public Boolean getApproved() {
        return approved;
    }

    public BigDecimal getAdvance() {
        return advance;
    }

    public BigDecimal getTillDateMoney() {
        return tillDateMoney;
    }

    public String getHowPaid() {
        return howPaid;
    }

    public Integer getPid() {
        return pid;
    }

    public String getFacing() {
        return facing;
    }

    public Double getConstructedArea() {
        return constructedArea;
    }

    public Double getApprovedArea() {
        return approvedArea;
    }

    public Double getSiteArea() {
        return siteArea;
    }

    public String getStatus() {
        return status;
    }

    // =========================
    // Setters
    // =========================

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public void setDocs(String docs) {
        this.docs = docs;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }

    public void setAdvance(BigDecimal advance) {
        this.advance = advance;
    }

    public void setTillDateMoney(BigDecimal tillDateMoney) {
        this.tillDateMoney = tillDateMoney;
    }

    public void setHowPaid(String howPaid) {
        this.howPaid = howPaid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public void setFacing(String facing) {
        this.facing = facing;
    }

    public void setConstructedArea(Double constructedArea) {
        this.constructedArea = constructedArea;
    }

    public void setApprovedArea(Double approvedArea) {
        this.approvedArea = approvedArea;
    }

    public void setSiteArea(Double siteArea) {
        this.siteArea = siteArea;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
