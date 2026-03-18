# 📘 Git & GitHub Cheat Sheet

---

## 1. Khởi tạo & Cấu hình (Setup)

_Dùng khi bắt đầu thiết lập môi trường làm việc._

- `git init`: Khởi tạo một Local Repo mới.
- `git clone <url>`: Tải một dự án từ GitHub về máy.
- `git config --global user.name "Tên của bạn"`: Khai báo tên.
- `git config --global user.email "email@example.com"`: Khai báo email.

---

## 2. Quy trình làm việc hàng ngày (Daily Workflow)

_Thực hiện theo vòng lặp: Sửa code -> Add -> Commit -> Push._

- `git status`: Kiểm tra các file đã thay đổi.
- `git add .`: Đưa tất cả thay đổi vào khu vực chờ (Staging Area).
- `git commit -m "Mô tả thay đổi"`: Lưu lại thay đổi kèm lời nhắn.
- `git push origin <tên-nhánh>`: Đẩy code lên GitHub.
- `git pull origin <tên-nhánh>`: Lấy code mới nhất từ GitHub về máy.

---

## 3. Quản lý Nhánh (Branching)

_Sử dụng khi làm tính năng mới hoặc thử nghiệm mô hình mà không muốn hỏng code chính._

- `git branch`: Liệt kê các nhánh đang có.
- `git checkout -b <tên-nhánh>`: Tạo nhánh mới và chuyển sang nhánh đó.
- `git switch <tên-nhánh>`: Chuyển đổi qua lại giữa các nhánh.
- `git merge <tên-nhánh>`: Gộp nhánh phụ vào nhánh chính (thường đứng ở `main` để gộp).
- `git branch -d <tên-nhánh>`: Xóa nhánh sau khi đã gộp xong.

---

## 4. Xử lý lỗi & Hoàn tác (Undo)

_Dùng khi lỡ tay làm sai hoặc gặp xung đột code._

- `git fetch origin`: Cập nhật danh sách nhánh từ server (dùng khi không thấy nhánh mới).
- `git pull --rebase origin main`: Cập nhật code và gộp lịch sử để tránh lỗi `rejected`.
- `git reset --hard HEAD`: Hủy bỏ mọi thay đổi chưa commit, quay về bản sạch nhất.
- `git stash`: Tạm cất code đang làm dở để chuyển nhánh khẩn cấp.
- `git stash pop`: Lấy lại code vừa cất.
