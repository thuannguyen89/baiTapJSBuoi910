// Lớp dôi tượng : DSNV
function DSNV() {
    this.items = [];

    this.themNV = function (nv) {
        this.items.push(nv);
    };

    this.timViTriNV = function (taiKhoan) {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            const nv = this.items[i];
            if (nv.taiKhoan == taiKhoan) {
                index = i;
                break;
            }
        }

        return index;
    };

    this.timNVTheoLoai = function (loaiNV) {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            const nv = this.items[i];
            if (nv.loaiNV == loaiNV) {
                index = i;
                break;
            }
        }

        return index;
    };

    this.layThongTinNV = function (taiKhoan) {
        let index = this.timViTriNV(taiKhoan);

        // Trả về tất cả thông tin của nhân viên nếu tìm thấy 
        if (index !== -1) {
            return this.items[index];
        }

        return null;
    };

    this.xoaNV = function (taiKhoan) {
        // Tim vi tri cua NV can xoa
        let index = this.timViTriNV(taiKhoan);

        // Xoa NV
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    };

    this.capNhapSV = function (nv) {
        let index = this.timViTriNV(nv.taiKhoan);

        // Cập nhật thông tin của nhân viên đến DSNV
        if (index !== -1) {
            this.items[index] = nv;
        }
    };
}