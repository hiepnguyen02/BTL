# Trang web học tiếng anh

# 1. Cách sử dụng

###### 1.1 Tải code từ link *git@github.com:hiepnguyen02/BTL.git* được thư mục BTL

###### 1.2 Với Front end

    cd front-end
    npm install
    npm run dev
    Truy cập http://localhost:3000/home bằng trình duyệt

###### 1.2 Với Back end

    cd back-end
    mvn install
    mvn spring-boot:run

*Lưu ý: Trước khi chạy cần cấu hình Database tại application.properties, có thể tham khảo
tại https://www.codejava.net/frameworks/spring-boot/connect-to-postgresql-database-examples*

# 2. Các chức năng

### 2.1 Với người dùng không đăng nhập

###### 2.1.1 Dictionary

    - Tìm từ trong database có sẵn của hệ thống
    - Xem từ, phát âm

###### 2.1.2 Translate

    - Dịch từ tiếng Anh sang tiếng Việt và ngược lại

### 2.2 Với người dùng có đăng nhập

###### 2.2.1 Dictionary

    - Tìm từ trong database có sẵn của hệ thống
    - Xem từ, phát âm
    - Thêm từ vào "Từ điển cá nhân"
    - Xoá, sử các từ đã thêm vào "Từ điển cá nhân"

###### 2.2.2 Translate

    - Dịch từ tiếng Anh sang tiếng Việt và ngược lại

###### 2.2.3 Bookmark

    - Thêm, xoá từ

###### 2.2.3 Bookmark

    - Thêm, xoá từ

###### 2.2.4 Puzzle Game

    - Tạo game từ 3 từ ngẫu nhiên trong Bookmark
    - Tạo game từ 3 từ ngẫu nhiên trong từ điển của hệ thông
    - Hiện thị danh sách cá từ có trong bảng
    - Thêm từ vào Bookmark nếu từ đó chưa có trong bookmark

###### 2.2.5 Flashcard

    - Học từ vựng theo 10 chủ đề
    - Xem được mức độ hoàn thành mỗi chủ đề và 10 chủ đề

# 3. Công nghệ sử dụng:

##### 3.1 Front end: NextJs, TypeScript, React Bootstrap.

##### 3.2 Back end: Java Spring Boot, Java Spring Security, Spring Data JPA

##### 3.3 Database: PostgreSQL

# 4. Cây kế thừa

![Screenshot 2023-11-30 at 16.04.44.png](Screenshot%202023-11-30%20at%2016.04.44.png)


