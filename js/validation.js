function Validation() {
    this.kiemTraRong = function (value, spanId, message) {
        if (value === "") {
            getEle(spanId).innerHTML = message;
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    };

    this.kiemTraHoTen = function (hoTen, spanId) {
        if (!hoTen.match(/^[a-zA-Z ]+$/)) {
            getEle(spanId).innerHTML = `Họ tên phải là chữ`;
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }

    this.kiemTraTaiKhoan = function (taiKhoan, spanId) {
        // Độ dài tài khoản phải từ 4 - 6 ký số
        let isValid = true;
        let message = '';
        if (4 > taiKhoan.length || taiKhoan.length > 6) {
            message = `Độ dài tài khoản phải từ 4 - 6 ký số`;
            isValid = false;
        } else if (isNaN(taiKhoan)) {
            message = `Tài khoản phải là tất cả ký tự số`;
            isValid = false;
        }

        getEle(spanId).innerHTML = message;
        return isValid;
    }

    this.kiemTraTaiKhoanTonTai = function(taiKhoan, spanId, items) {
        let isValid = true;
        let message = '';
        
        for (let i = 0; i < items.length; i++) {
            let nv = items[i];
            if (taiKhoan === nv.taiKhoan) {
                message = `Tài khoản này đã tồn tại.`;
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            getEle(spanId).innerHTML = message;
        }

        return isValid;
    }

    this.kiemTraFormatEmail = function (email, spanId) {
        let regrexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regrexEmail.test(email)) {
            getEle(spanId).innerHTML = 'Email sai định dạng.';
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }

    this.kiemTraMatKhau = function (matKhau, spanId) {
        // Độ dài mật khẩu 6 - 10 kí tự
        let isValid = true;
        let message = '';
        if (6 > matKhau.length || matKhau.length > 10) {
            message = `Độ dài mật khẩu phải từ 6 - 10 ký tự`;
            isValid = false;
        }

        // Chứa ít nhật 1 ký tự in hoa
        if (!matKhau.match(/[A-Z]/)) {
            message += `<br />Mật khẩu phải chứa 1 ký tự in hoa`;
            isValid = false;
        }

        // Chứa ít nhất 1 ký tự số
        if (!matKhau.match(/\d/)) {
            message += `<br />Mật khẩu phải chứa 1 ký tự số `;
            isValid = false;
        }

        // Chứ ít nhất 1 ký tự đặc biệt
        if (!matKhau.match(/[^a-zA-Z\d]/)) {
            message += `<br />Mật khẩu phải chứa 1 ký tự đặc biệt`;
            isValid = false;
        }

        getEle(spanId).innerHTML = message;
        return isValid;
    }

    this.kiemtraFormatNgayLam = function(ngayLam, spanId) {
        let regrexDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        
        if (!regrexDate.test(ngayLam)) {
            getEle(spanId).innerHTML = `Ngày làm phải có định dạng mm/dd/yyyy`;
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }

    this.kiemTraLuongCB = function (luongCB, spanId) {
        if (1000000 > luongCB || luongCB > 20000000) {
            getEle(spanId).innerHTML = `Lương cơ bản phải từ 1tr đến 20tr`;
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }

    this.kiemTraChucVu = function (chucVu, spanId) {
        if (chucVu === "Chọn chức vụ") {
            getEle(spanId).innerHTML = 'Phải chọn chức vụ hợp lệ.';
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }

    this.kiemTraGioLam = function (gioLam, spanId) {
        if (80 > gioLam || gioLam > 200) {
            getEle(spanId).innerHTML = `Số giờ làm phải từ 80h đến 200h`;
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    }
}