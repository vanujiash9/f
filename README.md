

# 📖 **Tài liệu Schema Cơ sở dữ liệu `dia_talents`**

## 📝 **Giới thiệu**

Tài liệu này cung cấp một cái nhìn **tổng quan chi tiết** về cấu trúc cơ sở dữ liệu **dia\_talents**.
Mục tiêu: giúp **team Frontend** hiểu rõ:

* Các **mô hình dữ liệu**
* Các **trường quan trọng**
* **Mối quan hệ** giữa các bảng khi làm việc với API.

---

## ⚙️ **Nguyên tắc dành cho Frontend**

* **ID là định danh chính:** mọi đối tượng chính (**ứng viên, công ty, công việc**) đều có một **ID duy nhất** → dùng để gọi API:
  `GET /api/object/{id}`
* **Dữ liệu lồng nhau:** API trả về object có kèm các bản ghi liên quan (ví dụ: profile, skills).
* **Dữ liệu danh mục (Catalogs):** các bảng như `skills`, `universities` có endpoint riêng để FE lấy về populate dropdown/filter.

---

## 👤 **I. Lõi: Ứng viên & Người dùng (Applicant & User Core)**

### 🔹 **`applicants`** (Bảng trung tâm)

| **Tên Cột**              | **Kiểu Dữ liệu** | **Ghi chú cho Frontend**       |
| ------------------------ | ---------------- | ------------------------------ |
| **`applicant_id`**       | `integer`        | **PK** – ID duy nhất           |
| **`full_name`**          | `varchar`        | Hiển thị trên header, profile  |
| **`email`**              | `varchar`        | Dùng để liên lạc, định danh    |
| **`avatar_url`**         | `text`           | Link ảnh đại diện              |
| **`is_talent`**          | `boolean`        | Hiển thị huy hiệu **Talent**   |
| **`profile_completion`** | `integer`        | Vẽ Progress Bar hồ sơ (0–100%) |

---

### 🔹 **`applicant_profiles`**

| **Tên Cột**         | **Kiểu Dữ liệu** | **Ghi chú cho Frontend** |
| ------------------- | ---------------- | ------------------------ |
| **`applicant_id`**  | `integer`        | FK đến `applicants`      |
| **`summary`**       | `text`           | Đoạn giới thiệu bản thân |
| **`cv_url`**        | `varchar`        | Nút tải CV               |
| **`portfolio_url`** | `varchar`        | Nút xem Portfolio        |

---

### 🔹 **`applicant_accounts`**

| **Tên Cột**          | **Kiểu Dữ liệu** | **Ghi chú cho Frontend**           |
| -------------------- | ---------------- | ---------------------------------- |
| **`applicant_id`**   | `integer`        | FK đến `applicants`                |
| **`account_status`** | `enum`           | Check trạng thái (active/inactive) |

---

### 🔹 **`talents`**

| **Tên Cột**        | **Kiểu Dữ liệu** | **Ghi chú cho Frontend** |
| ------------------ | ---------------- | ------------------------ |
| **`applicant_id`** | `integer`        | FK đến `applicants`      |
| **`rating`**       | `numeric`        | Hiển thị số sao đánh giá |

---

### 🔹 **`users`** (Tài khoản nội bộ)

| **Tên Cột**     | **Kiểu Dữ liệu** | **Ghi chú cho Frontend**           |
| --------------- | ---------------- | ---------------------------------- |
| **`user_id`**   | `integer`        | PK – ID user hệ thống              |
| **`full_name`** | `varchar`        | Tên hiển thị trong admin dashboard |

---

### 🔹 **`user_roles`**

| **Tên Cột**   | **Kiểu Dữ liệu** | **Ghi chú cho Frontend** |
| ------------- | ---------------- | ------------------------ |
| **`user_id`** | `uuid`           | FK đến `users`           |
| **`role`**    | `enum`           | admin, mentor, staff...  |

---

## 🏢 **II. Lõi: Công ty (Company Core)**

### 🔹 **`companies`**

| **Tên Cột**        | **Kiểu Dữ liệu** | **Ghi chú cho Frontend** |
| ------------------ | ---------------- | ------------------------ |
| **`company_id`**   | `integer`        | PK – ID duy nhất         |
| **`company_name`** | `varchar`        | Hiển thị tên công ty     |
| **`logo_url`**     | `varchar`        | Logo công ty             |
| **`industry`**     | `varchar`        | Lĩnh vực hoạt động       |
| **`is_vip`**       | `boolean`        | Huy hiệu VIP             |

