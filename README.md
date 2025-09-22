📄 Tài liệu Schema Cơ sở dữ liệu dia_talents
📝 Giới thiệu

Tài liệu này cung cấp cái nhìn tổng quan và chi tiết về cấu trúc cơ sở dữ liệu dia_talents.
Mục tiêu: giúp team Frontend hiểu rõ mô hình dữ liệu, các trường quan trọng và mối quan hệ giữa chúng khi gọi API.

🔑 Nguyên tắc dành cho Frontend

ID là định danh chính
Mọi đối tượng (ứng viên, công ty, công việc) đều có ID duy nhất → dùng cho API:
GET /api/object/{id}

Dữ liệu lồng nhau
API trả về object kèm dữ liệu con (profile, skills...) để FE render ngay.

Dữ liệu danh mục (Catalog)
Gọi riêng endpoint GET /api/skills, GET /api/universities... để populate dropdown/filter.

I. Lõi: Ứng viên & Người dùng (Applicant & User Core)
🧑‍💻 Bảng chính
Bảng	Mục đích
applicants	Thông tin định danh cơ bản của ứng viên.
applicant_profiles	Hồ sơ chi tiết (summary, CV, portfolio).
applicant_accounts	Trạng thái tài khoản ứng viên.
talents	Mở rộng cho ứng viên là Talent (rating).
👥 Bảng người dùng nội bộ
Bảng	Mục đích
users	Tài khoản nội bộ (Admin, Mentor).
user_roles	Bảng nối – vai trò user (admin, mentor).
employees	Danh sách nhân viên (Dia hoặc đối tác).
II. Lõi: Công ty (Company Core)
Bảng	Mục đích
companies	Thông tin định danh công ty (tên, logo, VIP).
company_accounts	Tài khoản đăng nhập của đại diện công ty.
company_contact	Thông tin liên hệ (số điện thoại, email).
company_locations	Địa chỉ, chi nhánh.
company_timeline	Mốc thời gian quan trọng (thành lập, sự kiện).
company_experience	Các dự án/kinh nghiệm đã thực hiện.

📌 FE note: Khi gọi API GET /api/company/{id}, BE sẽ trả về data gộp từ tất cả bảng liên quan.

III. Tương tác: Tuyển dụng (Recruitment Interaction)
Bảng	Mục đích
jobs	Tin tuyển dụng (tiêu đề, công ty, mức lương, work format).
job_applications	Lượt ứng tuyển (ai ứng tuyển vào job nào, status).
job_requirements	Yêu cầu kỹ năng, kinh nghiệm.
job_tags	Tags gắn vào job (hot, urgent...).
job_benefits	Quyền lợi, phúc lợi hiển thị cho FE.

📌 FE note: Status active/closed dùng để filter job card.

IV. Tương tác: Dự án & Tác vụ (Projects & Tasks)
Bảng	Mục đích
projects	Dự án thực tế (company_id, name, status, progress).
tasks	Nhiệm vụ trong dự án (name, priority, status).
project_participation	Applicant tham gia dự án nào.
project_talents	Applicant nào là Talent trong dự án.
meetings	Cuộc họp thuộc dự án.
meeting_attendees	Ai tham gia cuộc họp.
evaluations	Đánh giá kết quả task của applicant.
task_comments	Bình luận trong task.
task_attachments	File đính kèm task.
task_skills	Kỹ năng yêu cầu của task.

📌 FE note: progress (0-100) dùng vẽ progress bar trên UI.

V. Tương tác: Sự kiện & Workshop (Events & Workshops)
Bảng	Mục đích
events	Sự kiện cộng đồng (start_time, format, status).
workshops	Workshop đào tạo/mentoring.
connect_events	Sự kiện networking/meetup.
event_registrations	Applicant đăng ký sự kiện.
workshop_registrations	Applicant đăng ký workshop.
user_events	User nội bộ tham dự sự kiện.
user_workshops	User nội bộ tham dự workshop.
event_staff	Nhân viên hỗ trợ sự kiện.
event_jobs	Công việc được giới thiệu trong sự kiện.
lucky_draw_results	Kết quả quay số trúng thưởng.

📌 FE note: Status upcoming / ongoing / completed → dùng hiển thị tag màu.

VI. Dữ liệu Danh mục (Catalog / Master Data)
Bảng	Mục đích
skills	Danh sách kỹ năng.
universities	Danh sách trường ĐH.
majors	Danh sách ngành học.
tags	Danh sách thẻ phân loại.
interests	Danh sách sở thích.
applicant_skills	Gắn skills cho applicant.
applicant_majors	Gắn major cho applicant.
project_tags	Gắn tags cho project.
workshop_tags	Gắn tags cho workshop.

📌 FE note: FE gọi các endpoint GET /api/{catalog} để lấy toàn bộ dữ liệu gốc.

VII. Hệ thống & Chức năng phụ (System & Auxiliary)
Bảng	Mục đích
notifications	Thông báo (FE hiển thị icon chuông).
posts	Bài đăng mạng xã hội.
es_wallets	Ví điện tử của người dùng.
es_wallet_transactions	Lịch sử giao dịch ví.
kv_store_e9863467	Key-value store cho config hệ thống (FE không cần quan tâm).
