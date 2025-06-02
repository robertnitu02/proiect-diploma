package com.nitu.agronow.stall;

import com.nitu.agronow.market.Market;
import com.nitu.agronow.market.MarketResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("stalls")
@RequiredArgsConstructor
@Tag(name = "Stall")
public class StallController {

    private final StallService stallService;

    @PostMapping("/add")
    public ResponseEntity<?> addStall(@RequestBody Stall stall) {
        stallService.addStall(stall);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StallResponse> getStall(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(stallService.getStallById(id));
    }

    @GetMapping("/stalls-by-market/{id}")
    public ResponseEntity<List<StallResponse>> getStallsByMarketId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(stallService.getAllStallsByMarketId(id));
    }
}
