# DIA Talents Database Schema Documentation

## Tổng quan Database

Database `dia_talents` là hệ thống quản lý tài năng và dự án, với 4 module chính: **Applicants**, **Companies**, **Tasks**, và **Workshops**. Ngoài ra còn có các bảng hỗ trợ và reference data.

## Cấu trúc Database

### 1. Module Applicants (Quản lý Ứng viên)

| Tên Bảng | Vai trò | Primary Key | Foreign Keys | Key Fields |
|-----------|---------|-------------|--------------|------------|
| **`applicants`** | **Bảng chính** | `applicant_id` | `auth_user_id` → `auth.users.id` | `full_name`, `email`, `is_talent`, `status` |
| `applicant_accounts` | Tài khoản đăng nhập | `account_id` | `applicant_id` → `applicants` | `username`, `role`, `account_status` |
| `applicant_profiles` | Hồ sơ chi tiết | `profile_id` | `applicant_id` → `applicants` | `cv_url`, `portfolio_url`, `summary` |
| `applicant_skills` | Kỹ năng | `applicant_id`, `skill_name` | `applicant_id` → `applicants` | `skill_name` |
| `applicant_majors` | Chuyên ngành | `applicant_id`, `major_id` | `applicant_id` → `applicants`<br>`major_id` → `majors` | `year`, `gpa`, `certificate` |
| `talents` | Ứng viên tài năng | `talent_id` | `applicant_id` → `applicants` | `nickname`, `priority`, `rating` |
| `job_applications` | Đơn ứng tuyển | `application_id` | `applicant_id` → `applicants`<br>`job_id` → `jobs` | `status`, `applied_at` |

### 2. Module Companies (Quản lý Công ty)

| Tên Bảng | Vai trò | Primary Key | Foreign Keys | Key Fields |
|-----------|---------|-------------|--------------|------------|
| **`companies`** | **Bảng chính** | `company_id` | - | `company_name`, `industry`, `is_vip` |
| `company_accounts` | Tài khoản công ty | `account_id` | `company_id` → `companies` | `username`, `role`, `account_status` |
| `company_contact` | Thông tin liên hệ | `contact_id` | `company_id` → `companies` | `contact_email`, `hr_email`, `average_rating` |
| `company_locations` | Địa điểm | `location_id` | `company_id` → `companies` | `headquarter`, `city`, `website_url` |
| `company_timeline` | Timeline hoạt động | `timeline_id` | `company_id` → `companies` | `founded_year`, `active_jobs_count` |
| `company_experience` | Câu chuyện công ty | `experience_id` | `company_id` → `companies` | `slug`, `meta_title`, `total_views` |
| `jobs` | Công việc | `job_id` | `created_by` → `auth.users.id` | `name`, `job_type`, `salary_min`, `status` |

### 3. Module Tasks (Quản lý Nhiệm vụ)

| Tên Bảng | Vai trò | Primary Key | Foreign Keys | Key Fields |
|-----------|---------|-------------|--------------|------------|
| **`tasks`** | **Bảng chính** | `task_id` | `project_id` → `projects`<br>`created_by` → `auth.users.id` | `name`, `status`, `priority`, `deadline` |
| `task_skills` | Kỹ năng yêu cầu | `task_id`, `skill_id` | `task_id` → `tasks`<br>`skill_id` → `skills` | `level` |
| `task_comments` | Bình luận | `id` (uuid) | `task_id` → `tasks` | `content`, `author_id` |
| `task_attachments` | File đính kèm | `id` (uuid) | `task_id` → `tasks` | `file_name`, `file_url`, `file_size` |
| `projects` | Dự án chứa task | `project_id` | `company_id` → `companies`<br>`created_by` → `auth.users.id` | `name`, `status`, `progress`, `compensation` |
| `project_participation` | Tham gia dự án | `project_id`, `applicant_id` | `project_id` → `projects`<br>`applicant_id` → `applicants` | `compensation`, `status` |
| `evaluations` | Đánh giá task | `evaluation_id` | `task_id` → `tasks`<br>`applicant_id` → `applicants` | `content`, `category` |

### 4. Module Workshops (Quản lý Workshop)

