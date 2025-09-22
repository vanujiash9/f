

Tài liệu Schema Cơ sở dữ liệu dia_talents
Giới thiệu

Tài liệu này cung cấp một cái nhìn tổng quan chi tiết và đầy đủ về cấu trúc cơ sở dữ liệu dia_talents. Mục tiêu là diễn giải schema từ góc độ của Backend để team Frontend có thể hiểu rõ các mô hình dữ liệu, các trường thông tin quan trọng và mối quan hệ giữa chúng khi làm việc với API.

Nguyên tắc dành cho Frontend

ID là định danh chính: Mọi đối tượng chính (ứng viên, công ty, công việc) đều có một ID duy nhất. Đây là khóa chính để thực hiện các lời gọi API chi tiết (GET /api/object/{id}).

Dữ liệu lồng nhau: API sẽ trả về các đối tượng đã được kết hợp sẵn. Ví dụ, khi gọi API lấy chi tiết một ứng viên, bạn sẽ nhận được cả thông tin profile và danh sách kỹ năng của họ trong cùng một response.

Dữ liệu danh mục (Catalogs): Các bảng chứa danh sách (ví dụ: skills, universities) sẽ có các endpoint riêng để FE lấy dữ liệu và hiển thị trong các bộ lọc hoặc dropdown.

I. Lõi: Ứng viên & Người dùng (Applicant & User Core)

Nhóm này chứa các thực thể trung tâm, đại diện cho con người trong hệ thống.

applicants

Bảng quan trọng nhất, chứa thông tin định danh cơ bản của một ứng viên.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
applicant_id	integer	PK - ID duy nhất, dùng trong mọi API liên quan đến ứng viên này.
full_name	varchar	Hiển thị: Tên người dùng trên header, profile.
email	varchar	Hiển thị & Liên lạc: Email chính.
avatar_url	text	Hiển thị: Link ảnh đại diện.
is_talent	boolean	UI Logic: Nếu true, hiển thị huy hiệu "Talent".
profile_completion	integer	UI Logic: Dữ liệu (0-100) để vẽ Progress Bar hoàn thiện hồ sơ.
applicant_profiles

Hồ sơ chi tiết, chứa các thông tin do ứng viên tự điền để làm đẹp profile.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
applicant_id	integer	FK - Liên kết tới applicants.
summary	text	Hiển thị: Đoạn "Giới thiệu bản thân".
cv_url	varchar	Chức năng: Link để tạo nút "Tải CV".
portfolio_url	varchar	Chức năng: Link để tạo nút "Xem Portfolio".
applicant_accounts

Thông tin tài khoản để ứng viên đăng nhập vào hệ thống.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
applicant_id	integer	FK - Liên kết tới applicants.
account_status	enum	UI Logic: Dùng để kiểm tra trạng thái tài khoản (active, inactive).
talents

Thông tin mở rộng cho những ứng viên được đánh dấu là "talent" (is_talent = true).

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
applicant_id	integer	FK - Liên kết tới applicants.
rating	numeric	Hiển thị: Điểm đánh giá (ví dụ: 1-5 sao).
users

Tài khoản người dùng nội bộ (Admin, nhân viên Dia, Mentor...).

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
user_id	integer	PK - ID của người dùng hệ thống.
full_name	varchar	Tên người dùng nội bộ.
user_roles

Bảng nối xác định vai trò của một User nội bộ.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
user_id	uuid	FK - Người dùng được gán vai trò.
role	enum	Vai trò cụ thể (ví dụ: admin, mentor).
employees

Thông tin về các nhân viên (có thể là nhân viên của Dia hoặc của công ty đối tác).

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
employees_id	integer	PK - ID của nhân viên.
role	varchar	Vai trò của nhân viên.
II. Lõi: Công ty (Company Core)

Nhóm này quản lý thông tin của các công ty và nhà tuyển dụng.

companies

Thông tin định danh cơ bản của một công ty.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
company_id	integer	PK - ID duy nhất của công ty.
company_name	varchar	Hiển thị: Tên chính của công ty.
logo_url	varchar	Hiển thị: Link logo.
industry	varchar	Hiển thị: Lĩnh vực hoạt động.
is_vip	boolean	UI Logic: Nếu true, hiển thị huy hiệu "VIP".
company_accounts

Tài khoản đăng nhập cho đại diện công ty.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
company_id	integer	FK - Liên kết tới companies.
Các bảng thông tin chi tiết công ty

Ghi chú cho FE: Dữ liệu từ các bảng này (company_contact, company_locations, company_timeline, company_experience) sẽ được BE tổng hợp và trả về trong một API duy nhất khi FE gọi lấy chi tiết một công ty.

III. Tương tác: Tuyển dụng (Recruitment Interaction)

Nhóm này mô tả luồng chính: công ty đăng việc và ứng viên nộp đơn.

jobs

