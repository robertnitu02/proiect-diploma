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
    @Column(nullable = false)
    private Integer type;
    @Column(nullable = false)
    private Integer status;
    @Column(nullable = false, length = 512)
    private String message;
    @Column(nullable = false, length = 255)
    private String links;
    @Column(nullable = false, length = 64)
    private String imageUrl;
    @Column(nullable = false, length = 126)
    private String reason;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = true)
    private LocalDateTime answeredAt;

    @Transient
    private Integer requesterId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

}