---

### 🔹 **`company_accounts`**

| **Tên Cột**      | **Kiểu Dữ liệu** | **Ghi chú**        |
| ---------------- | ---------------- | ------------------ |
| **`company_id`** | `integer`        | FK đến `companies` |

> **FE note:** Các bảng chi tiết như `company_contact`, `company_locations` được BE trả gộp trong API **GET /api/companies/\:id**

---

## 💼 **III. Tương tác: Tuyển dụng (Recruitment)**

### 🔹 **`jobs`**

| **Tên Cột**                     | **Kiểu Dữ liệu** | **Ghi chú cho Frontend**   |
| ------------------------------- | ---------------- | -------------------------- |
| **`job_id`**                    | `integer`        | PK – ID job                |
| **`name`**                      | `varchar`        | Tiêu đề tin tuyển dụng     |
| **`company_name`**              | `text`           | Hiển thị nhanh             |
| **`status`**                    | `text`           | Filter job (active/closed) |
| **`experience_level`**          | `text`           | Tag cấp bậc                |
| **`salary_min` / `salary_max`** | `numeric`        | Khoảng lương               |
| **`job_type` / `work_format`**  | `text`           | Tag loại hình làm việc     |

---

### 🔹 **`job_applications`**

| **Tên Cột**          | **Kiểu Dữ liệu** | **Ghi chú cho Frontend**                     |
| -------------------- | ---------------- | -------------------------------------------- |
| **`application_id`** | `integer`        | PK                                           |
| **`applicant_id`**   | `integer`        | FK đến ứng viên                              |
| **`job_id`**         | `integer`        | FK đến job                                   |
| **`status`**         | `enum`           | Hiển thị badge (Pending, Approved, Rejected) |

---

## 📊 **IV. Tương tác: Dự án & Tác vụ (Projects & Tasks)**

### 🔹 **`projects`**

| **Tên Cột**      | **Kiểu Dữ liệu** | **Ghi chú cho Frontend** |
| ---------------- | ---------------- | ------------------------ |
| **`project_id`** | `integer`        | PK                       |
| **`company_id`** | `integer`        | FK                       |
| **`name`**       | `varchar`        | Hiển thị tên             |
| **`status`**     | `enum`           | Filter theo trạng thái   |
| **`progress`**   | `integer`        | Hiển thị progress bar    |

---

### 🔹 **`tasks`**

| **Tên Cột**      | **Kiểu Dữ liệu** | **Ghi chú cho Frontend** |
| ---------------- | ---------------- | ------------------------ |
| **`task_id`**    | `integer`        | PK                       |
| **`project_id`** | `integer`        | FK                       |
| **`name`**       | `varchar`        | Tên task                 |
| **`status`**     | `enum`           | Todo/In Progress/Done    |
| **`priority`**   | `text`           | Hiển thị tag mức ưu tiên |

---

> **Các bảng liên quan:**
> `project_participation`, `project_talents`, `task_comments`, `task_attachments`, `evaluations` → BE trả kèm khi FE lấy chi tiết project/task.

---

## 🎟 **V. Tương tác: Sự kiện & Workshop (Events & Workshops)**

### 🔹 **`events` / `workshops`**

| **Tên Cột**                    | **Kiểu Dữ liệu** | **Ghi chú cho Frontend**   |
| ------------------------------ | ---------------- | -------------------------- |
| **`event_id` / `workshop_id`** | `integer`        | PK                         |
| **`title` / `event_name`**     | `text`           | Tiêu đề hiển thị           |
| **`start_time`**               | `timestamp`      | Thời gian bắt đầu          |
| **`format`**                   | `text`           | Tag (Online, Offline)      |
| **`status`**                   | `text`           | upcoming/ongoing/completed |

---

## 📚 **VI. Dữ liệu Danh mục (Catalog Data)**

* **`skills`** – Danh sách kỹ năng → dùng cho filter, tag cloud
* **`universities`**, **`majors`**, **`tags`**, **`interests`**
* Bảng nối: **`applicant_skills`**, **`task_skills`**, **`applicant_majors`**

---

## 🔔 **VII. Hệ thống & Chức năng phụ (Auxiliary)**

* **`notifications`** – Thông báo (hiển thị ở bell icon)
* **`posts`** – Các bài đăng mạng xã hội
* **`es_wallets`**, **`es_wallet_transactions`** – Ví điện tử
* **`kv_store_e9863467`** – Key-Value store cấu hình hệ thống (FE **không cần quan tâm**)

---

