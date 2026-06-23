// package com.propms.service;

// import com.propms.entity.Customer;
// import com.propms.repository.CustomerRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;

// @Service
// // @RequiredArgsConstructor
// public class CustomerService {

//     private final CustomerRepository customerRepository;

//     public CustomerService(CustomerRepository customerRepository) {
//         this.customerRepository = customerRepository;
//     }

//     public Customer getById(Integer id) {
//         return customerRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Customer not found: " + id));
//     }

//     public Customer update(Integer id, Customer updates) {
//         Customer existing = getById(id);
//         if (updates.getFirstname() != null) existing.setFirstname(updates.getFirstname());
//         if (updates.getLastname()  != null) existing.setLastname(updates.getLastname());
//         if (updates.getAddress()   != null) existing.setAddress(updates.getAddress());
//         if (updates.getPhoneNo()   != null) existing.setPhoneNo(updates.getPhoneNo());
//         if (updates.getHowPaid()   != null) existing.setHowPaid(updates.getHowPaid());
//         return customerRepository.save(existing);
//     }

//     public List<Customer> searchCustomer(String keyword) {

//         return customerRepository
//             .findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
//                 keyword,
//                 keyword
//             );
//     }

// }

package com.propms.service;

import com.propms.entity.Customer;
import com.propms.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer getById(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found: " + id));
    }

    public Customer update(Integer id, Customer updates) {

        Customer existing = getById(id);

        if (updates.getFirstname() != null)
            existing.setFirstname(updates.getFirstname());

        if (updates.getLastname() != null)
            existing.setLastname(updates.getLastname());

        if (updates.getAddress() != null)
            existing.setAddress(updates.getAddress());

        if (updates.getPhoneNo() != null)
            existing.setPhoneNo(updates.getPhoneNo());

        if (updates.getHowPaid() != null)
            existing.setHowPaid(updates.getHowPaid());

        if (updates.getFacing() != null)
            existing.setFacing(updates.getFacing());

        if (updates.getConstructedArea() != null)
            existing.setConstructedArea(
                    updates.getConstructedArea());

        if (updates.getApprovedArea() != null)
            existing.setApprovedArea(
                    updates.getApprovedArea());

        if (updates.getSiteArea() != null)
            existing.setSiteArea(
                    updates.getSiteArea());

        if (updates.getStatus() != null)
            existing.setStatus(
                    updates.getStatus());

        return customerRepository.save(existing);
    }

    // public List<Customer> searchCustomer(String keyword) {

    //     return customerRepository
    //             .findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
    //                     keyword,
    //                     keyword
    //             );
    // }

    // public List<Customer> searchCustomer(String keyword) {

    //     return customerRepository
    //             .searchActiveCustomers(keyword);
    // }

    public List<Customer> searchCustomer(String keyword) {
        return customerRepository
                .findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
                        keyword,
                        keyword
                )
                .stream()
                .filter(c ->
                    !"INACTIVE".equalsIgnoreCase(
                        c.getStatus()
                    )
                )
                .toList();
    }
}
