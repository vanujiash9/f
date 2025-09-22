Chắc chắn rồi. Tôi đã hiểu, bạn muốn tôi tái tạo lại file README.md đã được trang trí đẹp mắt trước đó, nhưng lần này phải đầy đủ và chính xác 100% theo toàn bộ schema bạn vừa cung cấp.

Dưới đây là phiên bản hoàn chỉnh, được thiết kế dành riêng cho team Frontend, với đầy đủ các bảng, nhóm logic, và các ghi chú chi tiết.

📖 Hệ thống dia_talents - Tài liệu Schema cho Frontend

Chào mừng team Frontend!

Tài liệu này là cầu nối giữa Backend và Frontend. Thay vì nhìn vào cấu trúc SQL khô khan, chúng tôi đã diễn giải cơ sở dữ liệu thành các "Đối tượng" (Objects) mà các bạn sẽ nhận được qua API. Hãy xem đây là "kim chỉ nam" về dữ liệu để xây dựng các component và quản lý state hiệu quả.

💡 Nguyên tắc vàng cho FE: Mọi thứ đều xoay quanh ID. Bạn sẽ dùng ID của một đối tượng (ví dụ: applicant_id) để truy vấn thông tin chi tiết hoặc thực hiện các hành động liên quan đến nó.

👤 Lõi: Ứng viên & Người dùng (Applicant & User Core)

Đây là nhóm thực thể quan trọng nhất, đại diện cho người dùng cuối (ứng viên), tài khoản nội bộ và hồ sơ của họ.

### applicants

Đây là đối tượng Applicant chính. Mọi thông tin định danh cơ bản đều nằm ở đây.

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
applicant_id	integer	PK - ID duy nhất. Sẽ là key trong mọi API call liên quan đến user này.
full_name	varchar	Hiển thị: Tên người dùng trên header, profile.
email	varchar	Hiển thị & Liên lạc: Email chính.
avatar_url	text	Hiển thị: Link ảnh để render thẻ <img>.
is_talent	boolean	UI Logic: Nếu true, hiển thị huy hiệu "Talent" đặc biệt bên cạnh tên.
profile_completion	integer	UI Logic: Dữ liệu (0-100) để vẽ component Progress Bar hoàn thiện hồ sơ.
### applicant_profiles

Đối tượng ApplicantProfile, chứa các dữ liệu "rich content" do người dùng tự điền. Thường sẽ được lồng trong API response của Applicant.

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
applicant_id	integer	FK - Liên kết tới applicants.
summary	text	Hiển thị: Đoạn "Giới thiệu bản thân" nổi bật ở đầu trang profile.
cv_url	varchar	Chức năng: Link để tạo nút "Tải CV".
portfolio_url	varchar	Chức năng: Link để tạo nút "Xem Portfolio".
### users

Đối tượng User, đại diện cho các tài khoản nội bộ như Admin, nhân viên Dia, Mentor...

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
user_id	integer	PK - ID của người dùng hệ thống.
full_name	varchar	Tên người dùng nội bộ.
email	varchar	Email đăng nhập.

(Các bảng applicant_accounts, talents, user_roles, employees chứa thông tin về tài khoản, vai trò và các thuộc tính nâng cao, BE sẽ xử lý logic này).

🏢 Lõi: Công ty (Company Core)

Nhóm thực thể đại diện cho các đối tác tuyển dụng và trang hồ sơ của họ.

### companies

Đối tượng Company cơ bản.

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
company_id	integer	PK - ID duy nhất của công ty.
company_name	varchar	Hiển thị: Tên chính của công ty.
logo_url	varchar	Hiển thị: Link logo để hiển thị trên các card việc làm và trang công ty.
industry	varchar	Hiển thị: Dùng để hiển thị tag hoặc thông tin lĩnh vực.
is_vip	boolean	UI Logic: Nếu true, hiển thị huy hiệu "VIP" bên cạnh tên công ty.

📝 Ghi chú: Trang profile công ty sẽ rất chi tiết. BE sẽ tổng hợp dữ liệu từ các bảng phụ (company_contact, company_locations, company_timeline, company_experience) vào một API response duy nhất là GET /api/companies/{id}.

🤝 Tương tác: Tuyển dụng (Recruitment Interaction)

Luồng tương tác chính: Công ty đăng tin, ứng viên ứng tuyển.

### jobs

