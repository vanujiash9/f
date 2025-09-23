# DIA Talents Database Documentation

*Tạo bởi: Thanh Van*  
*Facebook: https://www.facebook.com/gmail.com.vancutenemoinguoi196*  
*Email: thanh.van19062004@gmail.com*

---

## Tổng quan hệ thống DIA Talents

**DIA Talents** là hệ thống kết nối ứng viên tài năng với doanh nghiệp. Hệ thống cung cấp:
- Nền tảng tìm kiếm cơ hội việc làm cho ứng viên
- Công cụ tìm kiếm nhân tài cho doanh nghiệp
- Hệ thống workshop và đào tạo kỹ năng

---

## Kiến trúc Database

### Kiến trúc tổng quan

```
        ỨNG VIÊN (Applicants)
             ↕
    NHIỆM VỤ/CÔNG VIỆC (Tasks) 
             ↕
        DOANH NGHIỆP (Companies)
             
        WORKSHOP/KHÓA HỌC ↔ ỨNG VIÊN
```

**Luồng dữ liệu chính:**
- Ứng viên đăng ký tài khoản và tạo hồ sơ
- Doanh nghiệp đăng tuyển việc làm và tạo nhiệm vụ  
- Ứng viên thực hiện nhiệm vụ cho doanh nghiệp
- Ứng viên tham gia workshop để phát triển kỹ năng

---

## Cấu trúc Database chi tiết

### 1. NHÓM ỨNG VIÊN (7 bảng)

| Bảng | Chức năng | Dữ liệu chính |
|------|-----------|---------------|
| **`applicants`** | **Thông tin cơ bản ứng viên** | Họ tên, email, số điện thoại |
| `applicant_accounts` | Tài khoản đăng nhập | Username, password |
| `applicant_profiles` | Hồ sơ chi tiết | CV, portfolio, ảnh đại diện |
| `applicant_skills` | Kỹ năng của ứng viên | Danh sách kỹ năng |
| `applicant_majors` | Chuyên ngành học | Ngành học, điểm GPA |
| `talents` | Ứng viên xuất sắc | Xếp hạng, đánh giá |
| `job_applications` | Đơn ứng tuyển | Trạng thái đơn, ngày nộp |

### 2. NHÓM DOANH NGHIỆP (7 bảng)

| Bảng | Chức năng | Dữ liệu chính |
|------|-----------|---------------|
| **companies** | **Thông tin công ty** | Tên công ty, ngành nghề, logo |
| company_accounts | Tài khoản công ty | Username, password |
| company_contact | Thông tin liên hệ | Email HR, số điện thoại |
| company_locations | Địa chỉ công ty | Trụ sở, chi nhánh |
| company_timeline | Lịch sử công ty | Năm thành lập, số job đã đăng |
| company_experience | Kinh nghiệm và thành tựu | Năm kinh nghiệm, thành tựu đạt được |
| jobs | Tin tuyển dụng | Vị trí, mức lương, yêu cầu |

### 3. NHÓM NHIỆM VỤ (7 bảng)

| Bảng | Chức năng | Dữ liệu chính |
|------|-----------|---------------|
| **tasks** | **Công việc cần làm** | Tên task, mô tả, deadline |
| task_skills | Kỹ năng yêu cầu | Kỹ năng cần có, mức độ |
| task_comments | Bình luận task | Thảo luận, feedback |
| task_attachments | File đính kèm | Tài liệu, hình ảnh |
| projects | Dự án chứa task | Tên dự án, tiến độ |
| project_participation | Tham gia dự án | Ai tham gia, vai trò |
| evaluations | Đánh giá công việc | Điểm số, nhận xét |

### 4. NHÓM WORKSHOP/HỌC TẬP (5 bảng)

| Bảng | Chức năng | Dữ liệu chính |
|------|-----------|---------------|
| **workshops** | **Khóa học/workshop** | Tên khóa học, thời gian, giảng viên |
| user_workshops | Đăng ký học | Ai đăng ký, trạng thái tham gia |
| workshop_registrations | Đăng ký (legacy) | Thông tin đăng ký workshop |
| workshop_tags | Nhãn workshop | Phân loại khóa học |
| lucky_draw_results | Quay số may mắn | Giải thưởng trong workshop |

---

## Bảng phụ trợ

### Sự kiện và Kết nối (6 bảng)
- `events`: Các sự kiện lớn (hội thảo, triển lãm việc làm)
- `user_events`: Đăng ký tham gia sự kiện
- `connect_events`: Sự kiện kết nối (legacy)
- `meetings`: Cuộc họp dự án
- `posts`: Bài viết chia sẻ
- `notifications`: Thông báo hệ thống

