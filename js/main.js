// Tạo đối tượng dsnv từ lớp đối tượng DSNV
const dsnv = new DSNV();

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
function layThongTinNV() {
    // Lấy thông tin từ form
    const _taiKhoan = getEle("tknv").value;
    const _hoTen = getEle("name").value;
    const _email = getEle("email").value;
    const _matKhau = getEle("password").value;
    const _ngayLam = getEle("datepicker").value;
    const _luongCoBan = getEle("luongCB").value;
    const _chucVu = getEle("chucvu").value;
    const _gioLam = getEle("gioLam").value;

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
    const nv = layThongTinNV();

    // Thêm nhân viên vào mảng
    dsnv.capNhapSV(nv);

    // Lưu xuống localStorage
    setLocalStorage(dsnv.items);

    // Hiển thị DSNV
    hienThiDSNV(dsnv.items);
}