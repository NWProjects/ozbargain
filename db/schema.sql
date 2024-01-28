CREATE DATABASE ozbargain;

CREATE TABLE deals (
    id serial primary key,
    title text,
    original_price numeric(10, 2),
    sale_price numeric(10, 2),
    merchant text,
    coupon text,
    url text,
    image_url text,
    start_date text,
    end_date text,
    category text,
    description text
);

INSERT INTO deals (title, original_price, sale_price, merchant, coupon, url, image_url, start_date, end_date, category, description)
VALUES ('Coleman Instant Up Darkroom 6P Tent', 699.99, 349, 'Anaconda', NULL, 'https://www.anacondastores.com/camping-hiking/tents/family-tents/coleman-instant-up-darkroom-6p-tent/BP90112212-grey-blue-lime', 'https://www.anacondastores.com/medias/BP90112212-grey-blue-lime.jpg-SPOTWF-productHero?context=bWFzdGVyfGltYWdlc3w1ODI4OHxpbWFnZS9qcGVnfGltYWdlcy9oMWMvaDE4LzEwMDk1MjMwMzg2MjA2L0JQOTAxMTIyMTItZ3JleS1ibHVlLWxpbWUuanBnX1NQT1RXRl9wcm9kdWN0SGVyb3wyMzllNmFmNzI3NjBlZTljYzZh', '2024-01-23', '2024-01-30', 'Sports & Outdoors', 'Thought this was worth sharing as it is  half price.Does anyone have experience with this model and is it worth paying more for better quality options (canvas etc).');

INSERT INTO deals (title, original_price, sale_price, merchant, coupon, url, image_url, start_date, end_date, category, description)
VALUES ('iPhone 15 Pro 128GB', 1737, 1849, 'Amazon AU', NULL, 'https://www.amazon.com.au/dp/B0CHXCF939', 'https://www.retravision.com.au/img/paths/images/products/d7c3ecb60bc7c177ea27bd21a38ca679-trimmed-minh_848.jpg/9f9a7d21e98762db76bd1ea726861ec2.jpg', '2024-01-23', '2024-01-30', 'Mobile', 'Taking a sliver off the price that is on offer at JB.
Link above directs to the 128GB version of the Natural Titanium which shows only 1 left in stock (with more on the way), but the other 3 colourways are all listed as in stock.
256GB versions are going for $1,937512GB versions are going for $2,287 (except for White Titanium, which is sold out)1TB versions are going for $2,637 ($2,647 if you are Natural Titanium)
iPhone 15 Pro Max variants256GB versions are going for $2,087512GB versions are going for $2,4371TB versions are going for the incremental increases in your average monthly mortgage repayments with every RBA rate announcement
Try your luck to see if JB/OW will price match and stack whatever gift cards you can.');

INSERT INTO deals (title, original_price, sale_price, merchant, coupon, url, image_url, start_date, end_date, category, description)
VALUES ('GAMING PC: INTEL CORE I9-14900KF RTX 4090 24GB DDR5 DESKTOP - FEB', 5099, 4599, 'TechFast', '14900KF-4090-FEB', 'https://www.techfast.com.au/products/Gaming-PC-Intel-Core-i9-14900KF-RTX-4090-24GB-DDR5-Desktop-JAN', 'https://www.techfast.com.au/assets/images/configs/454.png', '2024-01-23', '2024-01-30', 'Computing', 'Howdy Legends, We are getting in early on the Feb deals and have a few different configs up for grabs. This time we are in the mid to high tier neck of the woods. Bringing back these popular beastly i9 & AM5 X3D 4090 systems. We have secured stock to finalize any pre-existing with a bit extra on top for these deals. Return of the Classic RTX 3080 Paired with the 5700X for a nice budget high tier build. And a cutla budget bad boys, sporting the RTX 4060 paired with either the i5-12400F or the R5 5500. We are pretty much through the BD/January orders as of now, and for anything outstanding from early JAN/BD, we have sent an update via email. Intel Core i9 14900KF | RTX 4090 Gaming PC(techfast.com.au): $4399 after 14900KF-4090-FEB Intel Core i9 14900KF processor RTX 4090 (PNY Mainly) 360mm Liquid Cooler (primarily Antec Vortex in use) ASRock Z790 Lightning WiFi 32GB 5200MHz RAM (Kingston Mainly) 1TB Gen 4 NVMe SSD (ADATA and Kingston in use) 850W 80 Plus Gold PSU Antec P20C case.');

CREATE TABLE users (
    id serial primary key,
    email text,
    password_digest text
);