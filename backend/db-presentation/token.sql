create table token
(
    id           integer      not null
        primary key,
    created_at   timestamp(6) not null,
    expired_at   timestamp(6) not null,
    token        varchar(8)   not null,
    validated_at timestamp(6),
    user_id      integer      not null
        constraint fkj8rfw4x0wjjyibfqq566j4qng
            references users
);

alter table token
    owner to username;

INSERT INTO public.token (id, created_at, expired_at, token, validated_at, user_id) VALUES (802, '2025-06-05 17:55:55.881315', '2025-06-05 18:25:55.881315', '596559', '2025-06-05 17:56:07.375259', 1102);
INSERT INTO public.token (id, created_at, expired_at, token, validated_at, user_id) VALUES (852, '2025-06-07 15:35:06.349276', '2025-06-07 16:05:06.349798', '000099', null, 1152);
INSERT INTO public.token (id, created_at, expired_at, token, validated_at, user_id) VALUES (853, '2025-06-07 15:35:15.793287', '2025-06-07 16:05:15.793287', '361274', null, 1153);
INSERT INTO public.token (id, created_at, expired_at, token, validated_at, user_id) VALUES (902, '2025-06-09 00:08:08.052457', '2025-06-09 00:38:08.052457', '903375', null, 1202);
INSERT INTO public.token (id, created_at, expired_at, token, validated_at, user_id) VALUES (952, '2025-06-16 19:55:06.810513', '2025-06-16 20:25:06.810513', '788885', null, 1252);
INSERT INTO public.token (id, created_at, expired_at, token, validated_at, user_id) VALUES (1002, '2025-06-30 13:25:13.776831', '2025-06-30 13:55:13.776831', '561236', '2025-06-30 13:26:37.521989', 1302);
