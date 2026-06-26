// // // package com.propms.repository;

// // // import com.propms.entity.Payment;
// // // import org.springframework.data.jpa.repository.JpaRepository;
// // // import org.springframework.stereotype.Repository;

// // // import java.util.List;

// // // public interface PaymentRepository extends JpaRepository<Payment, Integer> {

// // //     List<Payment> findByCustomerCustomerId(Integer customerId);

// // // }

// // // @Repository
// // // public interface PaymentRepository
// // //         extends JpaRepository<Payment, Integer> {
// // // }

// // package com.propms.repository;

// // import com.propms.entity.Payment;
// // import org.springframework.data.jpa.repository.JpaRepository;
// // import org.springframework.stereotype.Repository;

// // import java.util.List;

// // @Repository
// // public interface PaymentRepository
// //         extends JpaRepository<Payment, Integer> {

// //     List<Payment> findByCustomerCustomerId(
// //             Integer customerId
// //     );
// // }

// package com.propms.repository;

// import com.propms.entity.Payment;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.stereotype.Repository;

// import java.util.List;

// @Repository
// public interface PaymentRepository
//         extends JpaRepository<Payment, Integer> {

//     List<Payment> findByCustomerCustomerId(
//             Integer customerId
//     );

//     @Query("""
//         SELECT COALESCE(SUM(p.amount), 0)
//         FROM Payment p
//     """)
//     Double getTotalPayments();
// }

package com.propms.repository;

import com.propms.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

// import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PaymentRepository
        extends JpaRepository<Payment, Integer> {

    List<Payment> findByCustomerCustomerId(
            Integer customerId
    );

    // List<Payment>
    // findByCustomerCustomerIdAndPaymentDateBetween(
    //         Integer customerId,
    //         LocalDate fromDate,
    //         LocalDate toDate
    // );
    List<Payment>
    findByCustomerCustomerIdAndPaymentDateBetween(
            Integer customerId,
            LocalDateTime fromDate,
            LocalDateTime toDate
    );

    @Query("""
        SELECT COALESCE(SUM(p.amount), 0)
        FROM Payment p
    """)
    Double getTotalPayments();
}
