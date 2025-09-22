📖 Tài liệu Schema CSDL dia_talents

📌 Link ERD đầy đủ: Xem tại đây

1️⃣ Nhóm Applicants & Users
Bảng	PK / Trường chính	FK / Quan hệ	Ý nghĩa (Frontend)
applicants	applicant_id	1-N → profiles, skills, job_applications	Hồ sơ gốc ứng viên (tên, email, avatar, trạng thái).
applicant_accounts	account_id	applicant_id → applicants	Tài khoản đăng nhập (active/inactive).
applicant_profiles	profile_id	applicant_id → applicants	Chi tiết hồ sơ (CV, portfolio, summary).
applicant_skills	(applicant_id, skill_name)	applicant_id → applicants	Liệt kê kỹ năng ứng viên (text).
applicant_majors	(applicant_id, major_id)	major_id → majors	Ngành học / GPA / năm tốt nghiệp.
talents	talent_id	applicant_id → applicants	Tag ứng viên thành “talent”, kèm độ ưu tiên, rating.
users (internal)	user_id	–	Nhân sự nội bộ (admin, staff).
user_roles	id (uuid)	user_id → auth.users	Role của user trong hệ thống (admin, mentor…).
employees	employee_id	company_id → companies	Dữ liệu nhân sự nội bộ công ty.
2️⃣ Nhóm Companies
Bảng	PK / Trường chính	FK / Quan hệ	Ý nghĩa (Frontend)
companies	company_id	1-N → jobs, projects	Thông tin công ty (tên, logo, ngành).
company_accounts	account_id	company_id → companies	Quản lý user của công ty (HR).
company_locations	location_id	company_id → companies	Danh sách văn phòng / địa điểm.
company_contact	contact_id	company_id → companies	Email, số điện thoại, website chính thức.
company_timeline	timeline_id	company_id → companies	Mốc sự kiện nội bộ công ty (dùng hiển thị timeline).
3️⃣ Nhóm Jobs & Applications
Bảng	PK / Trường chính	FK / Quan hệ	Ý nghĩa (Frontend)
jobs	job_id	company_id → companies	Tin tuyển dụng (tiêu đề, mức lương, loại hình).
job_applications	application_id	job_id → jobs, applicant_id → applicants	Đơn ứng tuyển.
job_tags	(job_id, tag_id)	tag_id → tags	Gắn thẻ phân loại job.
job_skills	(job_id, skill_id)	skill_id → skills	Yêu cầu kỹ năng cho job.
4️⃣ Nhóm Projects & Tasks
Bảng	PK / Trường chính	FK / Quan hệ	Ý nghĩa (Frontend)
projects	project_id	company_id → companies	Dự án thuộc công ty.
project_participation	(project_id, applicant_id)	applicant_id → applicants	Thành viên tham gia dự án.
tasks	task_id	project_id → projects	Nhiệm vụ trong dự án.
task_comments	comment_id	task_id → tasks, user_id → users	Bình luận trong task.
task_skills	(task_id, skill_id)	skill_id → skills	Kỹ năng yêu cầu cho task.
5️⃣ Nhóm Events & Workshops
Bảng	PK / Trường chính	FK / Quan hệ	Ý nghĩa (Frontend)
events	event_id	–	Sự kiện kết nối (tên, thời gian).
event_registrations	(event_id, applicant_id)	event_id → events	Ghi nhận ứng viên đăng ký.
event_jobs	(event_id, job_id)	job_id → jobs	Job giới thiệu trong sự kiện.
workshops	workshop_id	–	Workshop đào tạo / huấn luyện.
workshop_registrations	(workshop_id, applicant_id)	applicant_id → applicants	Ghi nhận người tham dự workshop.
6️⃣ Nhóm Catalog & Metadata
Bảng	PK / Trường chính	FK / Quan hệ	Ý nghĩa (Frontend)
skills	skill_id	N-N → applicant_skills, task_skills, job_skills	Danh sách kỹ năng chuẩn hóa.
majors	major_id	N-N → applicant_majors	Danh sách ngành học.
universities	university_id	–	Danh sách trường.
tags	tag_id	N-N → job_tags, project_tags	Thẻ phân loại.
interests	interest_id	–	Sở thích ứng viên.
7️⃣ Logging & API
Bảng	PK / Trường chính	FK / Quan hệ	Ý nghĩa (Frontend)
sessions	session_id	user_id → users	Phiên đăng nhập.
email_verifications	verification_id	applicant_id → applicants	Xác thực email.
chat_sessions	chat_session_id	applicant_id → applicants	Phiên chat chatbot.
chat_messages	message_id	chat_session_id → chat_sessions	Lịch sử tin nhắn chat.
api_keys	key_id	user_id → users	Khóa API của user.
api_usage_logs	log_id	key_id → api_keys	Ghi lại request từ API.
history_logs	log_id	user_id → users	Nhật ký thao tác người dùng.

📌 Liên hệ BE:
📧 Email: thanh.van19062004@gmail.com

🎥 TikTok: @bevancutethichhocdata

