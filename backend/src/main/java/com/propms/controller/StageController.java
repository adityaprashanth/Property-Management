// // package com.propms.controller;

// // import com.propms.entity.CustomerStage;
// // import com.propms.repository.CustomerStageRepository;
// // import org.springframework.web.bind.annotation.*;

// // @RestController
// // @RequestMapping("/api/stages")
// // @CrossOrigin(origins = "http://localhost:3000")
// // public class StageController {

// //     private final CustomerStageRepository repository;

// //     public StageController(
// //             CustomerStageRepository repository
// //     ) {
// //         this.repository = repository;
// //     }

// //     @GetMapping("/customer/{customerId}")
// //     public CustomerStage getStage(
// //             @PathVariable Integer customerId
// //     ) {
// //         return repository.findByCustomerCustomerId(
// //                 customerId
// //         );
// //     }
// // }

// package com.propms.controller;

// import com.propms.entity.CustomerStage;
// import com.propms.entity.Stage;
// import com.propms.repository.CustomerStageRepository;
// import com.propms.repository.StageRepository;

// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/stages")
// @CrossOrigin(origins = "http://localhost:3000")
// public class StageController {

//     private final CustomerStageRepository repository;
//     private final StageRepository stageRepository;

//     public StageController(
//             CustomerStageRepository repository,
//             StageRepository stageRepository
//     ) {
//         this.repository = repository;
//         this.stageRepository = stageRepository;
//     }

//     @GetMapping("/customer/{customerId}")
//     public CustomerStage getStage(
//             @PathVariable Integer customerId
//     ) {
//         return repository.findByCustomerCustomerId(
//                 customerId
//         );
//     }

//     @PutMapping("/{customerId}")
//     public CustomerStage updateStage(
//             @PathVariable Integer customerId,
//             @RequestBody Integer stageId
//     ) {

//         CustomerStage cs =
//                 repository.findByCustomerCustomerId(
//                         customerId
//                 );

//         Stage stage =
//                 stageRepository.findById(stageId)
//                         .orElseThrow();

//         cs.setStage(stage);

//         return repository.save(cs);
//     }
// }


package com.propms.controller;

import com.propms.entity.CustomerStage;
import com.propms.entity.Stage;
import com.propms.repository.CustomerStageRepository;
import com.propms.repository.StageRepository;
import com.propms.dto.StageUpdateRequest;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stages")
@CrossOrigin(origins = "http://localhost:3000")
public class StageController {

    private final CustomerStageRepository repository;
    private final StageRepository stageRepository;

    public StageController(
            CustomerStageRepository repository,
            StageRepository stageRepository
    ) {
        this.repository = repository;
        this.stageRepository = stageRepository;
    }

    @GetMapping
    public List<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    @GetMapping("/customer/{customerId}")
    public CustomerStage getStage(
            @PathVariable Integer customerId
    ) {
        return repository.findByCustomerCustomerId(
                customerId
        );
    }

    @PutMapping("/{customerId}")
    public CustomerStage updateStage(
            @PathVariable Integer customerId,
            @RequestBody StageUpdateRequest request
    ) {

        CustomerStage cs =
                repository.findByCustomerCustomerId(
                        customerId
                );

        Stage stage =
                stageRepository
                        .findById(
                                request.getStageId()
                        )
                        .orElseThrow();

        cs.setStage(stage);

        return repository.save(cs);
    }
}
// @RestController
// @RequestMapping("/api/stages")
// @CrossOrigin(origins = "http://localhost:3000")
// public class StageController {

//     private final CustomerStageRepository repository;
//     private final StageRepository stageRepository;

//     public StageController(
//             CustomerStageRepository repository,
//             StageRepository stageRepository
//     ) {
//         this.repository = repository;
//         this.stageRepository = stageRepository;
//     }

//     @GetMapping("/customer/{customerId}")
//     public CustomerStage getStage(
//             @PathVariable Integer customerId
//     ) {
//         return repository.findByCustomerCustomerId(
//                 customerId
//         );
//     }

//     @PutMapping("/{customerId}")
//     public CustomerStage updateStage(
//             @PathVariable Integer customerId,
//             // @RequestBody Integer stageId
//             @RequestBody StageUpdateRequest request
//     ) {

//         CustomerStage cs =
//                 repository.findByCustomerCustomerId(
//                         customerId
//                 );

//         // Stage stage =
//         //         stageRepository.findById(stageId)
//         //                 .orElseThrow();
//         Stage stage =
//         stageRepository
//                 .findById(
//                         request.getStageId()
//                 )
//                 .orElseThrow();

//         cs.setStage(stage);

//         return repository.save(cs);
//     }
// }
