package com.sellcar.sellcar.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sellcar.sellcar.converter.CarConverter;
import com.sellcar.sellcar.dto.FeatureDTO;
import com.sellcar.sellcar.entity.Car;
import com.sellcar.sellcar.entity.CarImage;
import com.sellcar.sellcar.entity.Evaluate;
import com.sellcar.sellcar.entity.Feature;
import com.sellcar.sellcar.entity.User;
import com.sellcar.sellcar.enumerate.ConditionCarCode;
import com.sellcar.sellcar.exception.NotFoundException;
import com.sellcar.sellcar.repository.CarImageRepository;
import com.sellcar.sellcar.repository.CarRepository;
import com.sellcar.sellcar.repository.EvaluateRepository;
import com.sellcar.sellcar.repository.FeatureRepository;
import com.sellcar.sellcar.repository.UserRepository;
import com.sellcar.sellcar.request.SearchCarRequest;
import com.sellcar.sellcar.request.SellCarRequest;
import com.sellcar.sellcar.response.CarDetailResponse;
import com.sellcar.sellcar.response.SearchCarResponse;
import com.sellcar.sellcar.response.TrainingResponse;
import com.sellcar.sellcar.service.CarService;
import com.sellcar.sellcar.utils.ImageComponent;

import lombok.SneakyThrows;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    private CarConverter carConverter;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private CarImageRepository carImageRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ImageComponent imageComponent;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EvaluateRepository evaluateRepository;

    @Override
    public void sellCar(SellCarRequest request, Authentication authentication) {
        Car car = carConverter.sellCarRequestToCar(request); // map sang car
        Set<Feature> features = new HashSet<>(featureRepository.findByCodeIn(request.getFeatureCodes()));

        // trường hợp người dùng có viết thêm tính năng khác với tính năng có sẵn
        if (request.getAnotherFeature() != null && !request.getAnotherFeature().isEmpty()) {
            Feature another = featureRepository
                    .save(Feature.builder().name(request.getAnotherFeature()).code("OTHER").build());
            features.add(another);
        }

        List<String> urlImages = uploadFiles(request.getImages());
        car.getFeatures().addAll(features);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("Tài khoản không tồn tại!!!"));
        car.setUser(user);
        Car newCar = carRepository.save(car);
        List<CarImage> carImages = urlImages.stream()
                .map(urlImage -> CarImage.builder().imageUrl(urlImage).car(newCar).build())
                .collect(Collectors.toList());
        carImages = carImageRepository.saveAll(carImages);
    }

    @Override
    public CarDetailResponse getCarById(Integer id) {
        Optional<Car> carOp = carRepository.findById(id);
        if (carOp.isPresent()) {
            Car car = carOp.get();
            return carConverter.carToCarDetailResponse(car);
        }
        throw new NotFoundException("Xe không tồn tại hoặc đã bị xóa!!!");
    }

    @Override
    @SneakyThrows // lén ném ra exception mà không phải throws hay try-catch
    public Page<SearchCarResponse> searchCar(SearchCarRequest request, Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Car> cars = carRepository.findBySearchCarRequest(request, pageable);

        // Thêm số lượng đánh giá, đánh giá trung bình và ảnh main của xe
        List<SearchCarResponse> resultList = cars.stream().map(car -> {
            SearchCarResponse searchCarResponse = carConverter.carToSearchCarResponse(car);
            List<Evaluate> evaluates = evaluateRepository.findByCar_Id(car.getId()); // lấy tất cả đánh giá của xe
            Double rates = 0.0;
            for (Evaluate evaluate : evaluates) {
                rates += evaluate.getRate();
            }
            List<CarImage> carImages = carImageRepository.findByCar_Id(car.getId());
            searchCarResponse.setQuantityEvaluate(evaluates.size());
            searchCarResponse.setRates(rates / evaluates.size());

            // lấy bức ảnh đầu tiên tìm được làm poster
            searchCarResponse.setFirstImage(carImages.size() > 0 ? carImages.getFirst().getImageUrl() : "");
            return searchCarResponse;
        }).collect(Collectors.toList());

        // chuyển từ list về lại page
        return new PageImpl<>(resultList, pageable, cars.getTotalElements());
    }

    // tải nhiều ảnh lên và trả về danh sách link
    private List<String> uploadFiles(List<MultipartFile> files) {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            urls.add(imageComponent.uploadImage(file));
        }
        return urls;
    }

    @Override
    public List<TrainingResponse> getTrainingData() {
        List<SearchCarResponse> searchCarResponses = searchCar(new SearchCarRequest(), 0, -1).getContent(); // lấy tất
                                                                                                            // cả xe
        List<TrainingResponse> trainingResponses = new ArrayList<>();
        for (SearchCarResponse searchCarResponse : searchCarResponses) {
            List<FeatureDTO> featureDTOs = featureRepository.findByCar_Id(searchCarResponse.getId()).stream()
                    .map(feature -> FeatureDTO.builder().code(feature.getCode()).id(feature.getId())
                            .name(feature.getName()).build())
                    .collect(Collectors.toList());

            // dữ liệu huấn luyện AI bao gồm thông tin của xe (searchCarResponse) và các
            // tính năng của xe
            TrainingResponse trainingResponse = TrainingResponse.builder()
                    .searchCarResponse(searchCarResponse)
                    .featureDTOs(featureDTOs)
                    .build();

            trainingResponses.add(trainingResponse);
        }
        return trainingResponses;
    }

    @Override
    public List<SearchCarResponse> getRecommendCars(ConditionCarCode condition) {
        Pageable pageable = PageRequest.of(0, 3);
        List<Car> recommendCars = carRepository.findRecommendCars(condition, pageable);
        return recommendCars.stream().map(car -> {
            SearchCarResponse searchCarResponse = carConverter.carToSearchCarResponse(car);
            List<Evaluate> evaluates = evaluateRepository.findByCar_Id(car.getId()); // lấy tất cả đánh giá của xe
            Double rates = 0.0;
            for (Evaluate evaluate : evaluates) {
                rates += evaluate.getRate();
            }
            List<CarImage> carImages = carImageRepository.findByCar_Id(car.getId());
            searchCarResponse.setQuantityEvaluate(evaluates.size());
            searchCarResponse.setRates(rates / evaluates.size());

            // lấy bức ảnh đầu tiên tìm được làm poster
            searchCarResponse.setFirstImage(carImages.size() > 0 ? carImages.getFirst().getImageUrl() : "");
            return searchCarResponse;
        }).collect(Collectors.toList());
    }

}