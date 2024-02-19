// Tạo đối tượng dsnv từ lớp đối tượng DSNV
const dsnv = new DSNV();

// Tạo đối tượng validation
const validation = new Validation();

// Gọi lấy DSNV từ localStorage
getLocalStorage();

// Lưu DSNV xuống localStorage
function setLocalStorage(items) {
    // Chuyển DSNV (JSON) thành chuổi
    const arrString = JSON.stringify(items);

    // Lưu xuống localStorage
    localStorage.setItem('DSNV', arrString);
}

// Lấy DSNV từ localStorage
function getLocalStorage() {
    // Kiểm tra nếu localStorage không tồn tại DSNV thì return
    if (!localStorage.getItem('DSNV')) {
        return;
    }

    // Lấy DSNV từ localStorage
    const arrString = localStorage.getItem('DSNV');

    // Chuyển chuỗi lại thành DSNV (JSON)
    const arrJson = JSON.parse(arrString);

    // Gán lại DSNV cho dsnv
    dsnv.items = arrJson;

    // Hiển thị DSNV ra table
    hienThiDSNV(dsnv.items);
}

// Lấy element theo id
function getEle(id) {
    return document.getElementById(id);
}

// Lấy thông tin NV nhập từ form
function layThongTinNV(isEdit = false) {
    // Lấy thông tin từ form
    const _taiKhoan = getEle("tknv").value;
    const _hoTen = getEle("name").value;
    const _email = getEle("email").value;
    const _matKhau = getEle("password").value;
    const _ngayLam = getEle("datepicker").value;
    const _luongCoBan = getEle("luongCB").value;
    const _chucVu = getEle("chucvu").value;
    const _gioLam = getEle("gioLam").value;

    /**
     * Validation
     *  + Tài khoản tối đa 4 - 6 ký số, không để trống
     *  + Tên nhân viên phải là chữ, không để trống
     *  + Email phải đúng định dạng, không để trống
     *  + mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống
     *  + Ngày làm không để trống, định dạng mm/dd/yyyy
     *  + Lương cơ bản 1 000 000 - 20 000 000, không để trống
     *  + Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
     *  + Số giờ làm trong tháng 80 - 200 giờ, không để trống
     */
    let isValid = true;

    // Kiểm tra rỗng
    isValid &= validation.kiemTraRong(_taiKhoan, 'tbTKNV', 'Tài khoản không được trống.');
    isValid &= validation.kiemTraRong(_hoTen, 'tbTen', 'Họ Tên không được trống.');
    isValid &= validation.kiemTraRong(_email, 'tbEmail', 'Email không được trống.');
    isValid &= validation.kiemTraRong(_matKhau, 'tbMatKhau', 'Mật khẩu không được trống.');
    isValid &= validation.kiemTraRong(_ngayLam, 'tbNgay', 'Ngày làm không được trống.');
    isValid &= validation.kiemTraRong(_luongCoBan, 'tbLuongCB', 'Lương cơ bản không được trống.');
    isValid &= validation.kiemTraRong(_chucVu, 'tbChucVu', 'Chức vụ không được trống.');
    isValid &= validation.kiemTraRong(_gioLam, 'tbGiolam', 'Tài khoản không được trống.');

    // Tài khoản tối đa 4-6 kí số
    isValid &= validation.kiemTraTaiKhoan(_taiKhoan, 'tbTKNV');

    // Kiểm tra Tài khoản đã tồn tại
    if (!isEdit) {
        isValid &= validation.kiemTraTaiKhoanTonTai(_taiKhoan, 'tbTKNV', dsnv.items);
    }

    // Kiểm tra họ tên
    isValid &= validation.kiemTraHoTen(_hoTen, 'tbTen');

    // Kiểm tra format email
    isValid &= validation.kiemTraFormatEmail(_email, 'tbEmail');

    // Mật khẩu tối đa 6-10 kí tự 
    isValid &= validation.kiemTraMatKhau(_matKhau, 'tbMatKhau');

    // Kiểm tra format ngày làm
    isValid &= validation.kiemtraFormatNgayLam(_ngayLam, 'tbNgay');

    // Kiểm tra lương cơ bản
    isValid &= validation.kiemTraLuongCB(_luongCoBan, 'tbLuongCB');

    // Kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu(_chucVu, 'tbChucVu');

    // Kiểm tra số giờ làm
    isValid &= validation.kiemTraGioLam(_gioLam, 'tbGiolam');

    if (isValid == false) {
        return;
    }

    // Tạo đối tượng NhanVien
    const nv = new NhanVien(
        _taiKhoan,
        _hoTen,
        _email,
        _matKhau,
        _ngayLam,
        _luongCoBan,
        _chucVu,
        _gioLam
    );

    // Tính tổng lương cho NV
    nv.tinhTongLuong();

    // Xếp loại cho NV
    nv.xepLoaiNV();

    return nv;
}

