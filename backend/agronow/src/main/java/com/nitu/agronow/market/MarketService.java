package com.nitu.agronow.market;

import com.nitu.agronow.user.User;
import com.nitu.agronow.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MarketService {

    private final MarketRepository marketRepository;
    private final UserRepository userRepository;

    public MarketService(MarketRepository marketRepository, UserRepository userRepository) {
        this.marketRepository = marketRepository;
        this.userRepository = userRepository;
    }

    public void addMarket(Market market) {
        User user = userRepository
                .findById(market.getOwnerId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Market finalMarket = new Market();
        finalMarket.setName(market.getName());
        finalMarket.setLocation(market.getLocation());
        finalMarket.setDescription(market.getDescription());
        finalMarket.setSchedule(market.getSchedule());
        finalMarket.setImageUrl(market.getImageUrl());
        finalMarket.setUser(user);

        marketRepository.save(finalMarket);

        user.setMarket(finalMarket);
        userRepository.save(user);
    }

    public List<MarketResponse> getAllMarkets() {
        List<Market> markets = marketRepository.findAll();

        if (markets.isEmpty()) {
            throw new EntityNotFoundException("No markets registered!");
        }

        return markets
                .stream()
                .map(this::toMarketResponse)
                .collect(Collectors.toList());
    }

    public MarketResponse getMarketById(int id) {
        return marketRepository.findById(id)
                .map(this::toMarketResponse)
                .orElseThrow(() -> new EntityNotFoundException("No market found with ID:: " + id));
    }

    private MarketResponse toMarketResponse(Market market) {
        return MarketResponse.builder()
                .id(market.getId())
                .name(market.getName())
                .description(market.getDescription())
                .location(market.getLocation())
                .description(market.getDescription())
                .schedule(market.getSchedule())
                .imageUrl(market.getImageUrl())
                .ownerFullName(market.getUser().getFullName())
                .ownerId(market.getUser().getId())
                .build();
    }
}
