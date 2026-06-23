// package com.propms.controller;

// import com.propms.entity.Customer;
// import com.propms.service.CustomerService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/customers")
// @CrossOrigin(origins = "http://localhost:3000")
// // @RequiredArgsConstructor
// public class CustomerController {

//     private final CustomerService customerService;

//     public CustomerController(CustomerService customerService) {
//         this.customerService = customerService;
//     }

//     @GetMapping("/search")
//     public ResponseEntity<?> searchCustomer(
//             @RequestParam String name) {

//         return ResponseEntity.ok(
//                 customerService.searchCustomer(name)
//         );
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Customer> getCustomer(@PathVariable Integer id) {
//         return ResponseEntity.ok(customerService.getById(id));
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id,
//                                                    @RequestBody Customer updates) {
//         return ResponseEntity.ok(customerService.update(id, updates));
//     }

//     // @GetMapping("/search")
//     // public ResponseEntity<?> searchCustomer(
//     //         @RequestParam String keyword) {

//     //     return ResponseEntity.ok(
//     //             customerService.searchCustomer(keyword)
//     //     );
//     // }


// }

package com.propms.controller;

import com.propms.entity.Customer;
import com.propms.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.propms.repository.CustomerRepository;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
//@CrossOrigin(origins = "http://localhost:3000")
// @CrossOrigin(origins = {
//     "http://localhost:3000",
//     "http://192.168.0.65:3000"
// })
public class CustomerController {

    // private final CustomerService customerService;

    // public CustomerController(CustomerService customerService) {
    //     this.customerService = customerService;
    // }

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    public CustomerController(
            CustomerService customerService,
            CustomerRepository customerRepository) {

        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Customer>> searchCustomer(
            @RequestParam String name) {

        return ResponseEntity.ok(
                customerService.searchCustomer(name)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                customerService.getById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Integer id,
            @RequestBody Customer updates) {

        return ResponseEntity.ok(
                customerService.update(id, updates)
        );
    }

    // @PutMapping("/{id}/deactivate")
    // public ResponseEntity<Customer> deactivateCustomer(
    //         @PathVariable Integer id
    // ) {

    //     Customer customer =
    //             customerRepository.findById(id)
    //                     .orElseThrow();

    //     customer.setStatus("INACTIVE");

    //     return ResponseEntity.ok(
    //             customerRepository.save(customer)
    //     );
    // }

    // @PutMapping("/{id}/deactivate")
    // public ResponseEntity<?> deactivateCustomer(
    //         @PathVariable Integer id) {

    //     Customer customer =
    //             customerRepository.findById(id)
    //                     .orElseThrow();
    //     customer.setStatus("Inactive");
    //     customerRepository.save(customer);
    //     return ResponseEntity.ok().build();
    // }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateCustomer(
            @PathVariable Integer id) {
        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow();
        customer.setStatus("INACTIVE");
        customerRepository.save(customer);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/inactive")
    public ResponseEntity<List<Customer>> getInactiveCustomers() {
        return ResponseEntity.ok(
            customerRepository.findByStatus("INACTIVE")
        );
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<?> activateCustomer(
            @PathVariable Integer id) {
        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow();
        customer.setStatus("ACTIVE");
        customerRepository.save(customer);
        return ResponseEntity.ok().build();
    }

}
