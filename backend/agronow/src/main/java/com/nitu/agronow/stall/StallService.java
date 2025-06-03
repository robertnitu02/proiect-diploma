package com.nitu.agronow.stall;

import com.nitu.agronow.market.Market;
import com.nitu.agronow.market.MarketRepository;
import com.nitu.agronow.user.User;
import com.nitu.agronow.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StallService {

    private final StallRepository stallRepository;
    private final MarketRepository marketRepository;
    private final UserRepository userRepository;

    public StallService(StallRepository stallRepository, MarketRepository marketRepository, UserRepository userRepository) {
        this.stallRepository = stallRepository;
        this.marketRepository = marketRepository;
        this.userRepository = userRepository;
    }

    public void addStall(Stall stall) {
        User user = userRepository
                .findById(stall.getOwnerId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Market market = marketRepository
                .findById(stall.getMarketPlacedId())
                .orElseThrow(() -> new EntityNotFoundException("Market not found"));

        Stall finalStall = new Stall();
        finalStall.setName(stall.getName());
        finalStall.setDescription(stall.getDescription());
        finalStall.setImageUrl(stall.getImageUrl());
        finalStall.setProducts(stall.getProducts());
        finalStall.setSchedule(stall.getSchedule());

        finalStall.setMarket(market);
        finalStall.setUser(user);

        stallRepository.save(finalStall);

        user.setStall(finalStall);
        userRepository.save(user);
    }

    public List<StallResponse> getAllStallsByMarketId(Integer marketId) {
        List<StallResponse> stalls = stallRepository.findAll()
                .stream()
                .filter(stall -> stall.getMarket().getId().equals(marketId))
                .map(this::toStallResponse)
                .toList();

        if (stalls.isEmpty()) {
            throw new EntityNotFoundException("No stalls registered!");
        }

        return stalls;
    }

    public StallResponse getStallById(Integer id) {
        return stallRepository.findById(id)
                .map(this::toStallResponse)
                .orElseThrow(() -> new EntityNotFoundException("No stall found with ID:: " + id));
    }

    private StallResponse toStallResponse(Stall stall) {
        return StallResponse.builder()
                .id(stall.getId())
                .name(stall.getName())
                .description(stall.getDescription())
                .schedule(stall.getSchedule())
                .imageUrl(stall.getImageUrl())
                .products(stall.getProducts())
                .ownerFullName(stall.getUser().getFullName())
                .ownerId(stall.getUser().getId())
                .marketName(stall.getMarket().getName())
                .marketId(stall.getMarket().getId())
                .build();
    }
}
