# HƯỚNG DẪN TRIỂN KHAI TRANG THÔNG TIN THẦN KHẾ AETHELGARD

Trọn bộ mã nguồn trang thông tin dành cho dự án Thần Khế Aethelgard: Học Viện Ma Thú và Thế Giới Mở Giả Lập Hộp Cát.

---

## 1. CẤU TRÚC TỆP TIN
- index.html: Giao diện chính tích hợp 5 phân hệ tương tác (Đại lục toàn thư 14 chương, Bản đồ tương tác, Hồ sơ ma thú, Cẩm nang sinh tồn, Trình tạo nhân vật).
- style.css: Bảng phong cách huyền ảo bóng đêm tối ưu hiển thị trên cả máy tính và điện thoại.
- app.js: Bộ điều khiển logic tương tác, chuyển đổi bản đồ, lọc danh mục và sao chép hồ sơ nhân vật.
- vercel.json: Tệp tin cấu hình tối ưu định tuyến và bảo mật trên nền tảng Vercel.
- assets/images/: Thư mục chứa các tệp ảnh chất lượng cao (bản đồ thế giới, sơ đồ học viện, áp phích và ảnh hồ sơ ma thú).

---

## 2. PHƯƠNG THỨC 1: XEM TRỰC TIẾP TRÊN MÁY TÍNH
1. Giải nén tệp tin Than_Khe_Aethelgard_Web.zip.
2. Nhấp đúp vào tệp tin index.html để mở trang web trên trình duyệt ưa thích của bạn.
3. Toàn bộ hình ảnh, tài liệu và công cụ tạo nhân vật đều hoạt động trơn tru mà không cần mạng Internet.

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
