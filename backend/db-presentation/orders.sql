create table orders
(
    id            integer           not null
        primary key,
    accepted_date timestamp(6),
    address       varchar(32)       not null,
    delivery_date timestamp(6),
    order_date    timestamp(6)      not null,
    price         real              not null,
    products      varchar(255)      not null,
    status        integer default 0 not null,
    stall_id      integer
        constraint fkbv6cfn42y0vj7hd3bk01cgk45
            references stalls,
    user_id       integer
        constraint fk32ql8ubntj5uh44ph9659tiih
            references users
);

alter table orders
    owner to username;

INSERT INTO public.orders (id, accepted_date, address, delivery_date, order_date, price, products, status, stall_id, user_id) VALUES (2, null, 'Pucioasa, Republicii', null, '2025-06-05 17:57:41.539062', 3.5, '[{"id":0,"name":"Mere","quantity":1,"price":2.5}]', 0, 1, 1102);
INSERT INTO public.orders (id, accepted_date, address, delivery_date, order_date, price, products, status, stall_id, user_id) VALUES (1, '2025-06-05 17:57:58.236232', 'Pucioasa, Republicii', '2025-06-05 17:58:02.994156', '2025-06-05 17:57:24.157232', 3.5, '[{"id":0,"name":"Mere","quantity":1,"price":2.5}]', 2, 1, 1102);
INSERT INTO public.orders (id, accepted_date, address, delivery_date, order_date, price, products, status, stall_id, user_id) VALUES (52, null, 'Republicii, 41C', null, '2025-06-30 13:28:25.660027', 7.5, '[{"id":0,"name":"Mere","quantity":3,"price":2.5}]', 0, 3, 1302);
