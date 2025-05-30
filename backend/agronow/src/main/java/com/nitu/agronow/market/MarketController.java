package com.nitu.agronow.market;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("markets")
@RequiredArgsConstructor
@Tag(name = "Market")
public class MarketController {

    private final MarketService marketService;

    @PostMapping("/add")
    public ResponseEntity<?> addMarket(@RequestBody Market market) {
        marketService.addMarket(market);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarketResponse> getMarket(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(marketService.getMarketById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<MarketResponse>> getAllMarkets() {
        return ResponseEntity.ok(marketService.getAllMarkets());
    }

}
