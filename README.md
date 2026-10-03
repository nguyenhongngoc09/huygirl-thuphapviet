# Huygirl Thư pháp Việt

## Chạy và kiểm tra

```bash
npm ci
npm run dev
```

Mở `http://localhost:3000`. Website chỉ sử dụng trang chính `/`.

```bash
npm run typecheck
npm run build
npm start
```

Bản build cần kết nối Google Fonts để tải font. Khi deploy Vercel, chọn preset Next.js, dùng `npm run build` và đưa đầy đủ thư mục `public/artworks` lên Git.

## Thêm tác phẩm

Danh sách tác phẩm được quản lý trong `public/artworks/data.json`. Mỗi lần refresh trang `/`, server sẽ đọc lại file này.

```text
public/artworks/
├── data.json
├── tac-pham-01.webp
└── tac-pham-02.webp
```

Mỗi phần tử trong `data.json` dùng cấu trúc:

```json
{
  "title": "Tên tác phẩm",
  "image": "./tac-pham-01.webp",
  "description": "Mô tả đầy đủ về tác phẩm...",
  "materials": {
    "chat_lieu": "Mực nho trên giấy dó",
    "kich_thuoc": "40cm x 60cm"
  },
  "social_links": {
    "facebook": "https://www.facebook.com/...",
    "youtube": "",
    "tiktok": "https://www.tiktok.com/@..."
  }
}
```

Đường dẫn `image` bắt đầu bằng `./` và được tính từ thư mục `public/artworks`. Khi chạy local, refresh trang sẽ lấy nội dung JSON mới nhất. Trên Vercel, cần push và deploy lại sau khi thay đổi JSON hoặc ảnh. Ảnh được căn giữa trong khung cố định và giữ nguyên tỷ lệ.

Ảnh trong `public/artworks` là bản có watermark `@huygirl-tpv` để hiển thị và tải xuống. Đặt ảnh gốc cùng tên vào `artworks-source/` (thư mục local được Git bỏ qua), sau đó chạy `npm run watermark:artworks`. Lệnh đọc các ảnh trong `data.json` và tạo lại bản public; hãy giữ bản sao riêng của thư mục ảnh gốc khi chuyển máy. Watermark giúp nhận diện và hạn chế dùng lại ảnh, nhưng không thể ngăn tuyệt đối việc sao chép.

Các liên kết mạng xã hội hiển thị bằng icon. Điền URL video/kênh vào `youtube` để hiện icon YouTube. Giá trị rỗng, chỉ có khoảng trắng, `null` hoặc không khai báo sẽ được ẩn; có thể bỏ toàn bộ `social_links` nếu không có liên kết.

## Cấu hình liên kết trang chính

Sửa `lib/site-links.ts` để cấu hình Facebook Page và ảnh đại diện, TikTok, YouTube của thương hiệu. TikTok và YouTube tại đây được dùng ở header; các link trong `social_links` của từng tác phẩm xuất hiện ở phần video của tác phẩm đó. Facebook Page là đích cho các nút Messenger. Không cần cấu hình URL trong biến môi trường.

## Kết nối Messenger

Nút “Liên hệ tác phẩm này” mở Messenger của Facebook Page cấu hình trong `lib/site-links.ts` và gửi kèm mã tham chiếu `artwork_<slug>`.
