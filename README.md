
---

# 📖 Tài liệu Schema CSDL `dia_talents`

📌 **Link ERD đầy đủ**: *(đính kèm hình hoặc link ERD khi có)*

---

## 1️⃣ Nhóm **Applicants & Users**

| **Bảng**            | **PK / Trường chính**        | **FK / Quan hệ**                          | **Ý nghĩa (Frontend)**                                 |
| ------------------- | ---------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| applicants          | applicant\_id                | 1-N → profiles, skills, job\_applications | Hồ sơ gốc ứng viên (tên, email, avatar, trạng thái).   |
| applicant\_accounts | account\_id                  | applicant\_id → applicants                | Tài khoản đăng nhập (active/inactive).                 |
| applicant\_profiles | profile\_id                  | applicant\_id → applicants                | Chi tiết hồ sơ (CV, portfolio, summary).               |
| applicant\_skills   | (applicant\_id, skill\_name) | applicant\_id → applicants                | Danh sách kỹ năng ứng viên (text).                     |
| applicant\_majors   | (applicant\_id, major\_id)   | major\_id → majors                        | Ngành học / GPA / năm tốt nghiệp.                      |
| talents             | talent\_id                   | applicant\_id → applicants                | Đánh dấu ứng viên là “talent”, kèm độ ưu tiên, rating. |
| users               | user\_id                     | –                                         | Người dùng nội bộ (admin, staff).                      |
| user\_roles         | id (uuid)                    | user\_id → auth.users                     | Role của user trong hệ thống (admin, mentor…).         |
| employees           | employee\_id                 | company\_id → companies                   | Dữ liệu nhân sự nội bộ công ty.                        |

---

## 2️⃣ Nhóm **Companies**

| **Bảng**           | **PK / Trường chính** | **FK / Quan hệ**        | **Ý nghĩa (Frontend)**                          |
| ------------------ | --------------------- | ----------------------- | ----------------------------------------------- |
| companies          | company\_id           | 1-N → jobs, projects    | Thông tin công ty (tên, logo, ngành).           |
| company\_accounts  | account\_id           | company\_id → companies | Quản lý user của công ty (HR).                  |
| company\_locations | location\_id          | company\_id → companies | Danh sách văn phòng / địa điểm.                 |
| company\_contact   | contact\_id           | company\_id → companies | Email, số điện thoại, website chính thức.       |
| company\_timeline  | timeline\_id          | company\_id → companies | Mốc sự kiện nội bộ công ty (hiển thị timeline). |

---

## 3️⃣ Nhóm **Jobs & Applications**

| **Bảng**          | **PK / Trường chính** | **FK / Quan hệ**                           | **Ý nghĩa (Frontend)**                          |
| ----------------- | --------------------- | ------------------------------------------ | ----------------------------------------------- |
| jobs              | job\_id               | company\_id → companies                    | Tin tuyển dụng (tiêu đề, mức lương, loại hình). |
| job\_applications | application\_id       | job\_id → jobs, applicant\_id → applicants | Đơn ứng tuyển.                                  |
| job\_tags         | (job\_id, tag\_id)    | tag\_id → tags                             | Gắn thẻ phân loại job.                          |
| job\_skills       | (job\_id, skill\_id)  | skill\_id → skills                         | Yêu cầu kỹ năng cho job.                        |

---

## 4️⃣ Nhóm **Projects & Tasks**

| **Bảng**               | **PK / Trường chính**        | **FK / Quan hệ**                   | **Ý nghĩa (Frontend)**     |
| ---------------------- | ---------------------------- | ---------------------------------- | -------------------------- |
| projects               | project\_id                  | company\_id → companies            | Dự án thuộc công ty.       |
| project\_participation | (project\_id, applicant\_id) | applicant\_id → applicants         | Thành viên tham gia dự án. |
| tasks                  | task\_id                     | project\_id → projects             | Nhiệm vụ trong dự án.      |
| task\_comments         | comment\_id                  | task\_id → tasks, user\_id → users | Bình luận trong task.      |
| task\_skills           | (task\_id, skill\_id)        | skill\_id → skills                 | Kỹ năng yêu cầu cho task.  |

---

## 5️⃣ Nhóm **Events & Workshops**

| **Bảng**                | **PK / Trường chính**         | **FK / Quan hệ**           | **Ý nghĩa (Frontend)**            |
| ----------------------- | ----------------------------- | -------------------------- | --------------------------------- |
| events                  | event\_id                     | –                          | Sự kiện kết nối (tên, thời gian). |
| event\_registrations    | (event\_id, applicant\_id)    | event\_id → events         | Ghi nhận ứng viên đăng ký.        |
| event\_jobs             | (event\_id, job\_id)          | job\_id → jobs             | Job giới thiệu trong sự kiện.     |
| workshops               | workshop\_id                  | –                          | Workshop đào tạo / huấn luyện.    |
| workshop\_registrations | (workshop\_id, applicant\_id) | applicant\_id → applicants | Ghi nhận người tham dự workshop.  |

---

## 6️⃣ Nhóm **Catalog & Metadata**

| **Bảng**     | **PK / Trường chính** | **FK / Quan hệ**                                   | **Ý nghĩa (Frontend)**       |
| ------------ | --------------------- | -------------------------------------------------- | ---------------------------- |
| skills       | skill\_id             | N-N → applicant\_skills, task\_skills, job\_skills | Danh sách kỹ năng chuẩn hóa. |
| majors       | major\_id             | N-N → applicant\_majors                            | Danh sách ngành học.         |
| universities | university\_id        | –                                                  | Danh sách trường.            |
| tags         | tag\_id               | N-N → job\_tags, project\_tags                     | Thẻ phân loại.               |
| interests    | interest\_id          | –                                                  | Sở thích ứng viên.           |

---

## 7️⃣ Nhóm **Logging & API**

| **Bảng**             | **PK / Trường chính** | **FK / Quan hệ**                   | **Ý nghĩa (Frontend)**       |
| -------------------- | --------------------- | ---------------------------------- | ---------------------------- |
| sessions             | session\_id           | user\_id → users                   | Phiên đăng nhập.             |
| email\_verifications | verification\_id      | applicant\_id → applicants         | Xác thực email.              |
| chat\_sessions       | chat\_session\_id     | applicant\_id → applicants         | Phiên chat chatbot.          |
| chat\_messages       | message\_id           | chat\_session\_id → chat\_sessions | Lịch sử tin nhắn chat.       |
| api\_keys            | key\_id               | user\_id → users                   | Khóa API của user.           |
| api\_usage\_logs     | log\_id               | key\_id → api\_keys                | Ghi lại request từ API.      |
| history\_logs        | log\_id               | user\_id → users                   | Nhật ký thao tác người dùng. |

---

📌 **Liên hệ BE để trao đổi schema & API:**
📧 Email: **[thanh.van19062004@gmail.com](mailto:thanh.van19062004@gmail.com)**
🎥 TikTok: **@bevancutethichhocdata**

---




🎥 TikTok: @bevancutethichhocdata

🎥 TikTok: @bevancutethichhocdata
