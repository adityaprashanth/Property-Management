// package com.propms.controller;

// import com.propms.entity.Customer;
// import com.propms.repository.CustomerRepository;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;

// @RestController
// @RequestMapping("/api/documents")
// @CrossOrigin(origins = "http://localhost:3000")
// public class DocumentController {

//     private final CustomerRepository customerRepository;

//     public DocumentController(
//             CustomerRepository customerRepository
//     ) {
//         this.customerRepository = customerRepository;
//     }

//     @PostMapping("/upload/{customerId}")
//     public ResponseEntity<?> uploadDocument(
//             @PathVariable Integer customerId,
//             @RequestParam("file") MultipartFile file
//     ) {

//         try {

//             String uploadDir = "uploads/";

//             Files.createDirectories(
//                     Paths.get(uploadDir)
//             );

//             String fileName =
//                     customerId + "_" +
//                     file.getOriginalFilename();

//             Path path =
//                     Paths.get(uploadDir, fileName);

//             Files.write(
//                     path,
//                     file.getBytes()
//             );

//             Customer customer =
//                     customerRepository
//                             .findById(customerId)
//                             .orElseThrow();

//             customer.setDocs(fileName);

//             customerRepository.save(customer);

//             return ResponseEntity.ok(
//                     "Uploaded Successfully"
//             );

//         } catch (Exception e) {

//             return ResponseEntity.badRequest()
//                     .body(e.getMessage());

//         }
//     }
// }

package com.propms.controller;

import com.propms.entity.Customer;
import com.propms.entity.CustomerDocument;
import com.propms.repository.CustomerDocumentRepository;
import com.propms.repository.CustomerRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
//@CrossOrigin(origins = "http://localhost:3000")
// @CrossOrigin(origins = {
//     "http://localhost:3000",
//     "http://192.168.0.65:3000"
// })
public class DocumentController {

    private final CustomerRepository customerRepository;
    private final CustomerDocumentRepository documentRepository;

    public DocumentController(
            CustomerRepository customerRepository,
            CustomerDocumentRepository documentRepository
    ) {
        this.customerRepository = customerRepository;
        this.documentRepository = documentRepository;
    }

    @PostMapping("/upload/{customerId}")
    public ResponseEntity<?> uploadDocuments(
            @PathVariable Integer customerId,
            @RequestParam("files")
            MultipartFile[] files
    ) {

        try {

            Files.createDirectories(
                    Paths.get("uploads")
            );

            Customer customer =
                    customerRepository
                            .findById(customerId)
                            .orElseThrow();

            for (MultipartFile file : files) {

                String fileName =
                        System.currentTimeMillis()
                        + "_"
                        + file.getOriginalFilename();

                Path path =
                        Paths.get(
                                "uploads",
                                fileName
                        );

                Files.write(
                        path,
                        file.getBytes()
                );

                CustomerDocument doc =
                        new CustomerDocument();

                doc.setCustomer(customer);

                doc.setDocumentName(
                        file.getOriginalFilename()
                );

                doc.setFilePath(fileName);

                documentRepository.save(doc);
            }

            return ResponseEntity.ok(
                    "Documents uploaded"
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());

        }
    }

    @GetMapping("/customer/{customerId}")
    public List<CustomerDocument>
    getCustomerDocuments(
            @PathVariable Integer customerId
    ) {

        return documentRepository
                .findByCustomerCustomerId(
                        customerId
                );
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> deleteDocument(
            @PathVariable Integer documentId
    ) {

        try {

            CustomerDocument doc =
                    documentRepository
                            .findById(documentId)
                            .orElseThrow();

            Files.deleteIfExists(
                    Paths.get(
                            "uploads",
                            doc.getFilePath()
                    )
            );

            documentRepository.delete(doc);

            return ResponseEntity.ok(
                    "Deleted Successfully"
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());

        }
    }

    // @PostMapping("/upload")
    // public CustomerDocument upload(
    //         @RequestParam Integer customerId,
    //         @RequestParam MultipartFile file
    // )

    // @DeleteMapping("/{id}")
    // public void deleteDocument(
    //         @PathVariable Integer id
    // ) {
    //     repository.deleteById(id);
    // }
}
