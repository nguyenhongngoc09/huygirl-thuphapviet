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
    "tiktock": "https://www.tiktok.com/@..."
  }
}
```

Đường dẫn `image` bắt đầu bằng `./` và được tính từ thư mục `public/artworks`. Khi chạy local, refresh trang sẽ lấy nội dung JSON mới nhất. Trên Vercel, cần push và deploy lại sau khi thay đổi JSON hoặc ảnh. Ảnh được căn giữa trong khung cố định và giữ nguyên tỷ lệ.

Các liên kết mạng xã hội hiển thị bằng icon. Điền URL video/kênh vào `youtube` để hiện icon YouTube. Giá trị rỗng, chỉ có khoảng trắng, `null` hoặc không khai báo sẽ được ẩn; có thể bỏ toàn bộ `social_links` nếu không có liên kết.

## Cấu hình liên kết trang chính

Sửa `lib/site-links.ts` để cấu hình Facebook Page và ảnh đại diện, TikTok, YouTube của thương hiệu. Các link mạng xã hội có giá trị tại đây được dùng cả trên header lẫn dòng “Xem video viết chữ tại”; Facebook Page cũng là đích cho Messenger. TikTok hoặc YouTube để trống hay không hợp lệ thì icon tương ứng sẽ bị ẩn. Các link trong `social_links` của từng tác phẩm không được dùng làm link dự phòng. Không cần cấu hình URL trong biến môi trường.

## Kết nối Messenger

Nút “Tôi muốn bức này” mở Messenger của Facebook Page cấu hình trong `lib/site-links.ts` và gửi kèm mã tham chiếu `artwork_<slug>`.
