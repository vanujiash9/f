# 📖 Tài liệu Schema Cơ sở dữ liệu `dia_talents` (Dành cho Frontend)

Chào Frontend 👋,

Tài liệu này mô tả cấu trúc dữ liệu của hệ thống **dia_talents** từ góc nhìn Backend.  
Mục tiêu: giúp các bạn hiểu rõ các thực thể dữ liệu chính, mối quan hệ giữa chúng, và các trường quan trọng mà API trả về — để thiết kế UI/UX chính xác.

---

## 🗺️ Tổng Quan

Cơ sở dữ liệu được chia thành các **nhóm logic** sau:

1. **Lõi - Ứng viên (Applicant Core)**: Thông tin cơ bản và hồ sơ ứng viên.
2. **Lõi - Công ty (Company Core)**: Thông tin các công ty đối tác.
3. **Tương tác - Tuyển dụng (Recruitment Interaction)**: Luồng ứng viên nộp đơn.
4. **Tương tác - Dự án & Tác vụ (Projects & Tasks)**: Quản lý dự án & task cho talent.
5. **Tương tác - Sự kiện & Workshop (Events & Workshops)**: Quản lý đăng ký sự kiện, workshop.
6. **Dữ liệu Danh mục (Catalog Data)**: Bảng phục vụ filter, dropdown, autocomplete.
7. **Hệ thống & Chức năng phụ (System & Auxiliary)**: Quản lý user nội bộ, notification, ví điện tử.

---

## 1️⃣ Lõi - Ứng viên (Applicant Core)

| Bảng | Trường chính | Ghi chú |
|------|--------------|--------|
| **applicants** | `PK applicant_id`, full_name, email, avatar_url, is_talent | Bảng trung tâm, định danh ứng viên. |
| **applicant_accounts** | `PK account_id`, `FK applicant_id`, username, account_status | Thông tin đăng nhập, trạng thái. |
| **applicant_profiles** | `PK profile_id`, `FK applicant_id`, summary, cv_url, portfolio_url | Hồ sơ chi tiết, thông tin giới thiệu. |
| **talents** | `PK talent_id`, `FK applicant_id`, rating, priority | Dành cho ứng viên có `is_talent = true`. |

---

## 2️⃣ Lõi - Công ty (Company Core)

| Bảng | Trường chính | Ghi chú |
|------|--------------|--------|
| **companies** | `PK company_id`, company_name, logo_url, industry | Thông tin cơ bản công ty. |
| **company_accounts** | `PK account_id`, `FK company_id` | Tài khoản đăng nhập cho công ty. |

> ℹ️ Các bảng phụ như `company_contact`, `company_locations`, `company_experience` dùng để hiển thị profile công ty chi tiết.

---

## 3️⃣ Tương tác - Tuyển dụng (Recruitment Interaction)

| Bảng | Trường chính | Ghi chú |
|------|--------------|--------|
| **jobs** | `PK job_id`, name, company_name, status, experience_level | Chi tiết vị trí tuyển dụng. |
| **job_applications** | `PK application_id`, `FK applicant_id`, `FK job_id`, status | Trạng thái ứng tuyển (pending/approved/rejected). |

---

## 4️⃣ Tương tác - Dự án & Tác vụ (Projects & Tasks)

| Bảng | Trường chính | Ghi chú |
|------|--------------|--------|
| **projects** | `PK project_id`, `FK company_id`, name, status | Thông tin dự án. |
| **tasks** | `PK task_id`, `FK project_id`, name, status | Các task trong dự án. |
| **project_participation** | `PK,FK applicant_id`, `PK,FK project_id` | Ứng viên nào tham gia dự án nào. |

> ℹ️ Các bảng chi tiết như `task_comments`, `task_attachments`, `evaluations` phục vụ UI chi tiết cho task/project.

---

## 5️⃣ Tương tác - Sự kiện & Workshop (Events & Workshops)

| Bảng | Trường chính | Ghi chú |
|------|--------------|--------|
| **events / workshops** | `PK event_id / workshop_id`, title, start_time, format | Thông tin sự kiện/workshop. |
| **event_registrations / workshop_registrations** | `PK,FK applicant_id`, `PK,FK event_id / workshop_id` | Ai đăng ký sự kiện nào. |

---

## 6️⃣ Dữ liệu Danh mục (Catalog Data)

Các bảng phục vụ **filter & search**:

- **skills**: Danh sách kỹ năng (dùng để match tasks, profile).
- **universities**, **majors**: Dữ liệu giáo dục.
- **tags**, **interests**: Phân loại nội dung, sở thích.

> Dùng các bảng nối như `applicant_skills`, `task_skills`, `applicant_majors` để kết nối N–N giữa đối tượng và danh mục.

---

## 7️⃣ Hệ thống & Chức năng phụ (System & Auxiliary)

| Bảng | Ghi chú |
|------|---------|
| **users, user_roles** | Quản lý tài khoản nội bộ (Admin, Staff). |
| **notifications** | Thông báo đẩy đến ứng viên / công ty. |
| **posts** | Bài đăng từ ứng viên hoặc công ty. |
| **es_wallets, es_wallet_transactions** | Dữ liệu ví điện tử. |

---

## 🧭 Hướng dẫn cho Frontend

- **PK/FK**: FE chỉ cần quan tâm để hiển thị đúng dữ liệu (ví dụ: mapping job_id → job_detail).
- **Status fields** (`status`, `account_status`): FE nên dựa vào đây để thay đổi UI (active/inactive/closed).
- **Optional/metadata fields**: Không bắt buộc hiển thị, chỉ dùng khi có yêu cầu từ UX/UI.
- **Skills/Matching**: Để gợi ý công việc phù hợp, sử dụng `user_skills` + `task_skills`.

---

## 🏷️ Legend

- **PK** = Primary Key  
- **FK** = Foreign Key  
- 🔑 = Trường định danh chính  
- 🟢 = Bắt buộc hiển thị  
- ⚪ = Tùy chọn hiển thị

---

> 💡 **Tip**: Nếu cần thêm field mới trong API response để FE render, hãy mở issue hoặc ping team Backend để thảo luận.

---



es_wallets & es_wallet_transactions: Tính năng ví điện tử.

Hy vọng tài liệu này sẽ giúp team Frontend dễ dàng hình dung và làm việc với dữ liệu. Mọi thắc mắc về cấu trúc response API hoặc cần thêm trường dữ liệu, hãy trao đổi trực tiếp với team Backend
