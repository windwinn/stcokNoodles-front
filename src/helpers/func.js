import dayjs from 'dayjs'
import loading from '/assets/icon/loading.gif'

export default {

  alertMessage(message,type){
    this.$swal({
      icon: type,
      title: message,
      // title: type,
      // text: message,
      confirmButtonColor: '#607D8B',
      target: document.body, 
      didOpen: () => {
        document.querySelector('.swal2-popup').style.zIndex = '9999';
      }
      })
  },
  formatDate(dateStr) {
    return dayjs(dateStr).format('DD-MM-YYYY HH:mm:ss')
  },
  formatCategory(value) {
    let formatValue = ''
    if(value === 'FF'){
      formatValue = 'ของสด'
    }else{
      formatValue = 'ผัก'
    }
    return formatValue 
  },
  formatVisibleItem(value) {
    let formatValue = ''
    if(value == true){
      formatValue = 'แสดง'
    }else{
      formatValue = 'ไม่แสดง'
    }
    return formatValue 
  },
  formatType(value) {
    let formatValue = ''
    if(value == 1){
      formatValue = 'ร้านแม่'
    }else{
      formatValue = 'พิมสั่งเอง'
    }
    return formatValue 
  },
  formatStatus(value) {
    let formatValue = ''
    if(value == 'created'){
      formatValue = 'สร้างใหม่'
    }else{
      formatValue = 'ส่งข้อมูลแล้ว'
    }
    return formatValue 
  },
  show() {
    this.$swal({ 
        showConfirmButton: false,
        allowOutsideClick: false,
        imageUrl: loading,
        background: 'rgb(255 255 255 / 0%)'
    })
  },
  close() {
    setTimeout(() => {
      this.$swal.close()
    }, 500)
  },
};
