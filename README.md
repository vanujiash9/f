# DIA Talents Database - Hướng dẫn cho mọi người

*Tạo bởi: Thanh Van*  
*Facebook: https://www.facebook.com/gmail.com.vancutenemoinguoi196*  
*Email: thanh.van19062004@gmail.com*

---

## DIA Talents là gì?

**DIA Talents** là một hệ thống giúp **kết nối ứng viên tài năng với doanh nghiệp**. Hệ thống này giống như một cầu nối để:
- Ứng viên tìm kiếm cơ hội việc làm và phát triển kỹ năng
- Doanh nghiệp tìm kiếm nhân tài phù hợp
- Tổ chức các khóa học, workshop để đào tạo

---

## Cấu trúc Database đơn giản

### 🏗️ Kiến trúc tổng quan

```
        ỨNG VIÊN (Applicants)
             ↕️
    NHIỆM VỤ/CÔNG VIỆC (Tasks) 
             ↕️
        DOANH NGHIỆP (Companies)
             
        WORKSHOP/KHÓA HỌC ↔️ ỨNG VIÊN
```

**Giải thích đơn giản:**
- Ứng viên đăng ký tài khoản, tạo hồ sơ
- Doanh nghiệp đăng tuyển việc làm, tạo nhiệm vụ  
- Ứng viên làm nhiệm vụ cho doanh nghiệp
- Ứng viên tham gia workshop để học thêm kỹ năng

---

## 4 Nhóm chính trong hệ thống

### 1. 👤 NHÓM ỨNG VIÊN (7 bảng)

| Bảng | Chức năng | Dữ liệu chính |
|------|-----------|---------------|
| **`applicants`** | **Thông tin cơ bản ứng viên** | Họ tên, email, số điện thoại |
| `applicant_accounts` | Tài khoản đăng nhập | Username, password |
| `applicant_profiles` | Hồ sơ chi tiết | CV, portfolio, ảnh đại diện |
| `applicant_skills` | Kỹ năng của ứng viên | Danh sách kỹ năng |
| `applicant_majors` | Chuyên ngành học | Ngành học, điểm GPA |
| `talents` | Ứng viên xuất sắc | Xếp hạng, đánh giá |
| `job_applications` | Đơn ứng tuyển | Trạng thái đơn, ngày nộp |

### 2. 🏢 NHÓM DOANH NGHIỆP (7 bảng)

| Bảng | Chức năng | Dữ liệu chính |
|------|-----------|---------------|
| **`companies`** | **Thông tin công ty** | Tên công ty, ngành nghề, logo |
| `company_accounts` | Tài khoản công ty | Username, password |
| `company_contact` | Thông tin liên hệ | Email HR, số điện thoại |
| `company_locations` | Địa chỉ công ty | Trụ sở, chi nhánh |
| `company_timeline` | Lịch sử công ty | Năm thành lập, số job đã đăng |
| `company_experience` | Câu chuyện công ty | Bài viết về công ty |
| `jobs` | Tin tuyển dụng | Vị trí, mức lương, yêu cầu |

### 3. ✅ NHÓM NHIỆM VỤ (7 bảng)

| Bảng | Chức năng | Dữ liệu chính |
|------|-----------|---------------|
| **`tasks`** | **Công việc cần làm** | Tên task, mô tả, deadline |
| `task_skills` | Kỹ năng yêu cầu | Kỹ năng cần có, mức độ |
| `task_comments` | Bình luận task | Thảo luận, feedback |
| `task_attachments` | File đính kèm | Tài liệu, hình ảnh |
| `projects` | Dự án chứa task | Tên dự án, tiến độ |
| `project_participation` | Tham gia dự án | Ai tham gia, vai trò |
| `evaluations` | Đánh giá công việc | Điểm số, nhận xét |

### 4. 📚 NHÓM WORKSHOP/HỌC TẬP (5 bảng)

| Bảng | Chức năng | Dữ liệu chính |
|------|-----------|---------------|
| **`workshops`** | **Khóa học/workshop** | Tên khóa học, thời gian, giảng viên |
| `user_workshops` | Đăng ký học | Ai đăng ký, trạng thái tham gia |
| `workshop_registrations` | Đăng ký (cũ) | Thông tin đăng ký workshop |
| `workshop_tags` | Nhãn workshop | Phân loại khóa học |
| `lucky_draw_results` | Quay số may mắn | Giải thưởng trong workshop |

