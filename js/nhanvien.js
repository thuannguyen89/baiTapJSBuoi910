// Lớp đối tượng : NhanVien
function NhanVien(
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam, // định dạng mm/dd/yyyy
    _luongCoBan,
    _chucVu,
    _gioLam
) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loaiNV = '';

    /**
     * Tính tổng lương cho nhân viên
     *  + nếu chức vụ là giám đốc: tổng lương = lương cơ bản * 3
     *  + nếu chức vụ là trưởng phòng: tổng lương = lương cơ bản * 2
     *  + nếu chức vụ là nhân viên: tổng lương = lương cơ bản * 1
     */
    this.tinhTongLuong = function () {
        if (this.chucVu === 'Sếp') {
            this.tongLuong = this.luongCoBan * 3;
        } else if (this.chucVu === 'Trưởng phòng') {
            this.tongLuong = this.luongCoBan * 2;
        } else {
            this.tongLuong = this.luongCoBan;
        }
    };

    /**
     * Xếp loại nhân viên
     *  + nếu nhân viên có giờ làm trên 192h (>=192): nhân viên xuất sắc
     *  + nếu nhân viên có giờ làm trên 176h (>=176): nhân viên giỏi
     *  + nếu nhân viên có giờ làm trên 160h (>=160): nhân viên khá
     *  + nếu nhân viên có giờ làm dưới 160h: nhân viên trung bình
     */
    this.xepLoaiNV = function () {
        if (this.gioLam < 160) {
            this.loaiNV = 'Trung Bình';
        } else if (160 <= this.gioLam && this.gioLam < 176) {
            this.loaiNV = 'Khá';
        } else if (176 <= this.gioLam && this.gioLam < 192) {
            this.loaiNV = 'Giỏi';
        } else if (this.gioLam >= 192) {
            this.loaiNV = 'Xuất Sắc';
        }
    };
}