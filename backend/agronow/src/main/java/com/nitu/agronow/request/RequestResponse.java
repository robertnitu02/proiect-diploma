package com.nitu.agronow.request;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestResponse {

    private Integer id;
    private Integer type;
    private Integer status;
    private String message;
    private String links;
    private String imageUrl;
    private String reason;

    private LocalDateTime createdAt;
    private LocalDateTime acceptedAt;

    private Integer userId;
    private String userFullName;
    private String userEmail;
    private String userImageUrl;

}
