# 📖 Tài liệu Schema Cơ sở Dữ liệu `dia_talents`

Tài liệu này giải thích chi tiết cấu trúc cơ sở dữ liệu từ góc nhìn Backend, giúp Frontend hiểu rõ bảng, cột, và mối quan hệ để hiển thị dữ liệu đúng cách khi gọi API.

---

## 1. Nguyên tắc dành cho Frontend

| Quy tắc | Ý nghĩa |
|--------|---------|
| ID là định danh chính | Mọi đối tượng chính (ứng viên, công ty, công việc) đều có một ID duy nhất. FE dùng ID để gọi API chi tiết (`GET /api/object/{id}`). |
| Dữ liệu lồng nhau | API sẽ trả về dữ liệu đã join sẵn. Ví dụ: chi tiết ứng viên sẽ bao gồm thông tin hồ sơ và danh sách kỹ năng. |
| Dữ liệu danh mục | Các bảng danh mục (skills, universities, majors, tags...) có endpoint riêng để FE lấy về cho bộ lọc/dropdown. |

---

## 2. Nhóm Bảng & Ý Nghĩa

### 2.1. Applicants (Ứng viên & Hồ sơ)
| Bảng | Trường chính | Quan hệ | Ý nghĩa |
|------|-------------|---------|--------|
| `applicants` | `applicant_id` | 1-N với profiles, skills, job_applications | Hồ sơ gốc của ứng viên (tên, email, avatar, trạng thái talent). |
| `applicant_accounts` | `applicant_id` | FK → applicants | Quản lý tài khoản đăng nhập (active/inactive). |
| `applicant_profiles` | `applicant_id` | FK → applicants | Hồ sơ chi tiết (CV, portfolio, summary). |
| `applicant_skills` | `applicant_id`, `skill_id` | FK → applicants, skills | Liệt kê kỹ năng của ứng viên. |
| `applicant_majors` | `applicant_id`, `major_id` | FK → applicants, majors | Liệt kê ngành học của ứng viên. |

---

### 2.2. Companies (Công ty)
| Bảng | Trường chính | Quan hệ | Ý nghĩa |
|------|-------------|---------|--------|
| `companies` | `company_id` | 1-N với jobs, projects | Thông tin công ty (tên, logo, ngành nghề). |
| `company_accounts` | `company_id` | FK → companies | Tài khoản đại diện công ty (HR). |
| `company_locations` | `company_id` | FK → companies | Danh sách địa điểm văn phòng. |
| `company_contact` | `company_id` | FK → companies | Thông tin liên hệ chính thức. |

---

### 2.3. Jobs & Applications (Tuyển dụng)
| Bảng | Trường chính | Quan hệ | Ý nghĩa |
|------|-------------|---------|--------|
| `jobs` | `job_id`, `company_id` | FK → companies | Thông tin tin tuyển dụng (tiêu đề, mức lương, loại hình). |
| `job_applications` | `application_id`, `job_id`, `applicant_id` | FK → jobs, applicants | Đơn ứng tuyển của ứng viên cho công việc. |

---

### 2.4. Projects & Tasks (Dự án & Nhiệm vụ)
| Bảng | Trường chính | Quan hệ | Ý nghĩa |
|------|-------------|---------|--------|
| `projects` | `project_id`, `company_id` | FK → companies | Dự án thuộc công ty. |
| `project_participation` | `project_id`, `applicant_id` | FK → projects, applicants | Xác định ứng viên nào tham gia dự án. |
| `tasks` | `task_id`, `project_id` | FK → projects | Các nhiệm vụ trong dự án. |
| `task_comments` | `task_id`, `user_id` | FK → tasks, users | Bình luận và cập nhật trạng thái task. |
| `task_skills` | `task_id`, `skill_id` | FK → tasks, skills | Kỹ năng yêu cầu cho từng task. |

---

### 2.5. Events & Workshops (Sự kiện & Hoạt động)
| Bảng | Trường chính | Quan hệ | Ý nghĩa |
|------|-------------|---------|--------|
| `events` | `event_id` | 1-N với registrations, event_jobs | Thông tin sự kiện (tên, thời gian, trạng thái). |
| `event_registrations` | `event_id`, `applicant_id` | FK → events, applicants | Ghi nhận ứng viên đăng ký tham gia sự kiện. |
| `event_jobs` | `event_id`, `job_id` | FK → events, jobs | Liên kết job được giới thiệu trong sự kiện. |

---

### 2.6. Catalogs (Dữ liệu danh mục)
| Bảng | Trường chính | Quan hệ | Ý nghĩa |
|------|-------------|---------|--------|
| `skills` | `skill_id` | N-N với applicants, tasks | Danh sách kỹ năng dùng cho applicant_skills và task_skills. |
| `universities` | `university_id` | N-N với applicants | Danh sách trường đại học. |
| `majors` | `major_id` | N-N với applicants | Danh sách ngành học. |
| `tags` | `tag_id` | N-N với projects, workshops | Danh sách thẻ phân loại. |

---

## 3. Hướng dẫn cho Frontend

- Luôn lấy `id` để gọi API chi tiết.
- Kiểm tra dữ liệu null trước khi render (CV có thể chưa có).
- Với các bảng nối (skills, majors), hãy gọi endpoint riêng để lấy danh sách trước, sau đó filter theo `id`.

Ví dụ query danh sách job kèm tên công ty:
```js
const { data } = await supabase
  .from('jobs')
  .select(`
    job_id, name, salary_min, salary_max,
    companies ( company_name, logo_url )
  `);
4. Liên hệ
Nếu có yêu cầu thêm API hoặc view phức tạp, vui lòng liên hệ BE qua:
📧 Email: thanh.van19062004@gmail.com
📱 TikTok: @bevancutethichhocdata

5. Sơ đồ ERD (Đề xuất)

yaml
Copy code

---

📌 **Điểm chính:**  
- Không còn icon gây rối.  
- Các bảng & mối quan hệ cân đối, trình bày theo nhóm rõ ràng.  
- Có cột "Ý nghĩa" giải thích từng bảng cho FE.  
- Thêm thông tin liên hệ BE ở cuối.  

Bạn có muốn mình **vẽ luôn file ERD thực tế (PNG hoặc SVG)** dựa trên tài liệu này để bạn đưa vào thư mục 
