package com.propms.controller;

import com.propms.entity.Photo;
import com.propms.repository.PhotoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
@CrossOrigin(origins = "http://localhost:3000")
public class PhotoController {

    private final PhotoRepository photoRepository;

    public PhotoController(
            PhotoRepository photoRepository
    ) {
        this.photoRepository = photoRepository;
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
}
