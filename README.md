# Talent Pool Database – Backend Documentation

> **Mục tiêu:** Cung cấp cho Frontend team cái nhìn rõ ràng về database schema, quan hệ giữa các bảng, và cách query dữ liệu từ Supabase.

---

## 1️⃣ Kiến trúc tổng quan

Hệ thống được chia thành 5 nhóm bảng chính:

1. **Applicants** – Quản lý ứng viên, tài khoản, hồ sơ.
2. **Companies** – Thông tin công ty, tài khoản công ty, địa điểm.
3. **Jobs & Applications** – Danh sách công việc và đơn ứng tuyển.
4. **Projects & Tasks** – Dự án, nhiệm vụ, người tham gia.
5. **Events & Workshops** – Sự kiện, đăng ký, workshop.

Mỗi nhóm được thiết kế với **quan hệ rõ ràng** (PK/FK) để FE dễ join dữ liệu khi hiển thị.

---

## 2️⃣ Bảng chính & Mối quan hệ

### 👤 Applicants
| Bảng | Trường chính | Quan hệ |
|------|-------------|---------|
| `applicants` | `id` | 1–N với `applicant_profiles`, `job_applications`, `project_participation` |
| `applicant_accounts` | `id`, `applicant_id` | FK → `applicants.id` |
| `applicant_profiles` | `id`, `applicant_id` | FK → `applicants.id` |
| `applicant_skills` | `id`, `applicant_id` | FK → `applicants.id` |
| `applicant_majors` | `id`, `applicant_id`, `major_id` | FK → `applicants.id`, `majors.id` |

**Use case FE:**  
- Hiển thị danh sách ứng viên + kỹ năng + hồ sơ
- Cho phép user chỉnh sửa CV/Portfolio

---

### 🏢 Companies
| Bảng | Trường chính | Quan hệ |
|------|-------------|---------|
| `companies` | `id` | 1–N với `company_locations`, `jobs`, `projects` |
| `company_accounts` | `id`, `company_id` | FK → `companies.id` |
| `company_locations` | `id`, `company_id` | FK → `companies.id` |
| `company_contact` | `company_id` | FK → `companies.id` |

**Use case FE:**  
- Trang chi tiết công ty (logo, giới thiệu, địa điểm, số job đang mở)
- Danh sách job theo công ty

---

### 💼 Jobs & Applications
| Bảng | Trường chính | Quan hệ |
|------|-------------|---------|
| `jobs` | `id`, `company_id` | FK → `companies.id` |
| `job_applications` | `id`, `job_id`, `applicant_id` | FK → `jobs.id`, `applicants.id` |

**Use case FE:**  
- Hiển thị job listing (filter theo lương, loại việc)
- Ứng viên nhấn "Apply" → tạo record trong `job_applications`

---

### 📂 Projects & Tasks
| Bảng | Trường chính | Quan hệ |
|------|-------------|---------|
| `projects` | `id`, `company_id` | FK → `companies.id` |
| `project_participation` | `project_id`, `applicant_id` | FK → `projects.id`, `applicants.id` |
| `tasks` | `id`, `project_id` | FK → `projects.id` |
| `task_comments` | `task_id`, `user_id` | FK → `tasks.id`, `users.id` |

**Use case FE:**  
- Trang quản lý dự án (list project + list thành viên)
- Board Kanban để quản lý tasks + comment realtime

---

### 🎉 Events & Workshops
| Bảng | Trường chính | Quan hệ |
|------|-------------|---------|
| `events` | `id` | 1–N với `event_registrations`, `event_jobs` |
| `event_registrations` | `id`, `event_id`, `applicant_id` | FK → `events.id`, `applicants.id` |
| `event_jobs` | `event_id`, `job_id` | FK → `events.id`, `jobs.id` |

**Use case FE:**  
- Trang sự kiện: show chi tiết event, cho phép đăng ký
- Hiển thị job tuyển dụng trong sự kiện

---

## 3️⃣ Cách Query từ FE (Supabase JS)

### Lấy danh sách job kèm công ty
```js
const { data, error } = await supabase
  .from('jobs')
  .select(`
    id, title, min_salary, max_salary, deadline,
    companies ( id, name, logo_url )
  `);

