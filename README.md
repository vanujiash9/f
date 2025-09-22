Chắc chắn rồi. Dưới đây là một file README.md chi tiết, được viết bằng tiếng Việt và định dạng Markdown, giải thích cấu trúc và mục đích của từng bảng trong cơ sở dữ liệu dia_talents của bạn.

Bạn có thể sao chép toàn bộ nội dung bên dưới và lưu vào một file có tên README.md trong dự án của mình.

Tài liệu Cơ sở dữ liệu dia_talents

Tài liệu này cung cấp một cái nhìn tổng quan chi tiết về cấu trúc (schema) của cơ sở dữ liệu dia_talents. Mục tiêu của hệ thống là quản lý thông tin ứng viên, công ty, tin tuyển dụng, dự án và các sự kiện liên quan.

Tổng quan Schema

Cơ sở dữ liệu được tổ chức thành các nhóm logic để dễ dàng quản lý và phát triển:

Quản lý Ứng viên & Người dùng

Quản lý Công ty & Tuyển dụng

Quản lý Dự án & Tác vụ

Quản lý Sự kiện & Workshop

Quản lý Kỹ năng, Học vấn & Thực thể chung

Hệ thống & Các bảng khác

1. Quản lý Ứng viên & Người dùng

Nhóm này chứa các bảng cốt lõi liên quan đến thông tin cá nhân, tài khoản và hồ sơ của ứng viên cũng như người dùng hệ thống.

applicants

Lưu trữ thông tin cá nhân cơ bản của tất cả ứng viên. Đây là bảng trung tâm của hệ thống.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| applicant_id | integer | PK - Khóa chính |
| full_name | varchar | Tên đầy đủ của ứng viên |
| email | varchar | Email (UNIQUE), dùng để liên lạc chính |
| phone_number | varchar | Số điện thoại |
| is_talent | boolean | true nếu ứng viên được đánh dấu là "talent" |
| auth_user_id | uuid | FK - Liên kết tới bảng auth.users |

applicant_accounts

Lưu trữ thông tin tài khoản để ứng viên đăng nhập vào hệ thống.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| account_id | integer | PK - Khóa chính |
| applicant_id | integer | FK - Liên kết tới applicants (UNIQUE) |
| username | varchar | Tên đăng nhập |
| password | varchar | Mật khẩu (đã được hash) |
| account_status | enum | Trạng thái tài khoản (active, inactive, banned) |

applicant_profiles

Lưu trữ các thông tin mở rộng, chi tiết hơn về hồ sơ của ứng viên.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| profile_id | integer | PK - Khóa chính |
| applicant_id | integer | FK - Liên kết tới applicants (UNIQUE) |
| cv_url | varchar | URL tới file CV |
| portfolio_url | varchar | URL tới trang portfolio |
| summary | text | Đoạn tóm tắt về bản thân và mục tiêu nghề nghiệp |
| skills | text | Danh sách các kỹ năng (dạng text) |

talents

Bảng dành riêng cho các ứng viên được hệ thống đánh dấu là "talent", có thể chứa các thuộc tính đặc biệt.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| talent_id | integer | PK - Khóa chính |
| applicant_id | integer | FK - Liên kết tới applicants (UNIQUE) |
| priority | integer | Mức độ ưu tiên của talent |
| rating | numeric | Điểm đánh giá talent |

users & user_roles

Quản lý người dùng chung của hệ thống (Admin, Mentor, nhân viên Dia) và vai trò của họ.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| user_id | integer / uuid | PK - Khóa chính |
| full_name | varchar | Tên người dùng |
| email | varchar | Email đăng nhập (UNIQUE) |
| role | enum | Vai trò của user (trong bảng user_roles) |

2. Quản lý Công ty & Tuyển dụng

Các bảng liên quan đến thông tin công ty đối tác, nhà tuyển dụng và các tin đăng tuyển.

companies

Lưu trữ thông tin của các công ty là đối tác hoặc khách hàng.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| company_id | integer | PK - Khóa chính |
| company_name | varchar | Tên công ty (UNIQUE) |
| industry | varchar | Lĩnh vực hoạt động |
| description | text | Mô tả chi tiết về công ty |
| logo_url | varchar | URL tới logo công ty |

company_accounts

Tài khoản đăng nhập dành cho đại diện của công ty.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| account_id | integer | PK - Khóa chính |
| company_id | integer | FK - Liên kết tới companies (UNIQUE) |

jobs

Chứa thông tin chi tiết về các vị trí công việc đang được tuyển dụng.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| job_id | integer | PK - Khóa chính |
| name | varchar | Tên vị trí công việc (e.g., "Software Engineer") |
| description | text | Mô tả chi tiết công việc |
| status | text | Trạng thái tin tuyển dụng (active, closed) |
| experience_level | text | Cấp bậc yêu cầu (entry, junior, senior) |

job_applications

Bảng ghi lại lịch sử ứng tuyển của ứng viên vào các công việc.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| application_id | integer | PK - Khóa chính |
| applicant_id | integer | FK - Người ứng tuyển |
| job_id | integer | FK - Công việc được ứng tuyển |
| applied_at | timestamp | Thời gian nộp hồ sơ |
| status | enum | Trạng thái hồ sơ (pending, approved, rejected) |