Thông tin chi tiết về một vị trí công việc.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
job_id	integer	PK - ID duy nhất của công việc.
name	varchar	Hiển thị: Tên/Tiêu đề của tin tuyển dụng.
company_name	text	Hiển thị: Tên công ty (để hiển thị nhanh trên card).
status	text	UI Logic: Dùng để filter (active/closed).
experience_level	text	Hiển thị: Tag/label cấp bậc (e.g., Entry, Junior).
salary_min, salary_max	numeric	Hiển thị: Dữ liệu cho khoảng lương.
job_type, work_format	text	Hiển thị: Tags cho loại hình (Full-time, Remote).
job_applications

Bảng ghi lại hành động một ứng viên ứng tuyển vào một công việc.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
application_id	integer	PK - ID của lượt ứng tuyển.
applicant_id	integer	FK - Ai là người ứng tuyển.
job_id	integer	FK - Đã ứng tuyển vào công việc nào.
status	enum	Quan trọng cho UI: Dùng để hiển thị tag màu (Đang chờ, Đã duyệt).
IV. Tương tác: Dự án & Tác vụ (Projects & Tasks)

Nhóm này quản lý các dự án thực tế mà "talent" có thể tham gia.

projects

Thông tin về một dự án.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
project_id	integer	PK - ID duy nhất của dự án.
company_id	integer	FK - Dự án này thuộc công ty nào.
name	varchar	Hiển thị: Tên dự án.
status	enum	UI Logic: Dùng để filter và hiển thị tag trạng thái.
progress	integer	Hiển thị: Dữ liệu (0-100) để vẽ Progress Bar.
tasks

Các công việc/nhiệm vụ cụ thể trong một dự án.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
task_id	integer	PK - ID duy nhất của tác vụ.
project_id	integer	FK - Tác vụ này thuộc dự án nào.
name	varchar	Hiển thị: Tên tác vụ.
status	enum	UI Logic: Hiển thị trạng thái của task (Todo, In Progress, Done).
priority	text	UI Logic: Hiển thị icon/tag độ ưu tiên (low, medium, high).
Các bảng liên quan đến Dự án & Tác vụ

project_participation: Bảng nối cho biết Applicant nào tham gia Project nào.

project_talents: Bảng nối thể hiện Applicant nào là "talent" trong Project.

meetings & meeting_attendees: Quản lý các cuộc họp và người tham dự.

evaluations: Chứa các đánh giá cho Task của một Applicant.

task_comments & task_attachments: Các bình luận và file đính kèm cho một Task.

V. Tương tác: Sự kiện & Workshop (Events & Workshops)

Nhóm này quản lý các hoạt động cộng đồng và việc tham gia của người dùng.

events, workshops, & connect_events

Thông tin về các sự kiện, workshop và các sự kiện kết nối.

Tên Cột	Kiểu Dữ liệu	Ghi chú cho Frontend
event_id/workshop_id	integer	PK - ID của hoạt động.
title/event_name	text	Hiển thị: Tên sự kiện/workshop.
start_time	timestamp	Hiển thị: Thời gian bắt đầu.
format	text	Hiển thị: Tag hình thức (Online, Offline).
status	text	UI Logic: Trạng thái (upcoming, ongoing, completed).
Các bảng ghi danh và tham gia

event_registrations & workshop_registrations: Ghi lại việc Applicant đăng ký tham gia.

user_events & user_workshops: Ghi lại trạng thái tham dự của User (nội bộ).

event_staff: Ai là nhân viên hỗ trợ cho sự kiện.

event_jobs: Các công việc được giới thiệu trong sự kiện.

lucky_draw_results: Kết quả quay số may mắn trong workshop.

VI. Dữ liệu Danh mục (Catalog / Master Data)

Nhóm này chứa dữ liệu không thay đổi thường xuyên, dùng để populate cho các component UI.

Ghi chú cho FE: Đây là dữ liệu "master data". Các bạn sẽ gọi các endpoint riêng như GET /api/skills để lấy toàn bộ danh sách và populate cho các component Filter, Dropdown, hoặc Autocomplete.

skills: Danh sách tất cả các kỹ năng trong hệ thống.

universities: Danh sách các trường đại học.

majors: Danh sách các ngành học.

tags: Danh sách các thẻ để phân loại.

interests: Danh sách các sở thích.

Các bảng nối danh mục

applicant_skills & task_skills: Áp dụng skills vào ứng viên và tác vụ.

applicant_majors: Áp dụng majors vào ứng viên.

project_tags & workshop_tags: Áp dụng tags vào dự án và workshop.

VII. Hệ thống & Chức năng phụ (System & Auxiliary Features)

Các bảng này phục vụ các chức năng hỗ trợ.

notifications: Chứa các thông báo (hiển thị ở chuông thông báo trên header).

posts: Các bài đăng trên nền tảng (tính năng mạng xã hội).

es_wallets & es_wallet_transactions: Tính năng ví điện tử và lịch sử giao dịch.

kv_store_e9863467: Bảng lưu trữ key-value cho các cấu hình hệ thống (FE không cần quan tâm).
