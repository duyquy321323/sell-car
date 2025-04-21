import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import api from "../../api";
import AddIcon from "../../assets/AddIcon.svg";
import Hero from "../../components/Hero";
import MyMap from "../../components/MyMap";
import NumberInput from "../../components/NumberInput";
import "./SellCar.css";

const SellCar = () => {

    const [position, setPosition] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [featureList, setFeatureList] = useState([]);

    const breadcrumbList = [
        {
            path: "/home",
            name: "Trang chủ"
        },
        {
            path: "/sell-car",
            name: "Bán xe"
        },
    ]

    const features = featureList.map(item => item.name);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm({
        defaultValues: {
            title: "",
            condition: "NEW",
            year: "2025",
            capacity: 1,
            description: "",
            featureCodes: [],
            anotherFeature: "",
            address: "",
            price: null,
            images: []
        }
    });

    const selectedFeatures = watch("featureCodes") || [];
    const address = watch("address") || "";

    async function handleSellCar(data) {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("condition", data.condition);
        formData.append("year", data.year);
        formData.append("capacity", data.capacity);
        formData.append("description", data.description);
        const ftCodes = featureList.filter(feature => Array.from(data.featureCodes).includes(feature.name)).map(f => f.code);
        formData.append("featureCodes", ftCodes);
        formData.append("anotherFeature", data.anotherFeature);
        formData.append("address", data.address);
        formData.append("price", data.price);
        for (let i = 0; i < data.images.length; i++) {
            formData.append("images", data.images[i]);
        }
        try {
            await api.post("/car/sell", formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            })
        } catch (e) {
            console.error(e);
        }
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previews]);
    };

    const handleRemoveImage = (indexToRemove, field) => {
        const newPreviews = imagePreviews.filter((_, idx) => idx !== indexToRemove);
        setImagePreviews(newPreviews);

        const dataTransfer = new DataTransfer();
        Array.from(field.value).forEach((file, index) => {
            if (index !== indexToRemove) {
                dataTransfer.items.add(file);
            }
        });

        field.onChange(dataTransfer.files); // cập nhật field của react-hook-form
    };

    useEffect(() => {
        async function getFeatures() {
            try {
                const response = await api.get("/feature");
                setFeatureList(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        getFeatures()
    }, [])

    return (
        <>
            <Hero title="Bán xe" breadcrumbList={breadcrumbList} />
            <form onSubmit={handleSubmit(handleSellCar)} className="mx-32 max-2xl:mx-24 max-lg:mx-16 max-sm:mx-8">

                {/* car detail */}
                <section className="mt-section">
                    <h2>Chi tiết xe</h2>
                    <div className="car-detail__form mt-7 font-[16px] font[500]">
                        {/* tên xe */}
                        <div className="title grid w-full items-center gap-[8px]">
                            <Label htmlFor="title">Tên xe</Label>
                            <Input
                                {...register("title", { required: "Tên xe bắt buộc" })}
                                className="all-unset rounded-[3px] h-[48px] px-[16px] py-[15px] bg-(--Light-Secondary)"
                                type="text"
                                id="title"
                                placeholder="Tên xe"
                            />
                            {errors.title && <span className="error-field">{errors.title.message}</span>}
                        </div>

                        {/* điều kiện */}
                        <div className="condition flex flex-col gap-[8px] h-[48px]">
                            <Label>Điều kiện</Label>
                            <Controller
                                control={control}
                                defaultValue={"NEW"}
                                name="condition"
                                render={({ field }) =>
                                    <RadioGroup
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                        className="flex gap-[48px] font-[14px] font-[500]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="NEW" id="r1" />
                                            <Label htmlFor="r1">Mới</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="OLD" id="r2" />
                                            <Label htmlFor="r2">Đã sử dụng</Label>
                                        </div>
                                    </RadioGroup>
                                }
                            />

                            {errors.condition && <span className="error-field">{errors.condition.message}</span>}
                        </div>

                        {/* năm */}
                        <div className="year flex flex-col gap-[8px]">
                            <Label>Năm</Label>
                            <Controller
                                control={control}
                                name="year"
                                defaultValue={"2025"}
                                rules={{
                                    // Kiểm tra nếu "other" được chọn và không có giá trị trong input
                                    validate: (value) => {
                                        if (value === "other") {
                                            return "Vui lòng nhập năm"; // Trả về lỗi nếu chưa nhập năm
                                        }
                                        return true;
                                    },
                                }}
                                render={({ field }) =>
                                    !["2025", "2024", "2023", "2022", "2021"].includes(field.value) ?
                                        <Input className="all-unset bg-(--Light-Secondary) h-full" {...register("year")} placeholder="Nhập năm..." />
                                        :
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full text-[#fff] all-unset font-[14px] rounded-[3px] px-[16px] py-[15px] bg-(--Light-Secondary) h-[48px]">
                                                <SelectValue placeholder="Năm" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1D384C] rounded-[3px] text-white all-unset">
                                                <SelectGroup>
                                                    <SelectLabel className="text-(--Gray-2)">Năm</SelectLabel>
                                                    {["2025", "2024", "2023", "2022", "2021", "1999"].map(
                                                        (year) => (
                                                            <SelectItem
                                                                key={year}
                                                                value={year}
                                                                className="focus:bg-[#43647c] focus:text-white"
                                                            >
                                                                {year === "1999" ? "Khác" : year}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                }
                            />
                            {errors.year && <span className="error-field">{errors.year.message}</span>}
                        </div>

                        {/* sức chứa */}
                        <div className="capacity flex flex-col gap-[8px]">
                            <Label>Sức chứa</Label>
                            <Controller
                                defaultValue={1}
                                name="capacity"
                                control={control}
                                render={({ field }) =>
                                    <NumberInput className="capacity" onChange={field.onChange} name={field.name} value={field.value} />
                                }
                            />
                        </div>

                        {/* mô tả */}
                        <div className="description flex flex-col gap-[8px]">
                            <Label htmlFor="description">Mô tả</Label>
                            <Textarea
                                {...register("description")}
                                className="px-[16px] py-[14px] all-unset bg-(--Light-Secondary) rounded-[3px]"
                                placeholder="Mô tả"
                                id="description"
                            />
                        </div>
                    </div>
                </section>

                {/* feature */}
                <section className="mt-section">
                    <h2>Các tính năng</h2>
                    <Input className="h-12 all-unset bg-(--Light-Secondary) rounded-[3px] mt-7" type="text" placeholder="Tìm kiếm" />
                    <div className="grid-cols-4 grid mt-7 gap-y-3 font-medium text-[14px]">
                        {features.map((item, index) =>
                            <div className="flex items-center space-x-2" key={index}>
                                <Controller
                                    control={control}
                                    name="featureCodes"
                                    render={({ field }) => {
                                        const valueArray = field.value || [];

                                        return <Checkbox
                                            id={"feature" + index}
                                            checked={valueArray.includes(item)}
                                            onCheckedChange={(checked) => {
                                                const newValue = checked ? [...valueArray, item] : valueArray.filter(it => it !== item);
                                                field.onChange(newValue);
                                            }}

                                            className="cursor-pointer border-[2px]"
                                        />
                                    }}
                                />

                                <label
                                    htmlFor={"feature" + index}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {item}
                                </label>
                            </div>
                        )}
                    </div>
                    <Textarea
                        {...register("anotherFeature")}
                        className={
                            "all-unset bg-(--Light-Secondary) rounded-[3px] mt-7 h-[150px] transition-all duration-150 " +
                            (selectedFeatures.includes("Khác") ? "" : "hidden")
                        }
                        placeholder="Nhập thêm tính năng..."
                    />
                </section>

                {/* location */}
                <section className="mt-section">
                    <h2>Vị trí</h2>
                    <div className="mt-7">
                        <Label htmlFor="address" className="text-[16px]">Địa chỉ</Label>
                        <Input {...register("address")} className="all-unset bg-(--Light-Secondary) rounded-[3px] h-12 mt-2" id="address" placeholder="Địa chỉ" />
                    </div>
                    <Controller
                        name="address"
                        defaultValue={address}
                        control={control}
                        render={({ field }) => <MyMap className="mt-7" position={position} onChange={field.onChange} setPosition={setPosition} />}
                    />
                </section>

                {/* price */}
                <section className="mt-section">
                    <h2>Giá bán</h2>
                    <Label htmlFor="price" className="mt-7 text-[16px]">Giá</Label>
                    <div className={"flex items-center mt-2"} >
                        <div className="px-3 w-[52px] bg-(--Dark-Primary) flex justify-center items-center text-white h-[48px] border-none outline-none shadow-none">
                            VND
                        </div>
                        <input
                            {...register("price", { required: "Giá là bắt buộc" })}
                            type="number"
                            id="price"
                            className="no-spinner w-full border px-4 border-none outline-none shadow-none h-[48px] bg-[#152836]"
                            min={0}
                        />
                    </div>
                    {errors.price && <span className="error-field">{errors.price.message}</span>}
                </section>

                {/* image */}
                <section className="mt-section">
                    <h2>Ảnh</h2>
                    <div className="">
                        <div className="grid gap-2 mt-2 grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                            {imagePreviews.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-md overflow-hidden group"
                                >
                                    <img
                                        src={src}
                                        alt={`Preview ${index}`}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <Controller
                                        name="images"
                                        control={control}
                                        render={({ field }) => (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index, field)}
                                                className="absolute top-2 right-2 max-lg:top-1 max-lg:right-1 max-sm:top-0.5 max-sm:right-0.5 bg-gray-600/60 rounded-sm text-white cursor-pointer p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FaTrashAlt className="text-[25px] max-2xl:text-[20px] max-lg:text-[15px] max-sm:text-[5px] " />
                                            </button>
                                        )}
                                    />
                                </div>
                            ))}
                            <label htmlFor="images" className="block border-dashed border-[4px] border-(--Light-Secondary) h-[250px] max-2xl:h-[200px] max-lg:h-[150px] max-sm:h-[250px] bg-(--Dark-Secondary) rounded-md cursor-pointer flex items-center justify-center text-gray-500 text-sm hover:bg-black">
                                <img src={AddIcon} alt={"AddIcon"} />
                            </label>

                            <Controller
                                name="images"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Input
                                            id="images"
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => {
                                                field.onChange([...field.value, ...e.target.files]); // cập nhật react-hook-form
                                                handleImageChange(e); // cập nhật preview
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </section>
                <Button className="bg-(--Primary-Color) w-[664px] max-xl:w-lg max-lg:w-sm max-sm:w-full rounded-[3px] hover:bg-blue-400/60 text-[15px] my-20 font-[600] block mx-auto cursor-pointer h-12 text-white px-16 py-4" type="submit">Bán</Button>
            </form>
        </>
    );
};

export default SellCar;
