ile này tập trung vào việc giải thích mục đích của từng nhóm bảng và các trường dữ liệu chính mà FE cần biết để xây dựng giao diện.
📖 Tài liệu Schema Cơ sở dữ liệu dia_talents cho Frontend
Chào team Frontend,
Tài liệu này mô tả cấu trúc dữ liệu của hệ thống dia_talents từ góc nhìn của Backend. Mục tiêu là giúp các bạn hiểu rõ các thực thể dữ liệu chính, mối quan hệ giữa chúng và các trường thông tin quan trọng nhất mà API sẽ trả về.
Tổng quan
Cơ sở dữ liệu được chia thành các nhóm logic chính sau:
Lõi - Ứng viên (Applicant Core): Thông tin cơ bản và hồ sơ của người tìm việc.
Lõi - Công ty (Company Core): Thông tin về các công ty đối tác.
Tương tác - Tuyển dụng (Recruitment Interaction): Luồng ứng viên nộp đơn vào các vị trí công việc.
Tương tác - Dự án & Tác vụ (Projects & Tasks Interaction): Luồng ứng viên tham gia vào các dự án và thực hiện công việc.
Tương tác - Sự kiện & Workshop (Events & Workshops Interaction): Luồng ứng viên đăng ký và tham gia các sự kiện.
Dữ liệu Danh mục (Catalog Data): Các bảng chứa dữ liệu dùng cho các bộ lọc, dropdown (kỹ năng, trường học, thẻ...).
Hệ thống & Chức năng phụ (System & Auxiliary Features): Các bảng hỗ trợ khác.
1. Lõi - Ứng viên (Applicant Core)
Nhóm này là trái tim của hệ thống, quản lý tất cả thông tin liên quan đến người dùng cuối (ứng viên).
applicants
Bảng trung tâm chứa thông tin định danh cơ bản của một ứng viên.
Tên cột	Ghi chú
applicant_id	PK - ID duy nhất của ứng viên, sẽ được dùng trong mọi API.
full_name	Tên đầy đủ để hiển thị trên UI.
email	Email duy nhất, dùng để liên lạc và định danh.
avatar_url	Link ảnh đại diện.
is_talent	Cờ true/false để biết đây có phải là một "talent" đặc biệt hay không.
... và các trường thông tin cá nhân khác.	
applicant_accounts
Thông tin đăng nhập của ứng viên.
Tên cột	Ghi chú
account_id	PK - ID của tài khoản.
applicant_id	FK - Liên kết 1-1 tới bảng applicants.
username	Tên đăng nhập (nếu có).
account_status	Trạng thái tài khoản (e.g., active, inactive).
applicant_profiles
Hồ sơ chi tiết của ứng viên, chứa các thông tin mà họ tự điền để làm đẹp profile.
Tên cột	Ghi chú
profile_id	PK - ID của hồ sơ.
applicant_id	FK - Liên kết 1-1 tới bảng applicants.
summary	Đoạn tóm tắt giới thiệu bản thân.
cv_url	Link tới file CV.
portfolio_url	Link tới trang portfolio cá nhân.
... và các trường mô tả kinh nghiệm, giáo dục dưới dạng text.	
talents
Mở rộng thông tin cho những ứng viên được đánh dấu là is_talent = true.
Tên cột	Ghi chú
talent_id	PK - ID của "talent".
applicant_id	FK - Liên kết 1-1 tới bảng applicants.
rating	Điểm đánh giá (e.g., 1-5 sao).
priority	Mức độ ưu tiên.
2. Lõi - Công ty (Company Core)
Nhóm này quản lý thông tin của các công ty, nhà tuyển dụng.
companies
Thông tin định danh cơ bản của một công ty.
Tên cột	Ghi chú
company_id	PK - ID duy nhất của công ty.
company_name	Tên công ty để hiển thị.
logo_url	Link ảnh logo.
industry	Lĩnh vực hoạt động.
... và các trường mô tả, tên thương hiệu.	
company_accounts
Tài khoản đăng nhập cho đại diện công ty.
Tên cột	Ghi chú
account_id	PK - ID tài khoản công ty.
company_id	FK - Liên kết 1-1 tới bảng companies.
(Các bảng company_contact, company_locations, company_timeline, company_experience cung cấp thông tin chi tiết, phụ trợ cho trang profile của công ty).
3. Tương tác - Tuyển dụng (Recruitment Interaction)
Nhóm này mô tả luồng chính: công ty đăng việc và ứng viên nộp đơn.
jobs
Thông tin chi tiết về một vị trí công việc.
Tên cột	Ghi chú
job_id	PK - ID duy nhất của công việc.
name	Tên vị trí tuyển dụng (e.g., "Senior Frontend Developer").
company_name	Tên công ty (lưu sẵn để hiển thị nhanh).
status	Trạng thái tin tuyển dụng (active, closed).
experience_level	Yêu cầu kinh nghiệm (entry, mid, senior).
... và các trường về lương, địa điểm, yêu cầu, phúc lợi.	
job_applications
Bảng ghi lại hành động một ứng viên ứng tuyển vào một công việc.
Tên cột	Ghi chú
application_id	PK - ID của lượt ứng tuyển.
applicant_id	FK - Ai là người ứng tuyển.
job_id	FK - Đã ứng tuyển vào công việc nào.
status	Trạng thái hồ sơ (pending, approved, rejected). Quan trọng cho UI.
4. Tương tác - Dự án & Tác vụ (Projects & Tasks Interaction)
Nhóm này quản lý các dự án thực tế mà "talent" có thể tham gia.
projects
Thông tin về một dự án.
Tên cột	Ghi chú
project_id	PK - ID duy nhất của dự án.
company_id	FK - Dự án này thuộc công ty nào.
name	Tên dự án.
status	Trạng thái dự án (active, completed).
tasks
Các công việc/nhiệm vụ cụ thể trong một dự án.
Tên cột	Ghi chú
task_id	PK - ID duy nhất của tác vụ.
project_id	FK - Tác vụ này thuộc dự án nào.
name	Tên tác vụ.
status	Trạng thái (pending, in_progress, done).
project_participation
Bảng nối cho biết ứng viên nào tham gia dự án nào.
Tên cột	Ghi chú
applicant_id	PK, FK - Ai tham gia.
project_id	PK, FK - Tham gia vào dự án nào.
(Các bảng evaluations, meetings, task_comments, task_attachments là các dữ liệu chi tiết hỗ trợ cho một tác vụ hoặc dự án).
5. Tương tác - Sự kiện & Workshop (Events & Workshops Interaction)
Nhóm này quản lý các hoạt động cộng đồng.
events & workshops
Thông tin về các sự kiện (hội thảo, ngày hội việc làm) và các buổi workshop.
Tên cột	Ghi chú
event_id / workshop_id	PK - ID định danh.
title	Tên sự kiện/workshop.
start_time	Thời gian bắt đầu.
format	Hình thức (online, offline).
event_registrations & workshop_registrations
Ghi lại việc ứng viên đăng ký tham gia các hoạt động trên.
Tên cột	Ghi chú
applicant_id	PK, FK - Ai đăng ký.
event_id / workshop_id	PK, FK - Đăng ký cho hoạt động nào.
6. Dữ liệu Danh mục (Catalog Data)
Các bảng này chứa dữ liệu để FE hiển thị trong các bộ lọc, ô tìm kiếm hoặc các lựa chọn có sẵn. API sẽ có các endpoint riêng để lấy danh sách các mục này.
skills: Danh sách tất cả các kỹ năng trong hệ thống.
universities: Danh sách các trường đại học.
majors: Danh sách các ngành học.
tags: Danh sách các thẻ (tags) để phân loại nội dung.
interests: Danh sách các sở thích.
(Các bảng nối như applicant_skills, task_skills, applicant_majors được dùng để áp dụng các danh mục này vào các đối tượng khác).
7. Hệ thống & Chức năng phụ (System & Auxiliary Features)
Các bảng này phục vụ các chức năng không thuộc các luồng chính.
users & user_roles: Quản lý tài khoản nội bộ (Admin, nhân viên Dia).
notifications: Chứa các thông báo đẩy đến người dùng.
posts: Các bài đăng từ ứng viên hoặc công ty.
es_wallets & es_wallet_transactions: Tính năng ví điện tử.
