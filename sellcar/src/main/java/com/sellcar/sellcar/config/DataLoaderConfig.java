// package com.sellcar.sellcar.config;

// import java.io.FileNotFoundException;
// import java.io.IOException;
// import java.io.InputStream;
// import java.security.Principal;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Locale;
// import java.util.Random;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Component;
// import org.springframework.transaction.annotation.Transactional;
// import org.springframework.web.multipart.MultipartFile;

// import com.sellcar.sellcar.entity.Admin;
// import com.sellcar.sellcar.entity.Car;
// import com.sellcar.sellcar.entity.Dealer;
// import com.sellcar.sellcar.entity.Evaluate;
// import com.sellcar.sellcar.entity.Feature;
// import com.sellcar.sellcar.entity.Member;
// import com.sellcar.sellcar.entity.User;
// import com.sellcar.sellcar.repository.AdminRepository;
// import com.sellcar.sellcar.repository.CarRepository;
// import com.sellcar.sellcar.repository.DealerRepository;
// import com.sellcar.sellcar.repository.EvaluateRepository;
// import com.sellcar.sellcar.repository.FeatureRepository;
// import com.sellcar.sellcar.repository.MemberRepository;
// import com.sellcar.sellcar.repository.UserRepository;
// import com.sellcar.sellcar.request.SellCarRequest;
// import com.sellcar.sellcar.service.CarService;
// import com.sellcar.sellcar.utils.ByteArrayToMultipartFileExample;

// import net.datafaker.Faker;

// @Component
// public class DataLoaderConfig implements CommandLineRunner {

//     @Autowired
//     private FeatureRepository featureRepository;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private AdminRepository adminRepository;

//     @Autowired
//     private MemberRepository memberRepository;

//     @Autowired
//     private DealerRepository dealerRepository;

//     @Autowired
//     private EvaluateRepository evaluateRepository;

//     @Autowired
//     private UserDetailsService userDetailsService;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @Autowired
//     private CarRepository carRepository;

//     @Autowired
//     private CarService carService;

//     private final Random RANDOM = new Random();

//     public <T extends Enum<?>> T randomEnum(Class<T> clazz) {
//         int x = RANDOM.nextInt(clazz.getEnumConstants().length);
//         return clazz.getEnumConstants()[x];
//     }

//     @Override
//     @Transactional
//     public void run(String... args) throws Exception {
//         Faker faker = new Faker(new Locale("vi"));

//         for(int i = 0; i < 20; i ++){
//             int randomRole = RANDOM.nextInt(0, 3);
//             if(randomRole == 0){
//                 adminRepository.save(
//                     Admin.builder()
//                     .email(faker.internet().emailAddress())
//                     .fullName(faker.name().fullName())
//                     .password(passwordEncoder.encode("321323"))
//                     .phoneNumber(faker.phoneNumber().phoneNumber())
//                     .build()
//                     );
//             } else if (randomRole == 1){
//                 dealerRepository.save(
//                     Dealer.builder()
//                     .email(faker.internet().emailAddress())
//                     .fullName(faker.name().fullName())
//                     .password(passwordEncoder.encode("321323"))
//                     .phoneNumber(faker.phoneNumber().phoneNumber())
//                     .build()
//                     );
//             } else {
//                 memberRepository.save(
//                     Member.builder()
//                     .email(faker.internet().emailAddress())
//                     .fullName(faker.name().fullName())
//                     .password(passwordEncoder.encode("321323"))
//                     .phoneNumber(faker.phoneNumber().phoneNumber())
//                     .build()
//                     );
//             }
//         }
//         List<Feature> featuress = featureRepository.findAll();

//         for(int i = 0; i < 50; i ++ ){
//             int featureQuantity = RANDOM.nextInt(0, featuress.size());
//             List<String> featureCodeList = new ArrayList<>();
//             for(int j = 0; j < featureQuantity; j ++){
//                 int featureId = RANDOM.nextInt(0, featuress.size());
//                 featureCodeList.add(featuress.get(featureId).getCode());
//             }

//             int imageQuantity = RANDOM.nextInt(2, 7);
//             List<MultipartFile> imageFiles = new ArrayList<>();
//             for(int j = 0; j < imageQuantity; j ++ ){
//                 byte[] imageByte = imageToByteArray(
//                     String.format(
//                             "static/car%d.jpg",
//                             faker.number().numberBetween(1, 11)));
//                 imageFiles.add(ByteArrayToMultipartFileExample.parse(imageByte));
//             }
//             SellCarRequest request = SellCarRequest.builder()
//                           .address(faker.address().fullAddress())
//                           .capacity(RANDOM.nextInt(4, 13))
//                           .condition(RANDOM.nextInt(0, 2) == 0? "NEW" : "OLD")
//                           .description(faker.lorem().paragraph(10))
//                           .featureCodes(featureCodeList)
//                           .price(RANDOM.nextLong(1000000000L, 6000000001L))
//                           .title(faker.vehicle().manufacturer() + " " + faker.vehicle().model())
//                           .year(String.valueOf(RANDOM.nextInt(1990, 2026)))
//                           .images(imageFiles)
//                           .build();
//             User user = userRepository.findById(RANDOM.nextInt(1, 21)).get();
//             UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
//             Principal principal = (Principal) userDetails;
//             carService.sellCar(request, principal);
//         }

//         List<Car> cars = carRepository.findAll();
//         List<User> users = userRepository.findAll();

//         for (int i = 0; i < 1000; i ++ ){
//             evaluateRepository.save(
//                 Evaluate.builder().rate(RANDOM.nextInt(3, 6)).car(cars.get(RANDOM.nextInt(0, 50))).user(users.get(RANDOM.nextInt(0, 20))).build()
//             );
//         }
//     }

//     private static byte[] imageToByteArray(String imagePath) throws IOException {
//         try (InputStream is = DataLoaderConfig.class.getClassLoader().getResourceAsStream(imagePath)) {
//             if (is == null) {
//                 throw new FileNotFoundException("File not found: " + imagePath);
//             }
//             // Đọc InputStream thành byte[]
//             return is.readAllBytes();
//         }
//     }
// }