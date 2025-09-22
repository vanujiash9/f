

---

# 📖 Tài liệu Schema CSDL `dia_talents`

📌 **Link ERD đầy đủ:** [Xem tại đây](https://app.diagrams.net/#G1n7Zks6sgTrmF44OYYt7ZP1M7OOjP8V2k#%7B%22pageId%22%3A%22loPtsfd67OOyYVl8gUGj%22%7D)

## Giới thiệu

Tài liệu này mô tả cấu trúc **49 bảng** trong CSDL Talent Pool, dành cho:

* **Frontend Developer:** Hiểu rõ bảng, trường và quan hệ để hiển thị UI đúng cách.
* **PM / Tester:** Nắm được cách dữ liệu di chuyển giữa các bảng.
* **Người không chuyên:** Có thể đọc hiểu mối quan hệ dữ liệu ở mức tổng quan.

---

## 1️⃣ Nhóm Applicants & Users (Ứng viên & Người dùng)

| **Bảng**             | **PK / Trường chính**      | **FK / Quan hệ**                          | **Ý nghĩa**                                          |
| -------------------- | -------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| applicants           | applicant\_id, email       | 1-N → profiles, skills, job\_applications | Hồ sơ gốc ứng viên (tên, email, avatar, trạng thái). |
| applicant\_accounts  | account\_id                | applicant\_id → applicants                | Quản lý tài khoản đăng nhập (active/inactive).       |
| applicant\_profiles  | profile\_id                | applicant\_id → applicants                | Thông tin CV, portfolio, mô tả bản thân.             |
| applicant\_skills    | (applicant\_id, skill\_id) | skill\_id → skills                        | Liệt kê kỹ năng ứng viên.                            |
| applicant\_majors    | (applicant\_id, major\_id) | major\_id → majors                        | Ngành học / GPA / năm tốt nghiệp.                    |
| talents              | talent\_id                 | applicant\_id → applicants                | Đánh dấu ứng viên là “talent”, rating, ưu tiên.      |
| users                | user\_id, username         | –                                         | Người dùng nội bộ (admin, staff).                    |
| user\_roles          | role\_id, role\_name       | user\_id → users                          | Phân quyền (admin, mentor, viewer…).                 |
| employees            | employee\_id, name         | company\_id → companies                   | Nhân sự nội bộ công ty.                              |
| user\_activity\_logs | log\_id, action            | user\_id → users                          | Ghi nhận thao tác của người dùng.                    |
| user\_settings       | setting\_id, theme         | user\_id → users                          | Tùy chỉnh cá nhân (theme, ngôn ngữ).                 |
| user\_notifications  | notification\_id, message  | user\_id → users                          | Lưu thông báo cho người dùng.                        |

---

## 2️⃣ Nhóm Companies (Công ty)

| **Bảng**             | **PK / Trường chính**      | **FK / Quan hệ**        | **Ý nghĩa**                                |
| -------------------- | -------------------------- | ----------------------- | ------------------------------------------ |
| companies            | company\_id, company\_name | 1-N → jobs, projects    | Thông tin công ty (tên, logo, ngành nghề). |
| company\_accounts    | account\_id                | company\_id → companies | Tài khoản đại diện công ty (HR).           |
| company\_locations   | location\_id, address      | company\_id → companies | Văn phòng, địa điểm làm việc.              |
| company\_contact     | contact\_id, email         | company\_id → companies | Email, số điện thoại, website chính thức.  |
| company\_timeline    | timeline\_id               | company\_id → companies | Mốc sự kiện công ty (timeline hiển thị).   |
| company\_departments | department\_id, name       | company\_id → companies | Phòng ban trong công ty.                   |
| company\_policies    | policy\_id, title          | company\_id → companies | Chính sách nội bộ (dự phòng).              |

---

## 3️⃣ Nhóm Jobs & Applications (Tuyển dụng)

| **Bảng**          | **PK / Trường chính** | **FK / Quan hệ**                           | **Ý nghĩa**                                     |
| ----------------- | --------------------- | ------------------------------------------ | ----------------------------------------------- |
| jobs              | job\_id, title        | company\_id → companies                    | Tin tuyển dụng (tiêu đề, mức lương, loại hình). |
| job\_applications | application\_id       | job\_id → jobs, applicant\_id → applicants | Đơn ứng tuyển của ứng viên.                     |
| job\_tags         | (job\_id, tag\_id)    | tag\_id → tags                             | Gắn thẻ phân loại job.                          |
| job\_skills       | (job\_id, skill\_id)  | skill\_id → skills                         | Kỹ năng yêu cầu cho job.                        |
| job\_status\_logs | log\_id, status       | job\_id → jobs                             | Lịch sử thay đổi trạng thái job.                |
| job\_reviews      | review\_id, rating    | job\_id → jobs                             | Đánh giá job (dự phòng).                        |

---

## 4️⃣ Nhóm Projects & Tasks (Dự án & Nhiệm vụ)

| **Bảng**               | **PK / Trường chính**        | **FK / Quan hệ**           | **Ý nghĩa**                     |
| ---------------------- | ---------------------------- | -------------------------- | ------------------------------- |
| projects               | project\_id, name            | company\_id → companies    | Dự án thuộc công ty.            |
| project\_participation | (project\_id, applicant\_id) | applicant\_id → applicants | Thành viên tham gia dự án.      |
| project\_tags          | (project\_id, tag\_id)       | tag\_id → tags             | Gắn thẻ cho dự án.              |
| project\_files         | file\_id, file\_url          | project\_id → projects     | File đính kèm dự án (dự phòng). |
| tasks                  | task\_id, title              | project\_id → projects     | Nhiệm vụ trong dự án.           |
| task\_comments         | comment\_id, content         | task\_id → tasks           | Bình luận, trao đổi task.       |
| task\_files            | file\_id, file\_url          | task\_id → tasks           | Tệp đính kèm task (dự phòng).   |
| task\_skills           | (task\_id, skill\_id)        | skill\_id → skills         | Kỹ năng yêu cầu cho task.       |

---

## 5️⃣ Nhóm Events & Workshops (Sự kiện & Hoạt động)

| **Bảng**                | **PK / Trường chính**         | **FK / Quan hệ**           | **Ý nghĩa**                      |
| ----------------------- | ----------------------------- | -------------------------- | -------------------------------- |
| events                  | event\_id, name               | –                          | Sự kiện kết nối, meetup.         |
| event\_registrations    | (event\_id, applicant\_id)    | applicant\_id → applicants | Ghi nhận đăng ký sự kiện.        |
| event\_jobs             | (event\_id, job\_id)          | job\_id → jobs             | Job giới thiệu trong sự kiện.    |
| workshops               | workshop\_id, title           | –                          | Workshop đào tạo / huấn luyện.   |
| workshop\_registrations | (workshop\_id, applicant\_id) | applicant\_id → applicants | Ghi nhận người tham dự workshop. |
| event\_feedbacks        | feedback\_id, rating          | event\_id → events         | Đánh giá sự kiện (dự phòng).     |

---

## 6️⃣ Catalog & Metadata (Danh mục & Tham chiếu)

| **Bảng**     | **PK / Trường chính** | **FK / Quan hệ**                                   | **Ý nghĩa**                  |
| ------------ | --------------------- | -------------------------------------------------- | ---------------------------- |
| skills       | skill\_id, name       | N-N → applicant\_skills, task\_skills, job\_skills | Danh sách kỹ năng chuẩn hóa. |
| majors       | major\_id, name       | N-N → applicant\_majors                            | Danh sách ngành học.         |
| universities | university\_id, name  | –                                                  | Danh sách trường đại học.    |
| tags         | tag\_id, name         | N-N → job\_tags, project\_tags                     | Thẻ phân loại.               |
| interests    | interest\_id, name    | –                                                  | Sở thích ứng viên.           |
| metadata     | key, value            | –                                                  | Cấu hình phụ trợ (dự phòng). |

---

## 7️⃣ Logging & API

| **Bảng**             | **PK / Trường chính**    | **FK / Quan hệ**                   | **Ý nghĩa**                      |
| -------------------- | ------------------------ | ---------------------------------- | -------------------------------- |
| sessions             | session\_id, expires\_at | user\_id → users                   | Phiên đăng nhập.                 |
| email\_verifications | verification\_id         | applicant\_id → applicants         | Xác thực email.                  |
| chat\_sessions       | chat\_session\_id        | applicant\_id → applicants         | Phiên chat chatbot.              |
| chat\_messages       | message\_id, content     | chat\_session\_id → chat\_sessions | Lịch sử chat.                    |
| api\_keys            | key\_id, status          | user\_id → users                   | Khóa API của user.               |
| api\_usage\_logs     | log\_id, endpoint        | key\_id → api\_keys                | Ghi lại request từ API.          |
| history\_logs        | log\_id, action          | user\_id → users                   | Nhật ký thao tác người dùng.     |
| audit\_trails        | audit\_id, table\_name   | –                                  | Lưu thay đổi dữ liệu (dự phòng). |

---

✅ **Tổng số: 49 bảng**
(bao gồm cả các bảng dự phòng và bảng trống để mở rộng trong tương lai).

📌 **Liên hệ BE để trao đổi schema & API:**
📧 Email: **[thanh.van19062004@gmail.com](mailto:thanh.van19062004@gmail.com)**
🎥 TikTok: **@bevancutethichhocdata**

---




🎥 TikTok: @bevancutethichhocdata

🎥 TikTok: @bevancutethichhocdata
