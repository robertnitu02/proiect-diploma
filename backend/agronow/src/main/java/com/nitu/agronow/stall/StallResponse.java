package com.nitu.agronow.stall;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StallResponse {

    private Integer id;
    private String name;
    private String description;
    private String schedule;
    private String imageUrl;

    private String ownerFullName;
    private Integer ownerId;

    private String marketName;
    private Integer marketId;

}
