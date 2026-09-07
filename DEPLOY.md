# 🚀 Hướng Dẫn Public Website Profile Lên Internet (Miễn Phí)

Website **DevProfile Pro** đã được cấu hình chuẩn Progressive Web App (PWA) với HTTPS caching, Web App Manifest và Service Worker. Bạn có thể chọn bất kỳ phương án nào dưới đây để xuất bản trang web ra thế giới:

---

## Cách 1: Triển khai qua Vercel (Khuyên dùng - Nhanh nhất 1 phút)

Vercel cung cấp chứng chỉ HTTPS miễn phí, CDN toàn cầu siêu tốc và hỗ trợ PWA cực kỳ tốt.

### Bước thực hiện:
1. Mở terminal (PowerShell) tại thư mục `d:\Profile`.
2. Chạy lệnh:
   ```powershell
   npx -y vercel
   ```
3. Lần đầu sử dụng, Vercel sẽ yêu cầu đăng nhập (Email / GitHub). Bạn mở link đăng nhập trên trình duyệt và xác nhận.
4. Trả lời các câu hỏi mặc định của Vercel (chỉ cần bấm **Enter** nhận cấu hình):
   - `Set up and deploy “d:\Profile”?` -> Nhập **y** rồi bấm Enter.
   - `Which scope do you want to deploy to?` -> Bấm Enter.
   - `Link to existing project?` -> Nhập **n** rồi bấm Enter.
   - `What’s your project’s name?` -> Nhập tên bạn muốn (ví dụ `my-devprofile`) rồi bấm Enter.
   - `In which directory is your code located?` -> Bấm Enter (`./`).
5. Chỉ sau 15-30 giây, Vercel sẽ trả về đường dẫn trang web công khai của bạn, ví dụ:
   👉 **`https://my-devprofile.vercel.app`**

---

## Cách 2: Kéo Thả trực tiếp lên Netlify Drop (Không cần gõ lệnh)

Nếu bạn không muốn sử dụng terminal, đây là cách đơn giản nhất:

### Bước thực hiện:
1. Mở trình duyệt và truy cập: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Đăng nhập tài khoản Netlify (bằng GitHub, Google hoặc Email).
3. Mở File Explorer trên Windows, tìm đến thư mục `d:\Profile`.
4. **Kéo (drag) toàn bộ thư mục `Profile` thả vào ô upload** trên trang Netlify.
5. Netlify sẽ tự động tải lên và cấp link ngay lập tức dạng:
   👉 **`https://random-name-1234.netlify.app`**
6. Bạn có thể vào phần **Site configuration** -> **Change site name** để đổi thành tên bạn thích (ví dụ `hoangminh-profile.netlify.app`).

---

## Cách 3: Đẩy lên GitHub Pages (Được quản lý mã nguồn Git)

Nếu bạn muốn lưu trữ mã nguồn trên GitHub và public trang web miễn phí đi kèm:

### Bước thực hiện:
1. Khởi tạo Git và commit trong thư mục `d:\Profile`:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit DevProfile PWA"
   git branch -M main
   ```
2. Tạo một Repository mới trên GitHub (ví dụ đặt tên `my-profile`).
3. Liên kết và đẩy lên GitHub:
   ```powershell
   git remote add origin https://github.com/<tai-khoan-cua-ban>/my-profile.git
   git push -u origin main
   ```
4. Trên trang GitHub Repository:
   - Vào **Settings** -> Mục bên trái chọn **Pages**.
   - Tại mục **Build and deployment** -> **Source**: Chọn **Deploy from a branch**.
   - **Branch**: Chọn `main` và thư mục `/(root)` rồi bấm **Save**.
5. Đợi khoảng 1-2 phút, trang web của bạn sẽ hiển thị tại:
   👉 **`https://<tai-khoan-cua-ban>.github.io/my-profile/`**

---

## 📱 Hướng Dẫn Cài Đặt Ứng Dụng PWA Sau Khi Public

Khi website đã được đưa lên internet qua HTTPS:
- **Trên máy tính (Chrome / Edge)**: Sẽ xuất hiện nút "Cài đặt App" trên thanh địa chỉ hoặc nút "Cài đặt App" trên thanh điều hướng của website. Nhấp vào là trang web sẽ cài như một ứng dụng desktop riêng biệt (không có thanh URL trình duyệt).
- **Trên điện thoại Android (Chrome)**: Sẽ có thanh thông báo "Thêm DevProfile vào màn hình chính", nhấn Cài đặt là có ngay icon app trên màn hình điện thoại.
- **Trên điện thoại iPhone (Safari)**: Nhấn biểu tượng **Chia sẻ** (hình vuông mũi tên hướng lên) -> Chọn **Thêm vào MH chính (Add to Home Screen)**.
- **Ngoại tuyến (Offline)**: Kể cả khi tắt Wifi/4G, bạn vẫn có thể mở app lên xem toàn bộ profile, kinh nghiệm và dự án bình thường!