3. Quản lý Dự án & Tác vụ

Các bảng này quản lý thông tin về các dự án, các tác vụ con, sự tham gia của ứng viên và các cuộc họp liên quan.

projects

Lưu trữ thông tin về các dự án mà ứng viên có thể tham gia.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| project_id | integer | PK - Khóa chính |
| company_id | integer | FK - Công ty chủ quản dự án |
| name | varchar | Tên dự án |
| status | enum | Trạng thái dự án (active, completed) |

tasks

Các tác vụ (công việc) cụ thể trong một dự án.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| task_id | integer | PK - Khóa chính |
| project_id | integer | FK - Liên kết tới projects |
| name | varchar | Tên tác vụ |
| status | enum | Trạng thái (pending, in_progress, done) |

project_participation

Bảng nối (junction table) xác định ứng viên nào đang tham gia vào dự án nào.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| applicant_id | integer | PK, FK - Liên kết tới applicants |
| project_id | integer | PK, FK - Liên kết tới projects |

meetings & meeting_attendees

Quản lý các cuộc họp của dự án và danh sách ứng viên tham gia.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| meeting_id | integer | PK - Khóa chính của meetings |
| project_id | integer | FK - Họp thuộc dự án nào |
| meeting_title| varchar | Tiêu đề cuộc họp |
| applicant_id | integer | FK - Ứng viên tham gia (trong meeting_attendees) |

4. Quản lý Sự kiện & Workshop

Nhóm bảng quản lý các hoạt động cộng đồng như sự kiện, workshop và việc đăng ký tham gia của người dùng.

events & workshops

Lưu trữ thông tin về các sự kiện (career day, talkshow) và các workshop chuyên đề.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| event_id / workshop_id | integer | PK - Khóa chính |
| title | text | Tiêu đề của sự kiện/workshop |
| start_time | timestamp | Thời gian bắt đầu |
| end_time | timestamp | Thời gian kết thúc |
| format | text | Hình thức (online, offline, hybrid) |

event_registrations & workshop_registrations

Ghi lại thông tin đăng ký tham gia của ứng viên.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| applicant_id | integer | PK, FK - Người đăng ký |
| event_id / workshop_id | integer | PK, FK - Sự kiện/workshop được đăng ký |
| registered_at | timestamp | Thời điểm đăng ký |

5. Quản lý Kỹ năng, Học vấn & Thực thể chung

Các bảng danh mục dùng chung cho toàn hệ thống như kỹ năng, ngành học, trường học và các thẻ (tags).

skills

Bảng danh mục các kỹ năng (e.g., "Java", "Project Management").
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| skill_id | integer | PK - Khóa chính |
| name | varchar | Tên kỹ năng (UNIQUE) |
| skill_category| varchar | Phân loại kỹ năng (e.g., "Programming Language") |

applicant_skills & task_skills

Các bảng nối thể hiện mối quan hệ nhiều-nhiều giữa kỹ năng với ứng viên và tác vụ.

applicant_skills: Liên kết applicants và skills.

task_skills: Liên kết tasks và skills (kỹ năng cần thiết cho tác vụ).

universities & majors

Bảng danh mục các trường đại học và ngành học.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| university_id | integer | PK - Khóa chính universities |
| major_id | integer | PK - Khóa chính majors |
| name | varchar | Tên trường/ngành học |

applicant_majors

Bảng nối giữa ứng viên và ngành học của họ.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| applicant_id | integer | PK, FK - Liên kết tới applicants |
| major_id | integer | PK, FK - Liên kết tới majors |
| gpa | numeric | Điểm trung bình |

tags

Bảng danh mục các thẻ (tag) để phân loại dự án, workshop, bài viết...
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| tag_id | integer | PK - Khóa chính |
| name | varchar | Tên thẻ (UNIQUE) |

6. Hệ thống & Các bảng khác

Các bảng hỗ trợ chức năng của hệ thống như thông báo, ví điện tử và bài đăng.

notifications

Lưu trữ các thông báo được gửi đến người dùng.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| id | uuid | PK - Khóa chính |
| user_id | uuid | Người nhận thông báo |
| title | text | Tiêu đề thông báo |
| is_read | boolean | true nếu đã đọc |

posts

Lưu trữ các bài đăng trên nền tảng, có thể từ ứng viên hoặc công ty.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| post_id | integer | PK - Khóa chính |
| applicant_id | integer | FK - Tác giả (nếu là ứng viên) |
| company_id | integer | FK - Tác giả (nếu là công ty) |
| content | text | Nội dung bài viết |

es_wallets & es_wallet_transactions

Quản lý hệ thống ví điện tử và lịch sử giao dịch.
| Tên cột | Kiểu dữ liệu | Ghi chú |
| :--- | :--- | :--- |
| user_id | uuid | PK - Chủ sở hữu ví |
| balance | numeric | Số dư hiện tại |
| from_user_id| uuid | FK - Người gửi (trong transactions) |
| to_user_id | uuid | FK - Người nhận (trong transactions) |
| amount | numeric | Số tiền giao dịch |
