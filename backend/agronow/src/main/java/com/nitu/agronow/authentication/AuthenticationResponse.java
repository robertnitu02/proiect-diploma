package com.nitu.agronow.authentication;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationResponse {

    private Integer id;
    private String token;
    private Integer admin;
    private Integer marketId;
    private Integer stallId;

}