Đối tượng Job, đại diện cho một tin đăng tuyển.

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
job_id	integer	PK - ID duy nhất của công việc.
name	varchar	Hiển thị: Tên/Tiêu đề của tin tuyển dụng.
company_name	text	Hiển thị: Tên công ty (để hiển thị nhanh trên card, không cần join).
status	text	UI Logic: Dùng để filter (active/closed) hoặc hiển thị tag "Còn hạn".
experience_level	text	Hiển thị: Dùng để hiển thị tag/label cấp bậc (e.g., Entry, Junior).
salary_min, salary_max	numeric	Hiển thị: Dữ liệu cho khoảng lương.
job_type, work_format	text	Hiển thị: Tags cho loại hình (Full-time, Remote...).
### job_applications

Đối tượng JobApplication, ghi lại việc ứng tuyển.

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
application_id	integer	PK - ID của lượt ứng tuyển.
applicant_id	integer	FK - Ai đã ứng tuyển.
job_id	integer	FK - Đã ứng tuyển vào công việc nào.
status	enum	Cực kỳ quan trọng cho UI: Dùng để hiển thị step-tracker hoặc tag màu (e.g., Đang chờ, Đã duyệt).
🚀 Tương tác: Dự án & Tác vụ (Projects & Tasks)

Luồng tương tác dành cho các "talent" khi tham gia vào dự án thực tế.

### projects

Đối tượng Project.

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
project_id	integer	PK - ID duy nhất của dự án.
name	varchar	Hiển thị: Tên dự án.
status	enum	UI Logic: Dùng để filter và hiển thị tag trạng thái.
progress	integer	Hiển thị: Dữ liệu (0-100) để vẽ component Progress Bar.
### tasks

Đối tượng Task con trong một Project.

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
task_id	integer	PK - ID duy nhất của tác vụ.
project_id	integer	FK - Tác vụ này thuộc dự án nào.
name	varchar	Hiển thị: Tên tác vụ.
status	enum	UI Logic: Hiển thị trạng thái của task (e.g., Todo, In Progress, Done).
priority	text	UI Logic: Hiển thị icon/tag độ ưu tiên (low, medium, high).

🔗 Mối quan hệ: Bảng project_participation sẽ cho biết Applicant nào đang tham gia Project nào. API GET /api/projects/{id} sẽ trả về danh sách người tham gia. Các bảng evaluations, meetings, task_comments là các dữ liệu chi tiết hỗ trợ cho một tác vụ hoặc dự án.

🎉 Tương tác: Sự kiện & Workshop (Events & Workshops)

Luồng tương tác liên quan đến các hoạt động cộng đồng.

### events & workshops

Đối tượng Event và Workshop.

Tên cột (Field Name)	Kiểu dữ liệu (Data Type)	Ghi chú cho FE (Notes for FE)
event_id/workshop_id	integer	PK - ID của hoạt động.
title	text	Hiển thị: Tên sự kiện/workshop.
start_time	timestamp	Hiển thị: Thời gian bắt đầu. Dùng để tính toán và hiển thị tag "Sắp diễn ra".
format	text	Hiển thị: Tag hình thức (Online, Offline).
status	text	UI Logic: Trạng thái của sự kiện (upcoming, ongoing, completed).

🔗 Mối quan hệ: Các bảng event_registrations và workshop_registrations ghi lại việc Applicant đăng ký tham gia các hoạt động này. Các bảng user_events và user_workshops ghi lại trạng thái tham dự của User (nội bộ).

📚 Dữ liệu Danh mục (Catalog / Master Data)

Nhóm này chứa dữ liệu không thay đổi thường xuyên, dùng để populate cho các component UI.

💡 Dành cho FE: Đây là dữ liệu "master data". Các bạn sẽ gọi các endpoint riêng như GET /api/skills để lấy toàn bộ danh sách và populate cho các component Filter, Dropdown, hoặc Autocomplete.

skills: Danh sách tất cả các kỹ năng trong hệ thống.

universities: Danh sách các trường đại học.

majors: Danh sách các ngành học.

tags: Danh sách các thẻ để phân loại.

interests: Danh sách các sở thích.

⚙️ Hệ thống & Chức năng phụ (System & Auxiliary)

Các bảng này phục vụ các chức năng hỗ trợ và ít liên quan trực tiếp đến các luồng chính của ứng viên.

notifications: Chứa các thông báo (chuông thông báo trên header).

posts: Các bài đăng trên nền tảng (social feature).

es_wallets & es_wallet_transactions: Tính năng ví điện tử.

kv_store_...: Bảng lưu trữ key-value cho các cấu hình hệ thống (FE không cần quan tâm).

Hy vọng tài liệu này giúp team Frontend làm việc hiệu quả hơn. Mọi thắc mắc về cấu trúc response API hoặc cần thêm trường dữ liệu, hãy trao đổi trực tiếp với team Backend!
