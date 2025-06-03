package com.nitu.agronow.request;

import com.nitu.agronow.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "requests")
@EntityListeners(AuditingEntityListener.class)
public class Request {

    @Id
    @GeneratedValue
    private Integer Id;
    private Integer type;
    private Integer status;
    private String message;
    private String links;
    private String imageUrl;
    private String reason;

    private LocalDateTime createdAt;
    private LocalDateTime answeredAt;

    @Transient
    private Integer requesterId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

}
