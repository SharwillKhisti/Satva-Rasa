package in.coredemo.satvarasabackend.config;

import in.coredemo.satvarasabackend.entity.Product;
import in.coredemo.satvarasabackend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repository) {
        return args -> {

            if (repository.count() > 0) return;

            repository.save(Product.builder()
                    .name("Product 1")
                    .category("Hair")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Neem, Amla, Bhringraj")
                    .price(499.0)
                    .stock(30)
                    .imageUrl("/images/products/img1.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 2")
                    .category("Hair")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Bhringraj, Coconut Oil, Amla")
                    .price(399.0)
                    .stock(40)
                    .imageUrl("/images/products/img2.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 3")
                    .category("Hair")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Rosemary Essential Oil")
                    .price(349.0)
                    .stock(25)
                    .imageUrl("/images/products/img3.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 4")
                    .category("Hair")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Hibiscus, Fenugreek, Aloe Vera")
                    .price(549.0)
                    .stock(18)
                    .imageUrl("/images/products/img4.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 5")
                    .category("Hair")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Tea Tree, Mint, Neem")
                    .price(379.0)
                    .stock(28)
                    .imageUrl("/images/products/img5.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 6")
                    .category("Hair")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Amla, Brahmi, Coconut Oil")
                    .price(599.0)
                    .stock(24)
                    .imageUrl("/images/products/img6.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 7")
                    .category("Skin")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Aloe Vera, Cucumber Extract")
                    .price(299.0)
                    .stock(35)
                    .imageUrl("/images/products/img7.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 8")
                    .category("Skin")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Kumkumadi Oil, Saffron, Sandalwood")
                    .price(649.0)
                    .stock(20)
                    .imageUrl("/images/products/img8.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 9")
                    .category("Skin")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Saffron, Rose, Jojoba Oil")
                    .price(699.0)
                    .stock(19)
                    .imageUrl("/images/products/img9.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 10")
                    .category("Skin")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Turmeric, Neem, Aloe Vera")
                    .price(449.0)
                    .stock(32)
                    .imageUrl("/images/products/img10.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 11")
                    .category("Skin")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Sandalwood, Almond Oil, Shea Butter")
                    .price(449.0)
                    .stock(22)
                    .imageUrl("/images/products/img11.jpg")
                    .build());

            repository.save(Product.builder()
                    .name("Product 12")
                    .category("Skin")
                    .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                    .ingredients("Rose, Sandalwood, Sesame Oil")
                    .price(549.0)
                    .stock(26)
                    .imageUrl("/images/products/img12.jpg")
                    .build());

            System.out.println("Satva Rasa: 12 products seeded successfully.");
        };
    }
}