### Hệ thống Ví và Tài khoản (6 bảng)
- `es_wallets`: Ví điện tử
- `es_wallet_transactions`: Lịch sử giao dịch
- `user_roles`: Vai trò người dùng (admin, user)
- `users`: Người dùng (legacy)
- `employees`: Nhân viên (legacy)

### Dữ liệu tham khảo (5 bảng)
- `skills`: Danh sách kỹ năng có sẵn
- `universities`: Các trường đại học
- `majors`: Chuyên ngành học
- `interests`: Sở thích
- `tags`: Nhãn phân loại

### Utility (2 bảng)
- `kv_store_e9863467`: Key-value store
- (Các bảng kết nối khác)

---

## Luồng hoạt động hệ thống

### Quy trình chính

1. **Đăng ký ứng viên** → Tạo tài khoản trong `applicants`
2. **Tạo hồ sơ** → Cập nhật `applicant_profiles`
3. **Doanh nghiệp đăng tin** → Tạo `jobs` và `tasks`
4. **Ứng tuyển việc làm** → Tạo `job_applications`
5. **Thực hiện nhiệm vụ** → Cập nhật tiến độ `tasks`
6. **Tham gia workshop** → Đăng ký `workshops`
7. **Đánh giá kết quả** → Lưu trong `evaluations`

### Ví dụ thực tế

**Ứng viên Nguyễn Văn A:**
1. Đăng ký tài khoản → Dữ liệu lưu trong `applicants`
2. Upload CV → Link CV lưu trong `applicant_profiles`
3. Thêm kỹ năng "React JS" → Lưu trong `applicant_skills`
4. Ứng tuyển vào Công ty B → Tạo record trong `job_applications`
5. Được giao task "Phát triển website" → Tạo trong `tasks`
6. Đăng ký workshop "Node.js cơ bản" → Lưu trong `user_workshops`

---

## Thông tin kỹ thuật

### Đặc điểm Database
- **Hệ quản trị**: PostgreSQL
- **Tổng số bảng**: 49 bảng
- **Authentication**: Supabase Auth (`auth.users`)
- **Schema**: `dia_talents`

### Kiểu dữ liệu đặc biệt
- **Array fields**: `requirements`, `benefits`, `tags`, `interests`
- **Enum fields**: `status`, `role`, `type` (có constraint values)
- **UUID fields**: Bảng mới sử dụng UUID, bảng cũ dùng integer
- **Timestamp**: Sử dụng `timestamp with time zone`

### Trạng thái (Status) quan trọng
- **Tasks**: `pending`, `in_progress`, `completed`, `cancelled`
- **Applications**: `pending`, `accepted`, `rejected`
- **Workshops/Events**: `scheduled`, `ongoing`, `completed`, `cancelled`
- **Projects**: `active`, `completed`, `cancelled`

---

## Hướng dẫn cho từng nhóm người dùng

### Quản lý/Business
- **Theo dõi metrics**: Các trường `views_count`, `application_count`, `rating`
- **4 module chính**: Applicants, Companies, Tasks, Workshops
- **Báo cáo**: Có thể query theo `status`, `created_at` để tạo báo cáo

### Developer/Technical
- **Foreign Keys**: Hầu hết bảng có relationships với nhau
- **Indexing**: Cần index cho `email`, `status`, `created_at`
- **Pagination**: Tất cả module chính cần pagination
- **Authentication**: Check user roles trước khi CRUD operations

### End User
- **Multi-role**: Một user có thể vừa là applicant, vừa tạo workshop
- **Profile**: Có thể có nhiều skills, majors, interests
- **Activities**: Apply jobs, complete tasks, join workshops

---

## Câu hỏi thường gặp

**Q: Làm sao phân biệt ứng viên và công ty?**  
A: Kiểm tra bảng `user_roles` hoặc có data trong `applicants`/`companies`

**Q: Task thuộc về ai?**  
A: Task có `created_by` (người tạo) và `assignee_id` (người thực hiện)

**Q: Workshop khác Events như thế nào?**  
A: Workshop là khóa học có instructor, Events là sự kiện tổng quát

**Q: Tại sao có cả bảng mới và legacy?**  
A: Hệ thống đang được nâng cấp, bảng legacy giữ lại để backward compatibility

---

## Tóm tắt

**DIA Talents** là hệ thống kết nối tài năng với 49 bảng database, chia thành 4 module chính và các bảng phụ trợ. Tasks đóng vai trò trung tâm kết nối ứng viên và doanh nghiệp, trong khi Workshops cung cấp đào tạo kỹ năng. Hệ thống sử dụng PostgreSQL với Supabase Auth, hỗ trợ đầy đủ tính năng từ quản lý hồ sơ đến thanh toán và thông báo.
