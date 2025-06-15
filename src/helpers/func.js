import dayjs from 'dayjs'

export default {

  alertMessage(message,type){
    this.$swal({
      icon: type,
      title: message,
      // title: type,
      // text: message,
      confirmButtonColor: '#607D8B',
      target: document.body, // ให้แน่ใจว่าอยู่เหนือ dialog อื่น ๆ
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
  formatStatus(value) {
    let formatValue = ''
    if(value == 'created'){
      formatValue = 'สร้างใหม่'
    }else{
      formatValue = 'ส่งข้อมูลแล้ว'
    }
    return formatValue 
  }
};