---

## Các bảng phụ trợ quan trọng

### 🎯 Sự kiện và Kết nối (6 bảng)
- `events`: Các sự kiện lớn (hội thảo, triển lãm việc làm)
- `user_events`: Ai đăng ký tham gia sự kiện nào
- `connect_events`: Sự kiện kết nối (phiên bản cũ)
- `meetings`: Cuộc họp dự án
- `posts`: Bài viết chia sẻ
- `notifications`: Thông báo hệ thống

### 💰 Hệ thống Ví và Tài khoản (6 bảng)
- `es_wallets`: Ví điện tử lưu tiền
- `es_wallet_transactions`: Lịch sử giao dịch
- `user_roles`: Vai trò người dùng (admin, user, etc.)

### 📖 Dữ liệu tham khảo (5 bảng)
- `skills`: Danh sách kỹ năng có sẵn
- `universities`: Các trường đại học
- `majors`: Chuyên ngành học
- `interests`: Sở thích
- `tags`: Nhãn phân loại

---

## Luồng hoạt động đơn giản

### 🔄 Quy trình chính:

1. **Ứng viên đăng ký** → Tạo tài khoản trong `applicants`
2. **Tạo hồ sơ** → Cập nhật `applicant_profiles`
3. **Doanh nghiệp đăng tin** → Tạo `jobs` và `tasks`
4. **Ứng viên ứng tuyển** → Tạo `job_applications`
5. **Làm nhiệm vụ** → Cập nhật tiến độ `tasks`
6. **Tham gia workshop** → Đăng ký `workshops`
7. **Đánh giá** → Lưu kết quả trong `evaluations`

### 💡 Ví dụ thực tế:

**Nguyễn Văn A** (ứng viên):
1. Đăng ký tài khoản → Lưu trong `applicants`
2. Upload CV → Lưu link trong `applicant_profiles`
3. Thêm kỹ năng "React JS" → Lưu trong `applicant_skills`
4. Ứng tuyển vào **Công ty B** → Tạo record trong `job_applications`
5. Được giao task "Làm website" → Tạo trong `tasks`
6. Đăng ký workshop "Học Node.js" → Lưu trong `user_workshops`

---

## Điều cần biết cho từng nhóm người

### 👨‍💼 Dành cho Quản lý/Business:
- **4 module chính**: Applicants, Companies, Tasks, Workshops
- **Số liệu theo dõi**: Có các trường `views_count`, `application_count`, `rating`
- **Trạng thái**: Mọi thứ đều có `status` để theo dõi tiến độ

### 👨‍💻 Dành cho Developer:
- **Database**: PostgreSQL với 49 bảng
- **Authentication**: Sử dụng Supabase Auth (`auth.users`)
- **Data types**: Có array, enum, uuid, timestamp with timezone
- **Relationships**: Chủ yếu là foreign key constraints

### 👤 Dành cho End User:
- **Tài khoản**: Một tài khoản có thể vừa là ứng viên, vừa là người tạo workshop
- **Hồ sơ**: Có thể có nhiều kỹ năng, nhiều chuyên ngành
- **Hoạt động**: Ứng tuyển job, làm task, tham gia workshop

---

## Tóm tắt quan trọng

**DIA Talents = Hệ thống kết nối tài năng**

- **49 bảng** chia thành 4 nhóm chính + các bảng phụ trợ
- **Trung tâm**: Tasks là nơi ứng viên và doanh nghiệp tương tác
- **Mục tiêu**: Tạo ecosystem cho việc tìm kiếm, đào tạo và phát triển nhân tài
- **Công nghệ**: PostgreSQL + Supabase Auth

**Câu hỏi thường gặp:**
- **Q**: Làm sao biết ai là ứng viên, ai là công ty?
- **A**: Xem bảng `user_roles` hoặc check có data trong `applicants` hay `companies`

- **Q**: Task thuộc về ai?
- **A**: Task có `created_by` (người tạo) và `assignee_id` (người thực hiện)

- **Q**: Workshop khác gì với Events?
- **A**: Workshop là khóa học có giảng viên, Events là sự kiện tổng quát
