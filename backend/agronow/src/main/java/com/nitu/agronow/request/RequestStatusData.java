package com.nitu.agronow.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestStatusData {

    private Integer id;
    private RequestStatus Status;
    private String reason;

}
