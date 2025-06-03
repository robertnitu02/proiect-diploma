package com.nitu.agronow.order;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateOrderData {

    private Integer id;
    private Integer status;
    private Boolean shouldUpdateAcceptedDate;
    private Boolean shouldUpdateDeliveryDate;

}
