CREATE DATABASE ozbargain;

create table deals(
    id serial primary key,
    title text,
    original_price numeric(10,2),
    sale_price numeric(10,2),
    merchant text,
    coupon text,
    url text,
    image_url text,
    start_date date,
    end_date date,
    category text,
    description text
);