| Tên Bảng | Vai trò | Primary Key | Foreign Keys | Key Fields |
|-----------|---------|-------------|--------------|------------|
| **`workshops`** | **Bảng chính** | `workshop_id` | `created_by` → `auth.users.id`<br>`organizer_user_id` → `auth.users.id` | `title`, `theme`, `status`, `start_time` |
| `user_workshops` | Đăng ký workshop | `id` (uuid) | `user_id` → `auth.users.id`<br>`workshop_id` → `workshops` | `attendance_status`, `rating` |
| `workshop_registrations` | Đăng ký (legacy) | `applicant_id`, `workshop_id` | `applicant_id` → `applicants`<br>`workshop_id` → `workshops` | `session_start`, `reason` |
| `workshop_tags` | Tags workshop | `tag_id`, `workshop_id` | `workshop_id` → `workshops`<br>`tag_id` → `tags` | - |
| `lucky_draw_results` | Quay số may mắn | `lucky_draw_id` | `workshop_id` → `workshops`<br>`applicant_id` → `applicants` | `reward`, `draw_time` |

### 5. Bảng Hỗ trợ và Events

| Tên Bảng | Vai trò | Primary Key | Foreign Keys | Key Fields |
|-----------|---------|-------------|--------------|------------|
| `events` | Sự kiện | `event_id` | `created_by` → `auth.users.id` | `title`, `event_type`, `status`, `start_time` |
| `user_events` | Đăng ký sự kiện | `id` (uuid) | `user_id` → `auth.users.id`<br>`event_id` → `events` | `attendance_status`, `rating` |
| `meetings` | Cuộc họp | `meeting_id` | `project_id` → `projects` | `meeting_title`, `meeting_time` |
| `posts` | Bài đăng | `post_id` | `company_id` → `companies`<br>`applicant_id` → `applicants` | `content`, `post_type`, `views_count` |
| `notifications` | Thông báo | `id` (uuid) | - | `title`, `message`, `is_read`, `type` |

### 6. Reference Data (Dữ liệu tham chiếu)

| Tên Bảng | Vai trò | Primary Key | Foreign Keys | Key Fields |
|-----------|---------|-------------|--------------|------------|
| `skills` | Kỹ năng | `skill_id` | - | `name`, `skill_category` |
| `tags` | Tags | `tag_id` | - | `name`, `type` |
| `universities` | Trường đại học | `university_id` | - | `university_name` |
| `majors` | Chuyên ngành | `major_id` | `university_id` → `universities` | `name`, `description` |
| `interests` | Sở thích | `id` | - | `name` |

### 7. Hệ thống Ví và User Management

| Tên Bảng | Vai trò | Primary Key | Foreign Keys | Key Fields |
|-----------|---------|-------------|--------------|------------|
| `es_wallets` | Ví điện tử | `user_id` | `user_id` → `auth.users.id` | `balance` |
| `es_wallet_transactions` | Giao dịch ví | `id` (uuid) | `from_user_id`, `to_user_id` → `auth.users.id` | `amount`, `type`, `note` |
| `user_roles` | Vai trò người dùng | `id` (uuid) | `user_id` → `auth.users.id` | `role` |
| `users` | Người dùng (legacy) | `user_id` | - | `full_name`, `email` |

## Mối quan hệ chính giữa 4 Module

```
APPLICANTS ←→ COMPANIES
    ↓            ↓
    ↓         PROJECTS → TASKS
    ↓            ↓
WORKSHOPS ←→ EVENTS
```

### Luồng dữ liệu chính:
1. **Applicants** ứng tuyển vào **Companies** thông qua `job_applications`
2. **Companies** tạo **Projects**, **Projects** chứa **Tasks**
3. **Applicants** tham gia **Projects** và được assign **Tasks**
4. **Applicants** đăng ký **Workshops** và **Events** để học tập

## Lưu ý quan trọng cho Frontend

### Authentication
- Sử dụng Supabase Auth (`auth.users.id`)
- Bảng `users` là legacy, không dùng cho tính năng mới

### Data Types đặc biệt
- **Array fields**: `requirements`, `benefits`, `tags`, `interests`
- **Enum fields**: `status`, `role`, `type` - cần check constraints
- **UUID vs Integer**: Bảng mới dùng UUID, bảng cũ dùng integer

### Status Values thường gặp
- **Tasks**: `pending`, `in_progress`, `completed`, `cancelled`
- **Applications**: `pending`, `accepted`, `rejected`
- **Workshops/Events**: `scheduled`, `ongoing`, `completed`, `cancelled`

### API Recommendations
1. **Pagination**: Tất cả 4 module chính cần pagination
2. **Filtering**: Theo `status`, `created_at`, owner
3. **Search**: Full-text search cho `name`, `title`, `description`
4. **Permissions**: Check user roles trước khi CRUD