// Hiển thị DSNV
function hienThiDSNV(items) {
    let content = '';
    for (i = 0; i < items.length; i++) {
        const nv = items[i];
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong.toLocaleString('vi-VN', {style:"currency", currency:"VND"})}</td>
                <td>${nv.loaiNV}</td>
                <td>
                    <button class="btn btn-info" onclick="suaNV('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Edit</button>
                    <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Delete</button>
                </td>
            </tr>
        `;
    }

    // Hiển thị DSNV ra table
    getEle("tableDanhSach").innerHTML = content;
}

/**
 * Thêm nhân viên
 */
function themNV() {
    // Lấy thông tin NV từ người dùng nhập vào
    const nv = layThongTinNV();

    // Nếu Nhân viên không tạo thành công thì return
    if (!nv) {
        return;
    }

    // Thêm nhân viên vào mảng
    dsnv.themNV(nv);

    // Lưu xuống localStorage
    setLocalStorage(dsnv.items);

    // Hiển thị DSNV
    hienThiDSNV(dsnv.items);
}

/**
 * Xóa nhân viên
 */
function xoaNV(taiKhoan) {
    // Xóa NV khỏi DSNV
    dsnv.xoaNV(taiKhoan);

    // Cập nhật lại localStorage
    setLocalStorage(dsnv.items);

    // Hiển thị lại DSNV
    hienThiDSNV(dsnv.items);
}

/**
 * Lấy thông tin Nhân Viên cần edit, cập nhật lên form
 */
function suaNV(taiKhoan) {
    const nv = dsnv.layThongTinNV(taiKhoan);
    if (nv) {
        // Hiển thị nút cập nhật
        getEle("btnCapNhat").style.display = "inline-block";

        // Ẩn nút thêm
        getEle("btnThemNV").style.display = "none";

        // Hiển thị thông tin nhân viên lên form
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;
        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    }
}

/**
 * Cập nhật nhân viên sau khi đã thay đổi
 */
function capNhapSV() {
    // Lấy thông tin NV từ người dùng nhập vào
    const nv = layThongTinNV(true);

    // Thêm nhân viên vào mảng
    dsnv.capNhapSV(nv);

    // Lưu xuống localStorage
    setLocalStorage(dsnv.items);

    // Hiển thị DSNV
    hienThiDSNV(dsnv.items);
}

/**
 * Tìm nhân viên theo loại
 */
getEle("btnTimNV").onclick = function () {
    let searchName = getEle("searchName").value;

    if (searchName == 'xuat sac' || searchName == 'xuất sắc' || searchName == 'Xuat Sac' || searchName == 'Xuất Sắc') {
        searchName = 'Xuất Sắc';
    } else if (searchName == 'gioi' || searchName == 'Gioi' || searchName == 'giỏi' || searchName == 'Giỏi') {
        searchName = 'Giỏi';
    } else if (searchName == 'kha' || searchName == 'khá' || searchName == 'Kha' || searchName == 'Khá') {
        searchName = 'Khá';
    } else if (searchName == 'trung binh' || searchName == 'trung bình' || searchName == 'Trung Binh' || searchName == 'Trung Bình') {
        searchName = 'Trung Bình';
    }

    // Tìm kiếm các nhan viên có loại phù hợp
    let result = dsnv.timNVTheoLoai(searchName);
    hienThiDSNV(result);
    if (result.length > 0) {
        // Hiện thị thông báo ra kết quả tìm kiếm
        getEle("tbTimNV").innerHTML = `Tìm thấy <b>${result.length}</b> nhân viên xếp loại '${searchName}'`;

    } else {
        // Hiện thị thông báo ra kết quả tìm kiếm
        getEle("tbTimNV").innerHTML = `Không tìm thấy bất kỳ nhân viên nào xếp loại '${searchName}'`;
    }
}

/**
 * Thiết lập lại các giá trị trên form
 */
function resetForm() {
    // Ẩn nút cập nhật
    getEle("btnCapNhat").style.display = "none";

    // Hiển thị nút thêm
    getEle("btnThemNV").style.display = "inline-block";

    getEle("tknv").value = '';
    getEle("tknv").disabled = false;
    getEle("name").value = '';
    getEle("email").value = '';
    getEle("password").value = '';
    getEle("datepicker").value = '';
    getEle("luongCB").value = '';
    getEle("chucvu").value = '';
    getEle("gioLam").value = '';
}