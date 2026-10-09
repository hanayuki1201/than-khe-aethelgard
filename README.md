# HƯỚNG DẪN TRIỂN KHAI TRANG THÔNG TIN THẦN KHẾ AETHELGARD

Trọn bộ mã nguồn trang thông tin dành cho dự án Thần Khế Aethelgard: Học Viện Ma Thú và Thế Giới Mở Giả Lập Hộp Cát.

---

## 1. CẤU TRÚC TỆP TIN
- index.html: Giao diện chính tích hợp 7 phân hệ tương tác:
  1. Đại lục toàn thư (Toàn văn 14 chương tài liệu kèm tìm kiếm thời gian thực).
  2. Bản đồ & Địa lý (Bản đồ thế giới, sơ đồ học viện, 6 tầng cao độ, 4 cấp an ninh).
  3. 8 Phân khu học viện Kael-Varn (Trình khám phá tương tác 8 địa danh kèm phối cảnh mỹ thuật).
  4. Bách thú & Nhân vật (Kho hồ sơ thẻ bài ma thú kèm bộ lọc phân loại).
  5. Cẩm nang sinh tồn (Quy tắc thế giới mở, 3 cấp độ thân mật, HUD chọn giới tính).
  6. Khám phá hộp cát (Bảng điều khiển gieo xúc xắc D20 ngẫu nhiên sinh kịch bản nhập vai).
  7. Khởi tạo nhân vật (Biểu mẫu tạo hồ sơ nhập vai xuất văn bản một cú nhấp).
- style.css: Bảng phong cách huyền ảo bóng đêm tối ưu hiển thị trên cả máy tính và điện thoại.
- app.js: Bộ điều khiển logic tương tác, chuyển đổi bản đồ, tiêu điểm phân khu, lọc danh mục, bộ gieo xúc xắc hộp cát và hiệu ứng âm thanh ma mị.
- vercel.json: Tệp tin cấu hình tối ưu định tuyến và bảo mật trên nền tảng Vercel.
- assets/images/: Thư mục chứa các tệp ảnh chất lượng cao.

---

## 2. PHƯƠNG THỨC 1: XEM TRỰC TIẾP TRÊN MÁY TÍNH
1. Giải nén tệp tin Than_Khe_Aethelgard_Web.zip.
2. Nhấp đúp vào tệp tin index.html để mở trang web trên trình duyệt ưa thích của bạn.
3. Toàn bộ hình ảnh, tài liệu và công cụ tạo nhân vật đều hoạt động trơn tru.

---

## 3. PHƯƠNG THỨC 2: TRIỂN KHAI LÊN GITHUB PAGES
1. Tạo một kho lưu trữ mới trên GitHub.
2. Tải toàn bộ nội dung trong thư mục website lên nhánh chính của kho lưu trữ.
3. Vào mục Cài đặt của kho lưu trữ, tìm đến phần Trang.
4. Chọn nguồn triển khai từ nhánh chính và thư mục gốc, sau đó lưu lại.
5. Trang web của bạn sẽ được kích hoạt tại tên miền miễn phí do GitHub cung cấp.

---

## 4. PHƯƠNG THỨC 3: TRIỂN KHAI QUA VERCEL
1. Đăng nhập vào bảng điều khiển Vercel.
2. Chọn thêm dự án mới và liên kết với kho lưu trữ GitHub đã tạo ở trên.
3. Giữ nguyên các thiết lập mặc định và nhấn Triển khai.
4. Trang web sẽ tự động hoàn tất quá trình xuất bản với tốc độ tải trang nhanh chóng trên toàn cầu.


---
**Tác Giả & Sáng Lập Thế Giới**: **🦋Độc Dược Ngọt Ngào🍷**
*Bản quyền toàn bộ thế giới quan và thiết lập nhân vật thuộc về tác giả.*
