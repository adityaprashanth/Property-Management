package com.propms.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "phid")
    private Integer phid;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    @Column(name = "type")
    private String type;
    @Column(name = "print")
    private Boolean print;
    @Column(name="photo_path")
    private String photoPath;
    public Integer getPhid() {
        return phid;
    }
    public void setPhid(Integer phid) {
        this.phid = phid;
    }
    public Customer getCustomer() {
        return customer;
    }
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public Boolean getPrint() {
        return print;
    }
    public void setPrint(Boolean print) {
        this.print = print;
    }
    public String getPhotoPath() {
        return photoPath;
    }
    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }
}
