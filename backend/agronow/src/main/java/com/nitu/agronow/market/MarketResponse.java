package com.nitu.agronow.market;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarketResponse {

    private Integer id;
    private String name;
    private String location;
    private String description;
    private String schedule;
    private String imageUrl;

    private String ownerFullName;
    private Integer ownerId;

}
