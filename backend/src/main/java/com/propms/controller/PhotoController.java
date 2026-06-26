package com.propms.controller;

import com.propms.entity.Photo;
import com.propms.repository.PhotoRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import com.propms.entity.Customer;
import com.propms.repository.CustomerRepository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.util.UUID;

@RestController
@RequestMapping("/api/photos")
@CrossOrigin(origins = "http://localhost:3000")
public class PhotoController {

    // private final PhotoRepository photoRepository;
    private final PhotoRepository photoRepository;
    private final CustomerRepository customerRepository;

    // public PhotoController(
    //         PhotoRepository photoRepository
    // ) {
    //     this.photoRepository = photoRepository;
    // }
    public PhotoController(
            PhotoRepository photoRepository,
            CustomerRepository customerRepository
    ) {
        this.photoRepository = photoRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/customer/{id}")
    public List<Photo> getPhotos(
            @PathVariable Integer id
    ) {

        return photoRepository
                .findTop10ByCustomerCustomerIdOrderByPhidDesc(
                        id
                );
    }

    @PostMapping("/upload/{customerId}")
    public void uploadPhotos(
            @PathVariable Integer customerId,
            @RequestParam("files") MultipartFile[] files
    ) throws Exception {
        Customer customer =
                customerRepository
                        .findById(customerId)
                        .orElseThrow();
        Path uploadDir =
                Paths.get("photo_upload");
        Files.createDirectories(uploadDir);
        for (MultipartFile file : files) {
            String filename =
                    UUID.randomUUID()
                            + "_"
                            + file.getOriginalFilename();
            Path target =
                    uploadDir.resolve(filename);
            Files.copy(
                    file.getInputStream(),
                    target,
                    StandardCopyOption.REPLACE_EXISTING
            );
            Photo photo = new Photo();
            photo.setCustomer(customer);
            photo.setPhotoPath(filename);
            photo.setType("SITE");
            photo.setPrint(false);
            photoRepository.save(photo);
        }
    }

    @DeleteMapping("/{id}")
    public void deletePhoto(
            @PathVariable Integer id
    ) {
        photoRepository.deleteById(id);
    }

}
