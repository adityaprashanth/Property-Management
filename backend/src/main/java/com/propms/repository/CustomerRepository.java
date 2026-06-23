// // package com.propms.repository;

// // import com.propms.entity.Customer;
// // import org.springframework.data.jpa.repository.JpaRepository;
// // import org.springframework.stereotype.Repository;

// // // import java.util.List;

// // // List<Customer> findByFirstnameContainingIgnoreCase(String firstname);

// // import java.util.List;

// // List<Customer> findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
// //         String firstname,
// //         String lastname
// // );

// // @Repository
// // public interface CustomerRepository extends JpaRepository<Customer, Integer> {}

// // @GetMapping("/search")
// // public ResponseEntity<?> searchCustomer(
// //         @RequestParam String name) {

// //     return ResponseEntity.ok(
// //             customerService.searchCustomer(name)
// //     );
// // }

// package com.propms.repository;

// import com.propms.entity.Customer;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.List;

// @Repository
// public interface CustomerRepository extends JpaRepository<Customer, Integer> {

//     List<Customer> findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
//             String firstname,
//             String lastname
//     );
// }

package com.propms.repository;

import com.propms.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository
        extends JpaRepository<Customer, Integer> {

    List<Customer>
    findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
            String firstname,
            String lastname
    );

    List<Customer> findByStatus(String status);

    @Query("""
        SELECT c
        FROM Customer c
        WHERE c.status = 'ACTIVE'
        AND (
            LOWER(c.firstname) LIKE LOWER(CONCAT('%', :name, '%'))
            OR
            LOWER(c.lastname) LIKE LOWER(CONCAT('%', :name, '%'))
        )
    """)
    List<Customer> searchActiveCustomers(
            @Param("name") String name
    );

    @Query("""
        SELECT COUNT(c)
        FROM Customer c
        WHERE LOWER(c.firstname) <> 'admin'
        AND c.status = 'ACTIVE'
    """)
    Long countActualCustomers();
}

// package com.propms.repository;

// import com.propms.entity.Customer;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.stereotype.Repository;

// import java.util.List;

// @Repository
// public interface CustomerRepository
//         extends JpaRepository<Customer, Integer> {

//     List<Customer>
//     findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
//             String firstname,
//             String lastname
//     );

//     List<Customer> findByStatus(String status);

//     @Query("""
//         SELECT COUNT(c)
//         FROM Customer c
//         WHERE LOWER(c.firstname) <> 'admin'
//     """)
//     Long countActualCustomers();
// }
