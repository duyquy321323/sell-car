import api from "../../api";

import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = "AIzaSyDUwwNU_Jyxw5VQNVuAHLHvVeMF6KWDXRo";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  async function getCarData() {
    try{
        const response = await api.get('/car/training');
        console.log(response)
        const data = response.data;
        return data.map(car => 
          `Tên xe: ${car.searchCarResponse.title}, 
          Xe cũ hoặc mới: ${car.searchCarResponse.condition}, 
          Giá hiện tại: ${car.searchCarResponse.price} VND, 
          Địa chỉ: ${car.searchCarResponse.address}, 
          Năm sản xuât: ${car.searchCarResponse.year}, 
          Số chỗ chứa trong xe: ${car.searchCarResponse.capacity}, 
          Số lượt đánh giá hiện tại của xe: ${Number(car.searchCarResponse.quantityEvaluate).toFixed(1)}, 
          Rate của xe: ${car.searchCarResponse.rates} sao
          Các feature của Xe {
            ${car.featureDTOs.map(feature =>`Tên feature: ${feature.name}`).join("\n")}
          }`).join("\n");
    } catch (e) {
        console.error(e);
    }
  }
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  
  let chatHistory = []; // Lưu toàn bộ hội thoại trước đó

async function run(textInput) {
  const carData = await getCarData();

  // Lấy câu hỏi gần nhất của user
  const lastUserMessage = chatHistory
    .filter(msg => msg.role === "user")
    .map(msg => msg.text)
    .pop();

  // Kiểm tra nếu người dùng muốn mô tả chi tiết
  const detailRequestPattern = /(thêm|nói|sao|mô tả|chi tiết|giải thích|nói rõ|thêm thông tin|cụ thể hơn|mô tả đi|giới thiệu thêm)/i;

  if (detailRequestPattern.test(textInput)) {
    if (lastUserMessage) {
      textInput = `Hãy mô tả chi tiết hơn về: ${lastUserMessage}`;
    } else {
      return "Bạn muốn tôi mô tả điều gì? Hãy đề cập đến nội dung cụ thể!";
    }
  }

  // Định dạng lịch sử hội thoại đúng chuẩn Google Generative AI
  const formattedHistory = chatHistory.map(msg => ({
    role: msg.role === "bot" ? "model" : msg.role, // Chuyển đổi 'bot' thành 'model'
    parts: [{ text: msg.text }]
  }));

  // Tạo session với lịch sử hội thoại đúng định dạng
  const chatSession = model.startChat({
    generationConfig,
    history: [
      { role: "user", parts: [{ text: "Dưới đây là danh sách xe đang bán trên trang web:\n" + carData }] },
      { role: "user", parts: [{ text: "Bây giờ, hãy trả lời các câu hỏi dựa trên danh sách xe này." }] },
      { role: "user", parts: [{ text: "Bạn đang trả lời khách hàng nên hãy nói chuyện lịch sự." }] },
      { role: "user", parts: [{ text: "Nếu khách hàng hỏi không liên quan về xe thì bạn hãy nói là: Xin lỗi chúng tôi không thể hỗ trợ vấn đề này!." }] },
      { role: "user", parts: [{ text: "Bạn khoan hãy nói ra những tên xe khi khách hàng chưa đề cập đến, khi nào khách muốn giới thiệu thì hãy nói!." }] },
      ...formattedHistory // Sử dụng lịch sử hội thoại đã định dạng
    ],
  });

  // Gửi câu hỏi mới
  const result = await chatSession.sendMessage(textInput);
  const botResponse = result.response.text();

  // Cập nhật lịch sử hội thoại với format đúng
  chatHistory.push({ role: "user", text: textInput });
  chatHistory.push({ role: "model", text: botResponse }); // Sửa role "bot" thành "model"

  return botResponse;
}

export default run;
