package com.propms.service;

import com.propms.entity.Customer;
import com.propms.entity.User;
import com.propms.repository.CustomerRepository;
import com.propms.repository.UserRepository;
// import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
// @RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       CustomerRepository customerRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public Map<String, Object> signup(String email, String rawPassword,
                                      String firstname, String lastname,
                                      String phoneNo, String address) {
        if (userRepository.existsByEmail(email))
            throw new RuntimeException("Email already registered.");

        Customer customer = new Customer();
        customer.setFirstname(firstname);
        customer.setLastname(lastname);
        customer.setPhoneNo(phoneNo);
        customer.setAddress(address);
        customer.setApproved(false);
        Customer saved = customerRepository.save(customer);

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole("CUSTOMER");
        user.setCustomerId(saved.getCustomerId());
        user.setCreatedBy(email);
        user.setLastUpdatedBy(email);
        userRepository.save(user);

        Map<String, Object> resp = new HashMap<>();
        resp.put("token",      jwtService.generateToken(email, "CUSTOMER"));
        resp.put("role",       "CUSTOMER");
        resp.put("customerId", saved.getCustomerId());
        resp.put("firstname",  firstname);
        return resp;
    }

    public Map<String, Object> login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        if (!passwordEncoder.matches(rawPassword, user.getPassword()))
            throw new RuntimeException("Invalid email or password.");

        String firstname = "User";
        if (user.getCustomerId() != null)
            firstname = customerRepository.findById(user.getCustomerId())
                    .map(Customer::getFirstname).orElse("User");

        Map<String, Object> resp = new HashMap<>();
        resp.put("token",      jwtService.generateToken(email, user.getRole()));
        resp.put("role",       user.getRole());
        resp.put("customerId", user.getCustomerId());
        resp.put("firstname",  firstname);
        return resp;
    }
}