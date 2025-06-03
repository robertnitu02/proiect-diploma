package com.nitu.agronow.order;

import com.nitu.agronow.market.Market;
import com.nitu.agronow.stall.Stall;
import com.nitu.agronow.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.security.Principal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Orders")
@EntityListeners(AuditingEntityListener.class)
public class Order  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String products;
    private String address;
    private Float price;
    private Integer status;

    private LocalDateTime orderDate;
    private LocalDateTime acceptedDate;
    private LocalDateTime deliveryDate;

    @Transient
    private Integer requesterId;

    @Transient
    private Integer stallId;

    @ManyToOne
    @JoinColumn(name = "stallId", nullable = true)
    private Stall stall;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = true)
    private User user;
}
