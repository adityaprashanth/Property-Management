package com.propms.controller;

import com.propms.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
//@CrossOrigin(origins = "http://localhost:3000")
// @CrossOrigin(origins = {
//     "http://localhost:3000",
//     "http://192.168.0.65:3000"
// })
public class AdminController {

    private final AuthService authService;

    public AdminController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/customers")
    public ResponseEntity<?> createCustomer(
            @RequestBody Map<String, String> body) {

        try {

            return ResponseEntity.ok(
                    authService.signup(
                            body.get("email"),
                            body.get("password"),
                            body.get("firstname"),
                            body.get("lastname"),
                            body.get("phoneNo"),
                            body.get("address")
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));

        }
    }
}
