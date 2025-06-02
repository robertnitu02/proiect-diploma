package com.nitu.agronow.request;

import com.nitu.agronow.market.MarketResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("requests")
@RequiredArgsConstructor
@Tag(name = "Request")
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/add")
    public ResponseEntity<?> addRequest(@RequestBody Request request) {
        requestService.addRequest(request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestResponse> getRequest(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<RequestResponse>> getAllRequests() {
        return ResponseEntity.ok(requestService.getRequests());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<RequestResponse>> getRequestsByUserId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(requestService.getRequestsByUserId(id));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateRequestStatus(@RequestBody RequestStatusData requestStatusData) {
        requestService.setRequestStatus(requestStatusData);
        return ResponseEntity.accepted().build();
    }

}
