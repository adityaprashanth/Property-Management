// package com.propms.repository;

// import com.propms.entity.Customer;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// // import java.util.List;

// // List<Customer> findByFirstnameContainingIgnoreCase(String firstname);

// import java.util.List;

// List<Customer> findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
//         String firstname,
//         String lastname
// );

// @Repository
// public interface CustomerRepository extends JpaRepository<Customer, Integer> {}

// @GetMapping("/search")
// public ResponseEntity<?> searchCustomer(
//         @RequestParam String name) {

//     return ResponseEntity.ok(
//             customerService.searchCustomer(name)
//     );
// }

package com.propms.repository;

import com.propms.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
            String firstname,
            String lastname
    );
}