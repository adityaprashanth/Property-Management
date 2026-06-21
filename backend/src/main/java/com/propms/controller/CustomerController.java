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

import java.util.List;

@RestController
@RequestMapping("/api/customers")
//@CrossOrigin(origins = "http://localhost:3000")
// @CrossOrigin(origins = {
//     "http://localhost:3000",
//     "http://192.168.0.65:3000"
// })
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
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
}