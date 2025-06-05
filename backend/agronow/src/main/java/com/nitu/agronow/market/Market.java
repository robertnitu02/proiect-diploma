package com.nitu.agronow.market;

import com.nitu.agronow.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.security.Principal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "markets")
@EntityListeners(AuditingEntityListener.class)
public class Market implements Principal {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(nullable = false, length = 16)
    private String name;
    @Column(nullable = false, length = 64)
    private String location;
    @Column(nullable = false, length = 64)
    private String description;
    @Column(nullable = false, length = 16)
    private String schedule;
    @Column(nullable = false, length = 64)
    private String imageUrl;

    @Transient
    private Integer ownerId;

    @OneToOne
    @JoinColumn(name = "userId", nullable = true)
    private User user;
}
