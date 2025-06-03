package com.nitu.agronow.order;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {

    private Integer id;
    private String products;
    private String address;
    private Float price;
    private Integer status;

    private LocalDateTime orderDate;
    private LocalDateTime acceptedDate;
    private LocalDateTime deliveryDate;

    private String marketName;
    private Integer marketId;

    private String stallName;
    private Integer stallId;

}
